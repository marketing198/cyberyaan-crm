import { useState, useEffect } from "react";
import { COURSE_DATA } from "../data/courseData";


export default function StudentForm({
  initialData,
  onSubmit,
  onCancel,
  buttonText,
  students,
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
    moduleHistory: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        moduleHistory: initialData.moduleHistory || [],
      });
    } else {
      // Generate sequential enrollment ID for new student
      const year = new Date().getFullYear();
      const nextId = (students?.length || 0) + 1;
      const formattedId = nextId.toString().padStart(3, '0');
      setForm(prev => ({
        ...prev,
        enrollmentId: `CYB-${year}-${formattedId}`
      }));
    }
  }, [initialData, students]);



  const handleModuleHistoryChange = (index, field, value) => {
    const updatedHistory = [...form.moduleHistory];
    updatedHistory[index][field] = value;
    setForm({ ...form, moduleHistory: updatedHistory });
  };

  const addModuleHistory = () => {
    setForm({
      ...form,
      moduleHistory: [...form.moduleHistory, { module: "", completionDate: "" }],
    });
  };

  const removeModuleHistory = (index) => {
    const updatedHistory = form.moduleHistory.filter((_, i) => i !== index);
    setForm({ ...form, moduleHistory: updatedHistory });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // Update pending modules if course or completedModules changes
    if (name === "course" || name === "completedModules") {
      const courseName = name === "course" ? value : form.course;
      const completed = name === "completedModules" ? parseInt(value) || 0 : parseInt(form.completedModules) || 0;
      
      if (COURSE_DATA[courseName]) {
        const totalModules = COURSE_DATA[courseName].length;
        updatedForm.pendingModules = Math.max(0, totalModules - completed);
        
        // If course changed, reset currentModule to the first one or empty
        if (name === "course") {
          updatedForm.currentModule = COURSE_DATA[courseName][0] || "";
        }
      }
    }

    setForm(updatedForm);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment ID</label>
          <input 
            name="enrollmentId" 
            value={form.enrollmentId} 
            onChange={handleChange} 
            className="w-full border p-2 rounded bg-gray-50 font-semibold" 
            readOnly={!initialData} 
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select 
            name="course" 
            value={form.course} 
            onChange={handleChange} 
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select Course</option>
            {Object.keys(COURSE_DATA).map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Batch Timings</label>
          <select 
            name="batch" 
            value={form.batch} 
            onChange={handleChange} 
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select Timing</option>
            <option value="8 to 10">8 to 10</option>
            <option value="10 to 12">10 to 12</option>
            <option value="12 to 2">12 to 2</option>
            <option value="3 to 5">3 to 5</option>
            <option value="5 to 6:30">5 to 6:30</option>
            <option value="Weekend: 10 to 2">Weekend: 10 to 2</option>
            <option value="Weekend: 3 to 6:30">Weekend: 3 to 6:30</option>
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Fees</label>
          <input type="number" name="totalFees" value={form.totalFees} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
          <input type="number" name="paid" value={form.paid} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">EMI Date</label>
          <input type="date" name="emiDate" value={form.emiDate} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Module</label>
          <select 
            name="currentModule" 
            value={form.currentModule} 
            onChange={handleChange} 
            className="w-full border p-2 rounded bg-white"
            disabled={!form.course}
          >
            <option value="">Select Module</option>
            {form.course && COURSE_DATA[form.course]?.map(mod => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Completed Modules</label>
          <input type="number" name="completedModules" value={form.completedModules} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pending Modules</label>
          <input 
            type="number" 
            name="pendingModules" 
            value={form.pendingModules} 
            onChange={handleChange} 
            className="w-full border p-2 rounded bg-gray-50" 
            readOnly 
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
          <input type="date" name="completionDate" value={form.completionDate} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-bold text-gray-700 mb-3">Module History (Completed Modules)</label>
        {form.moduleHistory.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-3">
            <select
              value={item.module}
              onChange={(e) => handleModuleHistoryChange(index, "module", e.target.value)}
              className="w-full border p-2 rounded bg-white"
            >
              <option value="">Select Module</option>
              {form.course && COURSE_DATA[form.course]?.map(mod => (
                <option key={mod} value={mod}>{mod}</option>
              ))}
              {!form.course && <option value="" disabled>Select course first</option>}
            </select>

            <input
              type="date"
              value={item.completionDate}
              onChange={(e) => handleModuleHistoryChange(index, "completionDate", e.target.value)}
              className="w-full border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => removeModuleHistory(index)}
              className="bg-red-500 text-white px-3 py-2 rounded font-bold hover:bg-red-600"
              title="Remove Module"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addModuleHistory}
          className="text-sm font-semibold bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          + Add Completed Module
        </button>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white w-full py-2 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-black text-white w-full py-2 rounded">
          {buttonText}
        </button>
      </div>

    </form>
  );
}