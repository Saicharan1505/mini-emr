import { useEffect, useState } from "react";
import API from "../services/api";
import { format } from "date-fns";

function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // assumes backend route: /prescriptions/upcoming/:patientId
        const patientId = localStorage.getItem("patientId");
        const res = await API.get(`/prescriptions/upcoming/${patientId}`);
        setPrescriptions(res.data);
      } catch (err) {
        console.error("Error fetching prescriptions", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Prescriptions (Next 3 Months)</h2>
      {prescriptions.length > 0 ? (
        <ul className="space-y-2">
          {prescriptions.map((p) => (
            <li key={p.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="font-medium">{p.medication}</span> - {p.dosage}
              <span className="ml-2 text-gray-600">
                (Refill: {format(new Date(p.refill_on), "PP")})
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No prescriptions due in the next 3 months.</p>
      )}
    </div>
  );
}

export default PrescriptionsPage;
