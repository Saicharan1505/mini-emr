import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

function AdminPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients");
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Admin Portal - Patients
      </h2>

      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2">#Appointments</th>
            <th className="px-4 py-2">#Prescriptions</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, index) => (
            <tr
              key={p.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2 font-medium">{p.name}</td>
              <td className="px-4 py-2 text-gray-700">{p.email}</td>
              <td className="px-4 py-2 text-center">
                {p.Appointments?.length || 0}
              </td>
              <td className="px-4 py-2 text-center">
                {p.Prescriptions?.length || 0}
              </td>
              <td className="px-4 py-2 text-center">
                <Link
                  to={`/admin/patients/${p.id}`}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPatients;
