import TicketForm from "./TicketForm";

function NewTicket() {
  return (
    <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "40px",
  width: "100%"
}}>
      
      <div style={{
  width: "500px",
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
}}>
        
        <h2 style={{ marginBottom: "10px" }}>🎫 Create New Ticket</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Describe your issue and our AI will analyze it automatically.
        </p>

        <TicketForm />

      </div>
    </div>
  );
}

export default NewTicket;