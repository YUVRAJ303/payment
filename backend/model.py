import os
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import RobustScaler
from sklearn.metrics import average_precision_score, classification_report
import joblib

def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculates the great circle distance between two GPS points."""
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = np.sin(dlat/2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2.0)**2
    c = 2 * np.arcsin(np.sqrt(a))
    r = 3956 # Radius of earth in miles
    return c * r

def preprocess_data(df, scaler=None, is_training=True):
    """Engineers the raw data into machine-readable features."""
    df['distance_miles'] = haversine_distance(
        df['lat'], df['long'], df['merch_lat'], df['merch_long']
    )
    
    df['trans_datetime'] = pd.to_datetime(df['trans_date_trans_time'])
    df['hour'] = df['trans_datetime'].dt.hour
    
    # Cyclical transform for time
    df['hour_sin'] = np.sin(df['hour'] * (2. * np.pi / 24))
    df['hour_cos'] = np.cos(df['hour'] * (2. * np.pi / 24))
    
    features = ['amt', 'distance_miles', 'hour_sin', 'hour_cos']
    X = df[features].copy()
    y = df['is_fraud'].copy() if 'is_fraud' in df.columns else None
    
    if is_training:
        scaler = RobustScaler()
        X[['amt', 'distance_miles']] = scaler.fit_transform(X[['amt', 'distance_miles']])
    else:
        X[['amt', 'distance_miles']] = scaler.transform(X[['amt', 'distance_miles']])
        
    return X, y, scaler

if __name__ == "__main__":
    print("Resolving file paths...")
    # Dynamically locate the directory of this script to prevent FileNotFoundError
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    train_path = os.path.join(BASE_DIR, 'fraudTrain.csv')
    test_path = os.path.join(BASE_DIR, 'fraudTest.csv')
    
    print("Loading datasets...")
    train_df = pd.read_csv(train_path)
    test_df = pd.read_csv(test_path)
    
    print("Engineering features...")
    X_train, y_train, fitted_scaler = preprocess_data(train_df, is_training=True)
    X_test, y_test, _ = preprocess_data(test_df, scaler=fitted_scaler, is_training=False)
    
    print("Training Logistic Regression Model...")
    model = LogisticRegression(class_weight='balanced', max_iter=1000, random_state=42)
    model.fit(X_train, y_train)
    
    print("Evaluating Model...")
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    y_pred = model.predict(X_test)
    auprc = average_precision_score(y_test, y_pred_proba)
    
    print(f"AUPRC Score: {auprc:.4f}")
    print("Classification Report:\n", classification_report(y_test, y_pred))
    
    print("Exporting production artifacts...")
    joblib.dump(model, os.path.join(BASE_DIR, 'fraud_logistic_model.pkl'))
    joblib.dump(fitted_scaler, os.path.join(BASE_DIR, 'fraud_feature_scaler.pkl'))
    print("Success. Model artifacts generated securely.")