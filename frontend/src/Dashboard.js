import { useEffect, useState } from "react";

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/...`)
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  const total = tickets.length;
  const newCount = tickets.filter(t => t.status === "New").length;
  const assigned = tickets.filter(t => t.status === "Assigned").length;
  const resolved = tickets.filter(t => t.status === "Resolved").length;
  if (!tickets.length) {
  return <p>Loading dashboard...</p>;
}

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