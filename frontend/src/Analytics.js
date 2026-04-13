import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#ef4444"];

function Analytics() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("https://ai-ticketing-1.onrender.com/tickets")
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  const statusData = [
    { name: "New", value: tickets.filter(t => t.status === "New").length },
    { name: "Assigned", value: tickets.filter(t => t.status === "Assigned").length },
    { name: "Resolved", value: tickets.filter(t => t.status === "Resolved").length },
    { name: "Closed", value: tickets.filter(t => t.status === "Closed").length }
  ];

  const severityData = [
    { name: "Low", count: tickets.filter(t => t.severity === "Low").length },
    { name: "Medium", count: tickets.filter(t => t.severity === "Medium").length },
    { name: "Critical", count: tickets.filter(t => t.severity === "Critical").length }
  ];

  if (tickets.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>📊 No tickets available for analytics</h2>
      </div>
    );
  }

  return (
    <div className="analytics-section">
      <h1 className="page-title">Analytics Overview</h1>

      <div className="chart-grid">
        {/* Pie Chart Card */}
        <div className="chart-card">
          <h3>Status Distribution</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="chart-card">
          <h3>Severity Distribution</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
