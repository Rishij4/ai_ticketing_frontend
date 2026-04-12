import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#ef4444"];

function Analytics() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("https://ai-ticketing-1.onrender.com/tickets")
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  // 📊 Status Data
  const statusData = [
    { name: "New", value: tickets.filter(t => t.status === "New").length },
    { name: "Assigned", value: tickets.filter(t => t.status === "Assigned").length },
    { name: "Resolved", value: tickets.filter(t => t.status === "Resolved").length },
    { name: "Closed", value: tickets.filter(t => t.status === "Closed").length }
  ];

  // 📊 Severity Data
  const severityData = [
    { name: "Low", count: tickets.filter(t => t.severity === "Low").length },
    { name: "Medium", count: tickets.filter(t => t.severity === "Medium").length },
    { name: "Critical", count: tickets.filter(t => t.severity === "Critical").length }
  ];

  return (
    <div className="analytics">
      <h1>Analytics</h1>

      <div className="chart-grid">

        {/* Pie Chart */}
        <div className="chart-card" style={{ textAlign: "center" }}>
          <h3>Status Distribution</h3>
          <PieChart width={250} height={220} style={{ background: "transparent" }}>
            <Pie
              data={statusData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="chart-card" style={{ textAlign: "center" }}>
          <h3>Severity Distribution</h3>
          <BarChart width={350} height={250} data={severityData} style={{ background: "transparent" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </div>

      </div>
    </div>
  );
}

export default Analytics;
