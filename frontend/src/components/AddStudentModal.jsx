import StudentForm from "./StudentForm";
import { addStudent } from "../api/studentApi";

export default function AddStudentModal({
  isOpen,
  setIsOpen,
  fetchStudents,
}) {

  if (!isOpen) return null;

  const handleSubmit = async (data) => {
    await addStudent(data);
    fetchStudents();
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-[600px]">

        <h2 className="text-xl font-bold mb-4">
          Add Student
        </h2>

        <StudentForm
          onSubmit={handleSubmit}
          buttonText="Save Student"
        />

      </div>

    </div>
  );
}