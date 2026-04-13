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

export default function PaytmDesktop() {
  const [balance, setBalance] = useState(2450);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [modal, setModal] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deadlock, setDeadlock] = useState(null);
  const [sendTo, setSendTo] = useState("");
  const [sendAmt, setSendAmt] = useState("");
  const [fraudScore, setFraudScore] = useState(null);
  const [recvFrom, setRecvFrom] = useState("");
  const [recvAmt, setRecvAmt] = useState("");

  const totalSent = transactions.filter(t => t.type === "sent").reduce((s, t) => s + t.amount, 0);
  const totalRecv = transactions.filter(t => t.type === "received").reduce((s, t) => s + t.amount, 0);

  function quickPay(upi) {
    setSendTo(upi);
    setFraudScore(null); // Reset score when new person is selected
    setModal("send");
  }

  function handleCheckFraud() {
    if (!sendTo.trim()) return alert("Please enter a UPI ID or mobile number first");
    // Generate a random score between 1 and 10
    const score = Math.floor(Math.random() * 10) + 1;
    setFraudScore(score);
  }

  function handleSend() {
    const amt = parseFloat(sendAmt);
    if (!sendTo.trim()) return alert("Enter UPI ID or mobile number");
    if (!amt || amt <= 0) return alert("Enter amount");

    // Deadlock screen instead of alert when wallet insufficient
    if (amt > balance) {
      const now = new Date();
      const timeStr = "Today, " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      setModal(null);
      setDeadlock({ amt, person: sendTo, txnId: genTxnId(), time: timeStr });
      setSendTo(""); setSendAmt(""); setFraudScore(null);
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
    setSendTo(""); setSendAmt(""); setFraudScore(null);
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
  }

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh", background: "#f0f2f5", fontFamily: "sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 280, minWidth: 280, background: "linear-gradient(160deg, #00baf2 0%, #0055b3 100%)", display: "flex", flexDirection: "column", padding: "28px 20px" }}>
        <div style={{ color: "white", fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 28 }}>paytm</div>

        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 24, border: "0.5px solid rgba(255,255,255,0.25)" }}>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginBottom: 6 }}>Wallet Balance</div>
          <div style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{fmt(balance)}</div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, padding: "5px 10px", display: "inline-block", color: "white", fontSize: 12 }}>rahul@paytm</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 10, cursor: "pointer", textDecoration: "underline" }}>+ Add Money</div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>Menu</div>
        {[
          { label: "Dashboard", active: true },
          { label: "Send Money", onClick: () => setModal("send") },
          { label: "Receive Money", onClick: () => setModal("receive") },
          { label: "Transactions" },
          { label: "Settings" },
        ].map(item => (
          <div key={item.label} onClick={item.onClick}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, color: "rgba(255,255,255,0.85)", fontSize: 14, cursor: "pointer", marginBottom: 4, background: item.active ? "rgba(255,255,255,0.18)" : "transparent" }}>
            {item.label}
          </div>
        ))}

        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase", margin: "20px 0 10px" }}>Quick Pay</div>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {allContacts.map(c => (
            <div key={c.name} onClick={() => quickPay(c.upi)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 500 }}>{c.initials}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{c.name}</div>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>+</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>Add</div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "rgba(255,255,255,0.12)", borderRadius: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 500 }}>RS</div>
          <div>
            <div style={{ color: "white", fontSize: 14, fontWeight: 500 }}>Rahul Sharma</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>rahul@paytm</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        <div style={{ background: "white", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "0.5px solid #eee" }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e" }}>Good morning, Rahul 👋</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 13, color: "#888" }}>April 13, 2026</div>
            <div style={{ background: "#e8f4ff", color: "#0066cc", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>UPI: rahul@paytm</div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00baf2,#0066cc)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 500 }}>RS</div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, overflowY: "auto" }}>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Total Sent (This Month)", value: fmt(totalSent), sub: `${transactions.filter(t => t.type === "sent").length} transactions`, subColor: "#e53e3e" },
                { label: "Total Received (This Month)", value: fmt(totalRecv), sub: `${transactions.filter(t => t.type === "received").length} transactions`, subColor: "#22a65a" },
                { label: "Wallet Balance", value: fmt(balance), sub: "Available to spend", subColor: "#22a65a" },
                { label: "UPI ID", value: "rahul@paytm", sub: "Active & verified", subColor: "#22a65a", smallVal: true },
              ].map(s => (
                <div key={s.label} style={{ background: "#f8f9fb", borderRadius: 12, padding: 16, border: "0.5px solid #eee" }}>
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: s.smallVal ? 15 : 20, fontWeight: 500, color: "#1a1a2e" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: s.subColor, marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #eee", padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e", marginBottom: 18, display: "flex", justifyContent: "space-between" }}>
                Quick Actions <span style={{ fontSize: 12, color: "#00baf2", fontWeight: 400, cursor: "pointer" }}>Customize</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
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
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e", marginBottom: 18, display: "flex", justifyContent: "space-between" }}>
                Recent Transactions <span style={{ fontSize: 12, color: "#00baf2", fontWeight: 400, cursor: "pointer" }}>View All</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {transactions.map(txn => (
                  <div key={txn.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "0.5px solid #f5f5f5" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: txn.bg, color: txn.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 500, flexShrink: 0 }}>{txn.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e" }}>{txn.name}</div>
                      <div style={{ fontSize: 12, color: "#999", marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
                        {txn.time}
                        <span style={{ background: txn.type === "received" ? "#e8fff4" : "#fff0f0", color: txn.type === "received" ? "#22a65a" : "#e53e3e", padding: "2px 7px", borderRadius: 5, fontSize: 11, fontWeight: 500 }}>
                          {txn.type === "received" ? "Received" : "Sent"}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: txn.type === "received" ? "#22a65a" : "#e53e3e" }}>
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
                <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Scan to pay <strong>rahul@paytm</strong></div>
                <div style={{ display: "inline-block", background: "white", padding: 14, borderRadius: 12, border: "0.5px solid #eee" }}>
                  <QRCode size={130} />
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 10, justifyContent: "center" }}>
                  <button style={{ background: "#e8f4ff", color: "#0066cc", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Share QR</button>
                  <button style={{ background: "#f0f0f0", color: "#555", border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Download</button>
                </div>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #eee", padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a2e", marginBottom: 16 }}>Frequent Contacts</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {allContacts.map(c => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, flexShrink: 0 }}>{c.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a2e" }}>{c.full}</div>
                      <div style={{ fontSize: 12, color: "#999" }}>{c.upi}</div>
                    </div>
                    <button onClick={() => quickPay(c.upi)} style={{ background: c.bg, color: c.color, border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Pay</button>
                  </div>
                ))}
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
            <div style={{ display: "flex", gap: 16 }}>
              {allContacts.map(c => (
                <div key={c.name} onClick={() => { setSendTo(c.upi); setFraudScore(null); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 500 }}>{c.initials}</div>
                  <div style={{ fontSize: 11, color: "#555" }}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
          <Field 
            label="UPI ID or Mobile Number" 
            value={sendTo} 
            onChange={(val) => { setSendTo(val); setFraudScore(null); }} 
            placeholder="name@paytm or 10-digit number" 
          />
          <AmountInput value={sendAmt} onChange={setSendAmt} color="#00baf2" />
          
          {/* NEW FRAUD SCORE SECTION */}
          <div style={{ marginBottom: 16, padding: 14, background: "#f8f9fa", borderRadius: 10, border: "0.5px solid #eee" }}>
            <div style={{ fontSize: 13, color: "#555", fontWeight: 500, marginBottom: 8 }}>Fraud Risk Detection</div>
            
            {fraudScore !== null ? (
              <div style={{ 
                marginBottom: 12, padding: 12, borderRadius: 8, 
                background: fraudScore >= 8 ? "#fef2f2" : fraudScore >= 5 ? "#fffbeb" : "#e8fff4", 
                color: fraudScore >= 8 ? "#991b1b" : fraudScore >= 5 ? "#92400e" : "#166534", 
                fontSize: 13, lineHeight: 1.5 
              }}>
                <strong>Score: {fraudScore}/10</strong><br/>
                {fraudScore >= 8 ? "High risk of fraud detected! Proceed with extreme caution." :
                 fraudScore >= 5 ? "Moderate risk detected. Please verify the receiver before sending." :
                 "Low risk. It looks safe to proceed."}
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>
                Check the receiver's trust score before making a payment.
              </div>
            )}

            <button onClick={handleCheckFraud} style={{ width: "100%", padding: 10, background: "#e2e8f0", color: "#334155", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }}>
              Check Fraud Score
            </button>
          </div>

          <button onClick={handleSend} style={btnStyle("#00baf2")}>Send</button>
          <div style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 12 }}>Secure UPI payment</div>
        </ModalOverlay>
      )}

      {/* RECEIVE MODAL */}
      {modal === "receive" && (
        <ModalOverlay onClose={closeModal}>
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#1a1a2e" }}>Request Money</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Share QR or send request</div>
          </div>
          <div style={{ background: "#f8f9fa", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 16, border: "0.5px solid #eee" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Your UPI ID</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1a1a2e", marginBottom: 12 }}>rahul@paytm</div>
            <QRCode size={90} />
            <div style={{ fontSize: 11, color: "#bbb", marginTop: 8 }}>Scan and pay</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: "#eee" }} />
            <div style={{ fontSize: 12, color: "#bbb" }}>or</div>
            <div style={{ flex: 1, height: 1, background: "#eee" }} />
          </div>
          <Field label="Who to request from" value={recvFrom} onChange={setRecvFrom} placeholder="UPI ID or mobile number" />
          <AmountInput value={recvAmt} onChange={setRecvAmt} color="#22a65a" />
          <button onClick={handleReceive} style={btnStyle("#22a65a")}>Send Request</button>
        </ModalOverlay>
      )}

      {/* DEADLOCK SCREEN */}
      {deadlock && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, width: 420, maxWidth: "95vw", position: "relative" }}>
            
            <button onClick={() => setDeadlock(null)} style={{ position: "absolute", top: 16, right: 16, background: "#f0f0f0", border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>✕</button>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff3cd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L2 21h20L12 3z" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12 9v5" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="17" r="1" fill="#b45309" />
                </svg>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#1a1a2e", marginBottom: 6 }}>Transaction Deadlock</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
                Your payment is currently in a <strong style={{ color: "#b45309" }}>deadlock state</strong>. The transaction is neither completed nor cancelled.
              </div>
            </div>

            <div style={{ background: "#fffbeb", border: "0.5px solid #fcd34d", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#92400e", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Deadlock Details</div>
              {[
                { label: "Status", value: "Pending / Locked", isStatus: true },
                { label: "Amount", value: `₹${deadlock.amt.toFixed(2)}` },
                { label: "To", value: deadlock.person },
                { label: "Transaction ID", value: deadlock.txnId, mono: true },
                { label: "Time", value: deadlock.time },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: "#78716c" }}>{row.label}</span>
                  {row.isStatus ? (
                    <span style={{ color: "#b45309", fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                      {row.value}
                    </span>
                  ) : (
                    <span style={{ color: "#1a1a2e", fontFamily: row.mono ? "monospace" : "inherit", fontSize: row.mono ? 12 : 13 }}>{row.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: "#fef2f2", border: "0.5px solid #fca5a5", borderRadius: 10, padding: 12, marginBottom: 20, fontSize: 12, color: "#991b1b", lineHeight: 1.6 }}>
              The amount is on <strong>hold</strong> from your wallet but hasn't been credited to the receiver. If not resolved in 24 hours, the amount will be auto-refunded.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 4 }}>Support: 1800-419-0157</div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {success && (
        <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, zIndex: 200 }}>
          <div style={{ fontSize: 56 }}>{success.type === "sent" ? "✈️" : "✅"}</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#1a1a2e" }}>{success.type === "sent" ? "Payment Sent!" : "Request Sent!"}</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: success.type === "sent" ? "#e53e3e" : "#22a65a" }}>
            {success.type === "sent" ? "-" : "+"}₹{success.amt.toFixed(2)}
          </div>
          <div style={{ fontSize: 14, color: "#888" }}>{success.type === "sent" ? "Sent to: " : "Requested from: "}{success.person}</div>
          <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "16px 28px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#999" }}>Wallet Balance</div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{fmt(success.bal)}</div>
          </div>
          <button onClick={() => setSuccess(null)} style={{ ...btnStyle(success.type === "sent" ? "#00baf2" : "#22a65a"), width: "auto", padding: "14px 40px" }}>Done</button>
        </div>
      )}
    </div>
  );
}

function ModalOverlay({ onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "white", borderRadius: 20, padding: 32, width: 420, maxWidth: "95vw", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#f0f0f0", border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>✕</button>
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
    <svg width={size} height={size} viewBox="0 0 100 100">
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