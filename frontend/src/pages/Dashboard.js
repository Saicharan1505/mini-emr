
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { format, isWithinInterval, addDays } from "date-fns";

function Dashboard() {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/patients/me");
        setPatient(res.data);

        // store patientId for later use in drill-down pages
        localStorage.setItem("patientId", res.data.id);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patientId");
    navigate("/");
  };

  if (!patient)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  const today = new Date();
  const next7Days = addDays(today, 7);

  const upcomingAppointments = patient.Appointments.filter((a) =>
    isWithinInterval(new Date(a.datetime), { start: today, end: next7Days })
  );

  const upcomingPrescriptions = patient.Prescriptions.filter((p) =>
    isWithinInterval(new Date(p.refill_on), { start: today, end: next7Days })
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">
          Welcome, {patient.name}
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Appointments */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Appointments (Next 7 Days)
        </h3>
        {upcomingAppointments.length > 0 ? (
          <ul className="space-y-2">
            {upcomingAppointments.map((a) => (
              <li
                key={a.id}
                className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg"
              >
                <span className="font-medium">{a.provider}</span> - {" "}
                {format(new Date(a.datetime), "PPpp")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming appointments.</p>
        )}

        {/* View all link */}
        <button
          onClick={() => navigate("/appointments")}
          className="mt-3 text-indigo-600 hover:underline"
        >
          View all appointments (Next 3 Months)
        </button>
      </section>

      {/* Prescriptions */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Prescription Refills (Next 7 Days)
        </h3>
        {upcomingPrescriptions.length > 0 ? (
          <ul className="space-y-2">
            {upcomingPrescriptions.map((p) => (
              <li
                key={p.id}
                className="p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <span className="font-medium">{p.medication}</span> - {p.dosage}
                <span className="ml-2 text-gray-600">
                  (Refill: {format(new Date(p.refill_on), "PP")})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No refills this week.</p>
        )}

        {/* View all link */}
        <button
          onClick={() => navigate("/prescriptions")}
          className="mt-3 text-green-600 hover:underline"
        >
          View all prescriptions (Next 3 Months)
        </button>
      </section>
    </div>
  );
}

export default Dashboard;
