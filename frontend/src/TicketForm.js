import { useState } from "react";

function TicketForm({ refresh }) {
  const [text, setText] = useState("");
  const [res, setRes] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  const send = async () => {
    const r = await fetch("https://ai-ticketing-1.onrender.com/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: text })
    });

    const data = await r.json();

    setRes(data);
    setSubmittedText(text);
    setText("");

    setFeedbackMsg("");
    setFeedbackGiven(false);

    // ✅ success popup
    setSuccessMsg("🎉 Ticket Created Successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);

    // ✅ refresh tickets
    setTimeout(() => {
      refresh && refresh();
    }, 300);

    // ✅ scroll
    setTimeout(() => {
      document.getElementById("resultSection")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  };

  const sendFeedback = (type) => {
    if (feedbackGiven) return;

    if (type === "yes") {
      setFeedbackMsg("✅ Thanks for your feedback!");
    } else {
      setFeedbackMsg("⚠️ We'll improve this response.");
    }

    setFeedbackGiven(true);
  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
      
      {successMsg && (
        <div style={{ background: "#d4edda", padding: "10px", marginBottom: "10px" }}>
          {successMsg}
        </div>
      )}

      <h3>Create Ticket</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your issue..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "15px",
          fontSize: "14px"
        }}
      />

      <br /><br />

      <button
            onClick={send}
            style={{
              width: "100%",
              padding: "12px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🚀 Submit & Analyze
          </button>
      {submittedText && (
        <p><b>Ticket Name:</b> {submittedText}</p>
      )}

      {res && (
        <div id="resultSection" style={{ marginTop: "20px" }}>
          <p><b>Status:</b> {res.status}</p>
          <p><b>Assigned:</b> {res.assigned_to}</p>
          <p><b>Response:</b> {res.response}</p>
          <p><b>Confidence:</b> {res.confidence}%</p>
          <p><b>ETA:</b> {res.time_estimate}</p>

          {/* Inside the res && block of TicketForm.js */}
<div className="feedback-section">
  <p><strong>Was this helpful?</strong></p>
  <div className="feedback-buttons">
    <button 
      className="btn-yes" 
      onClick={() => sendFeedback("yes")} 
      disabled={feedbackGiven}
    >
      👍 Yes
    </button>
    <button 
      className="btn-no" 
      onClick={() => sendFeedback("no")} 
      disabled={feedbackGiven}
    >
      👎 No
    </button>
  </div>
</div>

          <p>{feedbackMsg}</p>
        </div>
      )}
    </div>
  );
}

export default TicketForm;
