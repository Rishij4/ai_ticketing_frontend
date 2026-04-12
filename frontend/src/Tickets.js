import { useEffect, useState } from "react";
import TicketTable from "./TicketTable";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [status, setStatus] = useState("All");

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

  const filterTickets = (value) => {
    setStatus(value);

    if (value === "All") {
      setTickets(allTickets);
    } else {
      setTickets(allTickets.filter(t => t.status === value));
    }
  };

    load();
  }, [status]);

  // ✅ escalation API
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://ai-ticketing-1.onrender.com/escalate");
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
  <div style={{width: "100%", display: "flex", justifyContent: "center" }}>
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
    <h1 style={{ textAlign: "center" }}>Tickets</h1>

    <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <select onChange={(e) => filterTickets(e.target.value)}>
      <option>All</option>
      <option>New</option>
      <option>Assigned</option>
      <option>Resolved</option>
      <option>Closed</option>
    </select>
    </div>

    <TicketTable tickets={tickets} />
  </div>
  </div>
);
}

export default Tickets;
