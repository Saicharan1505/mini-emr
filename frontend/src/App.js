import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminPatientDetail from "./pages/admin/AdminPatientDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Patient Portal */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminPatients />} />
        <Route path="/admin/patients/:id" element={<AdminPatientDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
