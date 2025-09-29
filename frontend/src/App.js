import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminPatientDetail from "./pages/admin/AdminPatientDetail";
import AppointmentsPage from "./pages/AppointmentsPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Patient Portal */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminPatients />} />
        <Route path="/admin/patients/:id" element={<AdminPatientDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
