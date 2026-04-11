function TicketTable({ tickets }) {
  return (
    <div className="table-container">
      <table className="modern-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Department</th>
            <th>Severity</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t, i) => (
            <tr key={i}>
              <td>{t.id}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>

              <td>
                <span className={`status ${t.status}`}>
                  {t.status}
                </span>
              </td>

              <td>{t.department}</td>
              <td>{t.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;