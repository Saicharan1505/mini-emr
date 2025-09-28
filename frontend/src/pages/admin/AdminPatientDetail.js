import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import ModalForm from "../../components/ModalForm";

function AdminPatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [showModal, setShowModal] = useState(null); // "appointment" | "prescription"
  const [editData, setEditData] = useState(null);

  // Fetch patient data
  const fetchPatient = async () => {
    try {
      const res = await API.get(`/patients/${id}`);
      setPatient(res.data);
    } catch (err) {
      console.error("Error fetching patient details:", err);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  // Submit handlers
  const handleAppointmentSubmit = async (data) => {
    try {
      if (editData) {
        await API.put(`/appointments/${editData.id}`, data);
      } else {
        await API.post("/appointments", { ...data, patientId: id });
      }
      await fetchPatient();
      setShowModal(null);
      setEditData(null);
    } catch (err) {
      console.error("Error saving appointment:", err);
    }
  };

  const handlePrescriptionSubmit = async (data) => {
    try {
      if (editData) {
        await API.put(`/prescriptions/${editData.id}`, data);
      } else {
        await API.post("/prescriptions", { ...data, patientId: id });
      }
      await fetchPatient();
      setShowModal(null);
      setEditData(null);
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };

  const deleteAppointment = async (aid) => {
    await API.delete(`/appointments/${aid}`);
    await fetchPatient();
  };

  const deletePrescription = async (pid) => {
    await API.delete(`/prescriptions/${pid}`);
    await fetchPatient();
  };

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Patient: {patient.name}
      </h2>
      <p className="text-gray-600 mb-6">Email: {patient.email}</p>

      {/* Appointments */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-gray-800">Appointments</h3>
          <button
            onClick={() => {
              setEditData(null);
              setShowModal("appointment");
            }}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            + Add Appointment
          </button>
        </div>
        <ul className="space-y-2">
          {patient.Appointments.map((a) => (
            <li
              key={a.id}
              className="p-3 bg-indigo-50 border border-indigo-200 rounded-md flex justify-between items-center"
            >
              <span>
                <span className="font-medium">{a.provider}</span> —{" "}
                {new Date(a.datetime).toLocaleString()} ({a.repeat})
              </span>
              <span className="space-x-2">
                <button
                  onClick={() => {
                    setEditData(a);
                    setShowModal("appointment");
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAppointment(a.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prescriptions */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-gray-800">Prescriptions</h3>
          <button
            onClick={() => {
              setEditData(null);
              setShowModal("prescription");
            }}
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            + Add Prescription
          </button>
        </div>
        <ul className="space-y-2">
          {patient.Prescriptions.map((p) => (
            <li
              key={p.id}
              className="p-3 bg-green-50 border border-green-200 rounded-md flex justify-between items-center"
            >
              <span>
                <span className="font-medium">{p.medication}</span> — {p.dosage},{" "}
                qty {p.quantity} (Refill: {p.refill_on})
              </span>
              <span className="space-x-2">
                <button
                  onClick={() => {
                    setEditData(p);
                    setShowModal("prescription");
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePrescription(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Appointment Modal */}
      {showModal === "appointment" && (
        <ModalForm
          type="appointment"
          data={editData}
          onClose={() => {
            setShowModal(null);
            setEditData(null);
          }}
          onSubmit={handleAppointmentSubmit}
        />
      )}

      {/* Prescription Modal */}
      {showModal === "prescription" && (
        <ModalForm
          type="prescription"
          data={editData}
          onClose={() => {
            setShowModal(null);
            setEditData(null);
          }}
          onSubmit={handlePrescriptionSubmit}
        />
      )}
    </div>
  );
}

export default AdminPatientDetail;
