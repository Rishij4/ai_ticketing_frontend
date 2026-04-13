import { useEffect, useState } from "react";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    fetch("https://ai-ticketing-1.onrender.com/tickets")
      .then(res => res.json())
      .then(data => {
        setTickets(data);
        setLoading(false); // ✅ stop loading
      });
  }, []);

  // ✅ 1. Loading state
  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  // ✅ 2. No tickets state
  if (tickets.length === 0) {
    return <p>No tickets available</p>;
  }

  // ✅ 3. Normal UI
  const total = tickets.length;
  const newCount = tickets.filter(t => t.status === "New").length;
  const assigned = tickets.filter(t => t.status === "Assigned").length;
  const resolved = tickets.filter(t => t.status === "Resolved").length;

  return (
    <div className="dashboard">
      <h1 className="dash-title">Dashboard</h1>

      <div className="cards">
        <div className="card total">
          <h3>Total Tickets</h3>
          <p>{total}</p>
        </div>

        <div className="card new">
          <h3>New</h3>
          <p>{newCount}</p>
        </div>

        <div className="card assigned">
          <h3>Assigned</h3>
          <p>{assigned}</p>
        </div>

        <div className="card resolved">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
