function ModalForm({ type, data, onClose, onSubmit }) {
  const isEdit = Boolean(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">
          {isEdit ? `Edit ${type}` : `Add ${type}`}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {type === "appointment" && (
            <>
              <input
                type="text"
                name="provider"
                defaultValue={data?.provider || ""}
                placeholder="Provider"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                name="datetime"
                defaultValue={
                  data?.datetime
                    ? data.datetime.slice(0, 16)
                    : ""
                }
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="repeat"
                defaultValue={data?.repeat || "none"}
                className="w-full p-2 border rounded"
              >
                <option value="none">None</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </>
          )}

          {type === "prescription" && (
            <>
              <input
                type="text"
                name="medication"
                defaultValue={data?.medication || ""}
                placeholder="Medication"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="dosage"
                defaultValue={data?.dosage || ""}
                placeholder="Dosage"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="quantity"
                defaultValue={data?.quantity || ""}
                placeholder="Quantity"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="refill_on"
                defaultValue={data?.refill_on || ""}
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="refill_schedule"
                defaultValue={data?.refill_schedule || "none"}
                className="w-full p-2 border rounded"
              >
                <option value="none">None</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
