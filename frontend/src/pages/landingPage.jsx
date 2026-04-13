import { useState } from "react";

const initialTransactions = [
  { id: 1, name: "Priya Kapoor", initials: "PK", time: "Today, 10:42 AM", amount: 500, type: "received", bg: "#e8f4ff", color: "#0066cc" },
  { id: 2, name: "Amit Mehta", initials: "AM", time: "Today, 9:15 AM", amount: 250, type: "sent", bg: "#fff0e8", color: "#e67e22" },
  { id: 3, name: "Sneha Rao", initials: "SR", time: "Yesterday, 7:30 PM", amount: 1200, type: "received", bg: "#e8fff4", color: "#22a65a" },
  { id: 4, name: "Vijay Kumar", initials: "VK", time: "Yesterday, 3:00 PM", amount: 800, type: "sent", bg: "#f5e8ff", color: "#9b59b6" },
];

const allContacts = [
  { name: "Priya", full: "Priya Kapoor", upi: "priya@paytm", initials: "PK", bg: "#e8f4ff", color: "#0066cc" },
  { name: "Amit", full: "Amit Mehta", upi: "amit@okaxis", initials: "AM", bg: "#fff0e8", color: "#e67e22" },
  { name: "Vijay", full: "Vijay Kumar", upi: "vijay@ybl", initials: "VK", bg: "#f5e8ff", color: "#9b59b6" },
];

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function genTxnId() {
  return "TXN#" + Math.random().toString(36).toUpperCase().slice(2, 8);
}

export default function PaytmResponsive() {
  const [balance, setBalance] = useState(2450);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [modal, setModal] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deadlock, setDeadlock] = useState(null);
  
  // Send Money States
  const [sendTo, setSendTo] = useState("");
  const [sendAmt, setSendAmt] = useState("");
  const [sendNote, setSendNote] = useState("");
  const [fraudScore, setFraudScore] = useState(null);
  
  // Receive Money States
  const [recvFrom, setRecvFrom] = useState("");
  const [recvAmt, setRecvAmt] = useState("");

  const totalSent = transactions.filter(t => t.type === "sent").reduce((s, t) => s + t.amount, 0);
  const totalRecv = transactions.filter(t => t.type === "received").reduce((s, t) => s + t.amount, 0);

  function quickPay(upi) {
    setSendTo(upi);
    setSendNote("");
    setFraudScore(null);
    setModal("send");
  }

  function handleCheckFraud() {
    if (!sendTo.trim()) return alert("Please enter a UPI ID or mobile number first");
    if (!sendNote.trim()) return alert("Please enter a description to check for fraud risk");

    const lowerNote = sendNote.toLowerCase();
    let score = 1;

    if (lowerNote.includes("urgent") || lowerNote.includes("lottery") || lowerNote.includes("prize") || lowerNote.includes("win") || lowerNote.includes("offer")) {
      score = Math.floor(Math.random() * 3) + 8; // High Risk (8-10)
    } else if (lowerNote.includes("loan") || lowerNote.includes("help") || lowerNote.includes("stranger") || lowerNote.includes("unknown")) {
      score = Math.floor(Math.random() * 3) + 5; // Moderate Risk (5-7)
    } else {
      score = Math.floor(Math.random() * 4) + 1; // Low Risk (1-4)
    }

    setFraudScore(score);
  }

  function handleSend() {
    const amt = parseFloat(sendAmt);
    if (!sendTo.trim()) return alert("Enter UPI ID or mobile number");
    if (!amt || amt <= 0) return alert("Enter amount");

    if (amt > balance) {
      const now = new Date();
      const timeStr = "Today, " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      setModal(null);
      setDeadlock({ amt, person: sendTo, txnId: genTxnId(), time: timeStr });
      setSendTo(""); setSendAmt(""); setSendNote(""); setFraudScore(null);
      return;
    }

    const newBal = balance - amt;
    setBalance(newBal);
    setTransactions(prev => [
      { id: Date.now(), name: sendTo, initials: sendTo.slice(0, 2).toUpperCase(), time: "Just now", amount: amt, type: "sent", bg: "#e8f4ff", color: "#0066cc" },
      ...prev,
    ]);
    setModal(null);
    setSuccess({ type: "sent", amt, person: sendTo, bal: newBal });
    setSendTo(""); setSendAmt(""); setSendNote(""); setFraudScore(null);
  }

  function handleReceive() {
    const amt = parseFloat(recvAmt);
    if (!recvFrom.trim()) return alert("Enter UPI ID or mobile number");
    if (!amt || amt <= 0) return alert("Enter amount");
    setModal(null);
    setSuccess({ type: "received", amt, person: recvFrom, bal: balance });
    setRecvFrom(""); setRecvAmt("");
  }

  function closeModal() {
    setModal(null);
    setFraudScore(null);
    setSendNote("");
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .app-container { display: flex; width: 100%; min-height: 100vh; background: #f0f2f5; font-family: sans-serif; flex-direction: row; }
        .sidebar { width: 280px; min-width: 280px; background: linear-gradient(160deg, #00baf2 0%, #0055b3 100%); display: flex; flex-direction: column; padding: 28px 20px; }
        .main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .header { background: white; padding: 16px 28px; display: flex; align-items: center; justify-content: space-between; border-bottom: 0.5px solid #eee; }
        .header-profile { display: flex; align-items: center; gap: 14px; }
        .content-grid { flex: 1; padding: 24px 28px; display: grid; grid-template-columns: 1fr 340px; gap: 20px; overflow-y: auto; align-items: start; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .quick-actions-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        
        @media (max-width: 900px) {
          .app-container { flex-direction: column; }
          .sidebar { width: 100%; min-width: 100%; padding: 20px; height: auto; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; }
          .main-area { overflow: visible; }
          .header { flex-direction: column; align-items: flex-start; gap: 12px; padding: 20px; }
          .header-profile { flex-wrap: wrap; }
          .content-grid { grid-template-columns: 1fr; padding: 16px; overflow-y: visible; }
          .stats-grid { grid-template-columns: 1fr; }
          .quick-actions-grid { grid-template-columns: repeat(4, 1fr); gap: 10px; }
          .hide-on-mobile { display: none !important; }
        }

        @media (max-width: 400px) {
          .quick-actions-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="app-container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div style={{ color: "white", fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 28 }}>paytm</div>

          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 24, border: "0.5px solid rgba(255,255,255,0.25)" }}>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginBottom: 6 }}>Wallet Balance</div>
            <div style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{fmt(balance)}</div>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, padding: "5px 10px", display: "inline-block", color: "white", fontSize: 12 }}>yuvraj@paytm</div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 10, cursor: "pointer", textDecoration: "underline" }}>+ Add Money</div>
          </div>

          <div className="hide-on-mobile">
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>Menu</div>
            {[
              { label: "Dashboard", active: true },
              { label: "Send Money", onClick: () => setModal("send") },
              { label: "Receive Money", onClick: () => setModal("receive") },
              { label: "Transactions" },
            ].map(item => (
              <div key={item.label} onClick={item.onClick}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, color: "rgba(255,255,255,0.85)", fontSize: 14, cursor: "pointer", marginBottom: 4, background: item.active ? "rgba(255,255,255,0.18)" : "transparent" }}>
                {item.label}
              </div>
            ))}
          </div>

          <div className="hide-on-mobile" style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "rgba(255,255,255,0.12)", borderRadius: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 500 }}>Y</div>
            <div>
              <div style={{ color: "white", fontSize: 14, fontWeight: 500 }}>Yuvraj</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>yuvraj@paytm</div>
            </div>
          </div>
        </aside>

        {/* MAIN AREA */}
        <div className="main-area">
          <div className="header">
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1a1a2e" }}>Good morning, Yuvraj 👋</div>
            <div className="header-profile">
              <div style={{ fontSize: 13, color: "#888" }}>April 13, 2026</div>
              <div style={{ background: "#e8f4ff", color: "#0066cc", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>UPI: yuvraj@paytm</div>
              <div className="hide-on-mobile" style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00baf2,#0066cc)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 500 }}>Y</div>
            </div>
          </div>

          <div className="content-grid">
            <div>
              <div className="stats-grid">
                {[
                  { label: "Total Sent (This Month)", value: fmt(totalSent), subColor: "#e53e3e" },
                  { label: "Total Received (This Month)", value: fmt(totalRecv), subColor: "#22a65a" },
                  { label: "Wallet Balance", value: fmt(balance), subColor: "#22a65a" },
                  { label: "Active UPI ID", value: "yuvraj@paytm", subColor: "#22a65a", smallVal: true },
                ].map(s => (
                  <div key={s.label} style={{ background: "#f8f9fb", borderRadius: 12, padding: 16, border: "0.5px solid #eee" }}>
                    <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: s.smallVal ? 15 : 20, fontWeight: 500, color: "#1a1a2e", wordBreak: "break-all" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #eee", padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e", marginBottom: 18 }}>Quick Actions</div>
                <div className="quick-actions-grid">
                  {[
                    { label: "Send", bg: "#e8f4ff", onClick: () => setModal("send") },
                    { label: "Receive", bg: "#e8fff4", onClick: () => setModal("receive") },
                    { label: "History", bg: "#fff8e8" },
                    { label: "More", bg: "#f5e8ff" },
                  ].map(a => (
                    <div key={a.label} onClick={a.onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.08)" }} />
                      </div>
                      <div style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{a.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #eee", padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e", marginBottom: 18 }}>Recent Transactions</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {transactions.map(txn => (
                    <div key={txn.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "0.5px solid #f5f5f5" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: txn.bg, color: txn.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 500, flexShrink: 0 }}>{txn.initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{txn.name}</div>
                        <div style={{ fontSize: 12, color: "#999", marginTop: 2, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          {txn.time}
                          <span style={{ background: txn.type === "received" ? "#e8fff4" : "#fff0f0", color: txn.type === "received" ? "#22a65a" : "#e53e3e", padding: "2px 7px", borderRadius: 5, fontSize: 10, fontWeight: 500 }}>
                            {txn.type === "received" ? "Received" : "Sent"}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: txn.type === "received" ? "#22a65a" : "#e53e3e", flexShrink: 0 }}>
                        {txn.type === "received" ? "+" : "-"}₹{txn.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #eee", padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e", marginBottom: 16 }}>Your QR Code</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Scan to pay <strong>yuvraj@paytm</strong></div>
                  <div style={{ display: "inline-block", background: "white", padding: 14, borderRadius: 12, border: "0.5px solid #eee" }}>
                    <QRCode size={130} />
                  </div>
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #eee", padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e", marginBottom: 16 }}>Frequent Contacts</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {allContacts.map(c => (
                    <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, flexShrink: 0 }}>{c.initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.full}</div>
                        <div style={{ fontSize: 12, color: "#999", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.upi}</div>
                      </div>
                      <button onClick={() => quickPay(c.upi)} style={{ background: c.bg, color: c.color, border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", flexShrink: 0 }}>Pay</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEND MODAL */}
      {modal === "send" && (
        <ModalOverlay onClose={closeModal}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#1a1a2e" }}>Send Money</div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>Recent contacts</div>
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
              {allContacts.map(c => (
                <div key={c.name} onClick={() => { setSendTo(c.upi); setFraudScore(null); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", minWidth: 60 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 500 }}>{c.initials}</div>
                  <div style={{ fontSize: 11, color: "#555" }}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
          <Field label="UPI ID or Mobile Number" value={sendTo} onChange={(val) => { setSendTo(val); setFraudScore(null); }} placeholder="Enter details" />
          <AmountInput value={sendAmt} onChange={setSendAmt} color="#00baf2" />
          <Field label="Description / Note" value={sendNote} onChange={(val) => { setSendNote(val); setFraudScore(null); }} placeholder="e.g., Food, Urgent Loan" />

          {/* FRAUD SCORE SECTION */}
          <div style={{ marginBottom: 16, padding: 14, background: "#f8f9fa", borderRadius: 10, border: "0.5px solid #eee" }}>
            <div style={{ fontSize: 13, color: "#555", fontWeight: 500, marginBottom: 8 }}>Fraud Risk Detection</div>
            {fraudScore !== null ? (
              <div style={{ marginBottom: 12, padding: 12, borderRadius: 8, background: fraudScore >= 8 ? "#fef2f2" : fraudScore >= 5 ? "#fffbeb" : "#e8fff4", color: fraudScore >= 8 ? "#991b1b" : fraudScore >= 5 ? "#92400e" : "#166534", fontSize: 13, lineHeight: 1.5 }}>
                <strong>Score: {fraudScore}/10</strong><br/>
                {fraudScore >= 8 ? "High risk detected! Proceed with extreme caution." : fraudScore >= 5 ? "Moderate risk detected. Please verify the receiver." : "Low risk. It looks safe to proceed."}
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Add a note and check the score before paying.</div>
            )}
            <button onClick={handleCheckFraud} style={{ width: "100%", padding: 10, background: "#e2e8f0", color: "#334155", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Check Fraud Score</button>
          </div>

          <button onClick={handleSend} style={btnStyle("#00baf2")}>Send</button>
        </ModalOverlay>
      )}

      {/* RECEIVE MODAL */}
      {modal === "receive" && (
        <ModalOverlay onClose={closeModal}>
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#1a1a2e" }}>Request Money</div>
          </div>
          <div style={{ background: "#f8f9fa", borderRadius: 12, padding: 16, textAlign: "center", margin: "16px 0", border: "0.5px solid #eee" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Your UPI ID</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1a1a2e", marginBottom: 12 }}>yuvraj@paytm</div>
            <QRCode size={90} />
          </div>
          <Field label="Who to request from" value={recvFrom} onChange={setRecvFrom} placeholder="UPI ID or mobile number" />
          <AmountInput value={recvAmt} onChange={setRecvAmt} color="#22a65a" />
          <button onClick={handleReceive} style={btnStyle("#22a65a")}>Send Request</button>
        </ModalOverlay>
      )}

      {/* DEADLOCK SCREEN */}
      {deadlock && (
        <ModalOverlay onClose={() => setDeadlock(null)}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff3cd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L2 21h20L12 3z" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
                <path d="M12 9v5" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="1" fill="#b45309" />
              </svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#1a1a2e", marginBottom: 6 }}>Transaction Deadlock</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>Your payment is currently in a <strong style={{ color: "#b45309" }}>deadlock state</strong>.</div>
          </div>
          <div style={{ background: "#fffbeb", border: "0.5px solid #fcd34d", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#92400e", fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>Details</div>
            <div style={{ fontSize: 13, marginBottom: 6 }}><strong>Amount:</strong> ₹{deadlock.amt.toFixed(2)}</div>
            <div style={{ fontSize: 13, marginBottom: 6 }}><strong>To:</strong> {deadlock.person}</div>
            <div style={{ fontSize: 13 }}><strong>ID:</strong> {deadlock.txnId}</div>
          </div>
          <div style={{ background: "#fef2f2", border: "0.5px solid #fca5a5", borderRadius: 10, padding: 12, fontSize: 12, color: "#991b1b" }}>
            The amount is on hold. If not resolved in 24 hours, it will be auto-refunded.
          </div>
        </ModalOverlay>
      )}

      {/* SUCCESS SCREEN */}
      {success && (
        <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, zIndex: 200, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 56 }}>{success.type === "sent" ? "✈️" : "✅"}</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#1a1a2e" }}>{success.type === "sent" ? "Payment Sent!" : "Request Sent!"}</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: success.type === "sent" ? "#e53e3e" : "#22a65a" }}>
            {success.type === "sent" ? "-" : "+"}₹{success.amt.toFixed(2)}
          </div>
          <div style={{ fontSize: 14, color: "#888", wordBreak: "break-all" }}>{success.type === "sent" ? "Sent to: " : "Requested from: "}{success.person}</div>
          <button onClick={() => setSuccess(null)} style={{ ...btnStyle(success.type === "sent" ? "#00baf2" : "#22a65a"), width: "100%", maxWidth: 300, marginTop: 20 }}>Done</button>
        </div>
      )}
    </>
  );
}

// Reusable Components
function ModalOverlay({ onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div style={{ background: "white", borderRadius: 20, padding: "24px 20px", width: "100%", maxWidth: 420, position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#f0f0f0", border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>{label}</div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "12px 14px", border: "0.5px solid #ddd", borderRadius: 10, fontSize: 15, outline: "none", background: "#fafafa", boxSizing: "border-box", fontFamily: "inherit" }} />
    </div>
  );
}

function AmountInput({ value, onChange, color }) {
  return (
    <div style={{ marginBottom: 16, textAlign: "center" }}>
      <div style={{ fontSize: 28, color, marginBottom: 4 }}>₹</div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="0" type="number"
        style={{ width: "100%", fontSize: 28, fontWeight: 500, textAlign: "center", border: "none", borderBottom: `2px solid ${color}`, outline: "none", background: "transparent", padding: "8px 0", boxSizing: "border-box", fontFamily: "inherit" }} />
    </div>
  );
}

function btnStyle(bg) {
  return { width: "100%", padding: 14, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: "pointer", background: bg, color: "white", fontFamily: "inherit" };
}

function QRCode({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block", margin: "0 auto" }}>
      <rect width="100" height="100" fill="white" rx="4" />
      <g fill="#1a1a2e">
        <rect x="10" y="10" width="30" height="30" rx="2" /><rect x="13" y="13" width="24" height="24" fill="white" rx="1" /><rect x="16" y="16" width="18" height="18" rx="1" />
        <rect x="60" y="10" width="30" height="30" rx="2" /><rect x="63" y="13" width="24" height="24" fill="white" rx="1" /><rect x="66" y="16" width="18" height="18" rx="1" />
        <rect x="10" y="60" width="30" height="30" rx="2" /><rect x="13" y="63" width="24" height="24" fill="white" rx="1" /><rect x="16" y="66" width="18" height="18" rx="1" />
        <rect x="45" y="10" width="6" height="6" /><rect x="55" y="10" width="6" height="6" />
        <rect x="45" y="20" width="6" height="6" /><rect x="55" y="25" width="6" height="6" />
        <rect x="60" y="45" width="8" height="8" /><rect x="72" y="45" width="8" height="8" />
        <rect x="10" y="45" width="8" height="8" /><rect x="22" y="45" width="8" height="8" />
        <rect x="60" y="57" width="8" height="8" /><rect x="72" y="57" width="8" height="8" />
        <rect x="45" y="57" width="8" height="8" />
        <rect x="60" y="70" width="8" height="8" /><rect x="72" y="70" width="8" height="8" />
        <rect x="45" y="70" width="8" height="8" />
      </g>
    </svg>
  );
}