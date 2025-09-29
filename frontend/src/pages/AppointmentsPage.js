import { useEffect, useState } from "react";
import API from "../services/api";
import { format } from "date-fns";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // assumes backend route: /appointments/upcoming/:patientId
        const patientId = localStorage.getItem("patientId");
        const res = await API.get(`/appointments/upcoming/${patientId}`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Appointments (Next 3 Months)</h2>
      {appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointments.map((a) => (
            <li key={a.id} className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <span className="font-medium">{a.provider}</span> - {" "}
              {format(new Date(a.datetime), "PPpp")}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No appointments in the next 3 months.</p>
      )}
    </div>
  );
}

export default AppointmentsPage;
