import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Tickets from "./Tickets";
import Analytics from "./Analytics";
import NewTicket from "./NewTicket";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", background: "#f2f5f7", minHeight: "100vh" }}>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content">
          <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/new-ticket" element={<NewTicket />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;