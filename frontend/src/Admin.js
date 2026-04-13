import { useEffect, useState } from "react";

function Admin() {
  const [tickets, setTickets] = useState([]);

  const load = () => {
    fetch("http://127.0.0.1:8000/tickets")
      .then(res => res.json())
      .then(data => setTickets(data));
  };

  useEffect(() => {
    load();
  }, []);

  // 🗑 DELETE
  const deleteTicket = (id) => {
    fetch(`http://127.0.0.1:8000/delete_ticket/${id}`, {
      method: "DELETE"
    }).then(() => load());
  };

  // ✏️ EDIT
  const updateTicket = (id) => {
    const newStatus = prompt("Enter new status:");
    if (!newStatus) return;

    fetch(`http://127.0.0.1:8000/update_ticket/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    }).then(() => load());
  };

  // Inside return statement of Admin.js
return (
  <div className="admin-panel">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>🛠 Admin Control</h1>
      <button className="btn-delete" onClick={() => {
        localStorage.removeItem("adminAuth");
        window.location.reload();
      }}> Logout </button>
    </div>

    <div className="table-container">
      <table className="modern-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Department</th>
            <th>Severity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id}>
              <td>#{t.id}</td>
              <td>{t.description}</td>
              <td><span className={`status ${t.status}`}>{t.status}</span></td>
              <td>{t.department}</td>
              <td>{t.severity}</td>
              <td>
                <button className="btn-edit" onClick={() => updateTicket(t.id)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteTicket(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Admin;