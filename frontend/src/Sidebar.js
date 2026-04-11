import { NavLink } from "react-router-dom";
import "./App.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🚀 TicketAI</h2>

      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/tickets">Tickets</NavLink>
      <NavLink to="/new-ticket">New Ticket</NavLink>
      <NavLink to="/analytics">Analytics</NavLink>
    </div>
  );
}

export default Sidebar;