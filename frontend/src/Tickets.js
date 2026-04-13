import { useEffect, useState } from "react";
import TicketTable from "./TicketTable";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [status, setStatus] = useState("All");

  const filterTickets = (value) => {
    setStatus(value);

    if (value === "All") {
      setTickets(allTickets);
    } else {
      setTickets(allTickets.filter(t => t.status === value));
    }
  };

  useEffect(() => {
    const load = async () => {
      const r = await fetch("https://ai-ticketing-1.onrender.com/tickets");
      const data = await r.json();
  
      setAllTickets(data);
  
      if (status === "All") {
        setTickets(data);
      } else {
        setTickets(data.filter(t => t.status === status));
      }
    };

    load();

  // ✅ ADD THIS LINE
  // eslint-disable-next-line react-hooks/exhaustive-deps

}, [status]);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://ai-ticketing-1.onrender.com/escalate");
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    /* Change 1: Remove justifyContent: "center" to let content align left */
    <div style={{ width: "100%", padding: "20px", display: "flex", flexDirection: "column" }}>
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        
        {/* Change 2: Wrap heading and select in a left-aligned div */}
        <div style={{ textAlign: "left", marginBottom: "30px" }}>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "2.5rem", color: "#1e293b" }}>
            Tickets
          </h1>
          
          <select 
            onChange={(e) => filterTickets(e.target.value)}
            style={{ 
              padding: "8px 16px", 
              borderRadius: "8px", 
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              cursor: "pointer",
              background: "white"
            }}
          >
            <option>All</option>
            <option>New</option>
            <option>Assigned</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Change 3: Keep the table as is, but ensure its container doesn't force centering */}
        <div className="table-wrapper">
          {tickets.length === 0 ? (
            <p style={{ textAlign: "left", color: "#64748b" }}>📭 No tickets available</p>
          ) : (
            <TicketTable tickets={tickets} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tickets;
