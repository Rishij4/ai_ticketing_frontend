import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Tickets from "./Tickets";
import Analytics from "./Analytics";
import NewTicket from "./NewTicket";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";

function AppContent({ auth, setAuth }) {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    /* We use classNames instead of hardcoded inline styles for margins */
    <div className={`app-layout ${isAdminRoute ? "admin-mode" : ""}`}>
      
      {!isAdminRoute && <Sidebar />}

      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/new-ticket" element={<NewTicket />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route
              path="/admin"
              element={auth ? <Admin /> : <AdminLogin setAuth={setAuth} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("adminAuth") === "true");

  return (
    <BrowserRouter>
      <AppContent auth={auth} setAuth={setAuth} />
    </BrowserRouter>
  );
}

export default App;
