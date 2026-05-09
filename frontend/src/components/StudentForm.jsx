import { useState, useEffect } from "react";

export default function StudentForm({
  initialData,
  onSubmit,
  buttonText,
}) {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    enrollmentId: "",
    course: "",
    batch: "",
    totalFees: "",
    paid: "",
    emiDate: "",
    currentModule: "",
    completedModules: "",
    pendingModules: "",
    completionDate: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" />

      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" />

      <input name="enrollmentId" value={form.enrollmentId} onChange={handleChange} placeholder="Enrollment ID" className="w-full border p-2 rounded" />

      <input name="course" value={form.course} onChange={handleChange} placeholder="Course" className="w-full border p-2 rounded" />

      <input name="batch" value={form.batch} onChange={handleChange} placeholder="Batch" className="w-full border p-2 rounded" />

      <input name="totalFees" value={form.totalFees} onChange={handleChange} placeholder="Total Fees" className="w-full border p-2 rounded" />

      <input name="paid" value={form.paid} onChange={handleChange} placeholder="Paid" className="w-full border p-2 rounded" />

      <input name="emiDate" value={form.emiDate} onChange={handleChange} placeholder="EMI Date" className="w-full border p-2 rounded" />

      <input name="currentModule" value={form.currentModule} onChange={handleChange} placeholder="Current Module" className="w-full border p-2 rounded" />

      <input name="completedModules" value={form.completedModules} onChange={handleChange} placeholder="Completed Modules" className="w-full border p-2 rounded" />

      <input name="pendingModules" value={form.pendingModules} onChange={handleChange} placeholder="Pending Modules" className="w-full border p-2 rounded" />

      <input name="completionDate" value={form.completionDate} onChange={handleChange} placeholder="Completion Date" className="w-full border p-2 rounded" />

      <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">

        <option value="Active">Active</option>
        <option value="Completed">Completed</option>

      </select>

      <button className="bg-black text-white w-full py-2 rounded">
        {buttonText}
      </button>

    </form>
  );
}