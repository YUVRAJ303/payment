from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta, timezone
import joblib
import pandas as pd
import numpy as np

# --- 1. API Configuration & Mock Database ---

app = FastAPI(title="Secure Fraud Detection API")

# SECURITY WARNING: In production, NEVER hardcode this. Load from an environment variable (.env)
SECRET_KEY = "your-super-secret-200-iq-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Mock User Database (In a real app, this is PostgreSQL/MongoDB with hashed passwords)
FAKE_USER_DB = {
    "admin": {
        "username": "admin",
        "password": "securepassword123" # Stored in plaintext only for this demonstration
    }
}

security = HTTPBearer()

# --- 2. ML Artifacts Initialization ---
print("Loading ML models into memory...")
try:
    model = joblib.load('fraud_logistic_model.pkl')
    scaler = joblib.load('fraud_feature_scaler.pkl')
except FileNotFoundError:
    print("WARNING: ML artifacts not found. Please run the training script first.")

# --- 3. Pydantic Schemas ---

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class TransactionData(BaseModel):
    amt: float
    lat: float
    long: float
    merch_lat: float
    merch_long: float
    hour: int

# --- 4. Security Utilities ---

def create_access_token(data: dict):
    """Generates a JWT valid for a specific time window."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Middleware dependency to protect endpoints by validating the JWT."""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- 5. Shared ML Utilities ---

def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculates the distance in miles between user and merchant."""
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = np.sin(dlat/2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2.0)**2
    c = 2 * np.arcsin(np.sqrt(a))
    r = 3956 
    return c * r

# --- 6. Endpoints ---

@app.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    """Authenticates a user and issues a JWT."""
    user = FAKE_USER_DB.get(request.username)
    
    # Validate user existence and password
    if not user or user["password"] != request.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    # Generate token with the username as the subject ("sub")
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/fraud")
def predict_fraud(transaction: TransactionData, current_user: str = Depends(verify_token)):
    """
    Protected endpoint: Requires a valid JWT in the Authorization header.
    Expects format: 'Bearer <your_token>'
    """
    try:
        # Step A: On-the-fly feature engineering
        distance = haversine_distance(
            transaction.lat, transaction.long, 
            transaction.merch_lat, transaction.merch_long
        )
        
        hour_sin = np.sin(transaction.hour * (2. * np.pi / 24))
        hour_cos = np.cos(transaction.hour * (2. * np.pi / 24))
        
        # Step B: Format as DataFrame
        features = pd.DataFrame([{
            'amt': transaction.amt,
            'distance_miles': distance,
            'hour_sin': hour_sin,
            'hour_cos': hour_cos
        }])
        
        # Step C: Scale numerical data
        features[['amt', 'distance_miles']] = scaler.transform(features[['amt', 'distance_miles']])
        
        # Step D: Inference
        fraud_probability = model.predict_proba(features)[0][1]
        is_fraudulent = bool(fraud_probability > 0.5) 
        
        return {
            "requested_by": current_user,  # Shows who made the API call
            "fraud_probability": round(float(fraud_probability), 4),
            "action": "BLOCK" if is_fraudulent else "APPROVE"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run with: uvicorn main:app --reload