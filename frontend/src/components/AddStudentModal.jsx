import StudentForm from "./StudentForm";
import { addStudent } from "../api/studentApi";

export default function AddStudentModal({
  isOpen,
  setIsOpen,
  fetchStudents,
  students,
}) {


  if (!isOpen) return null;

  const handleSubmit = async (data) => {
    await addStudent(data);
    fetchStudents();
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          Add Student
        </h2>

        <StudentForm
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
          buttonText="Save Student"
          students={students}
        />


      </div>

    </div>
  );
}