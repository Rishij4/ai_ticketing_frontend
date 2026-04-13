import { useState } from "react";

function AdminLogin({ setAuth }) {
  const [password, setPassword] = useState("");

  const login = () => {
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      setAuth(true);
    } else {
      alert("Wrong password");
    }
  };

  return (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
    <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", width: "320px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>🔐 Admin Login</h2>
      <input
        type="password"
        placeholder="Enter password"
        style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ddd", boxSizing: "border-box" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ width: "100%", padding: "12px" }} onClick={login}>Access Dashboard</button>
    </div>
  </div>
);
}

export default AdminLogin;