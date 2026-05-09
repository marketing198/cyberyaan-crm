import StudentForm from "./StudentForm";
import { updateStudent } from "../api/studentApi";

export default function EditStudentModal({
  isEditOpen,
  setIsEditOpen,
  editStudent,
  fetchStudents,
}) {

  if (!isEditOpen || !editStudent) return null;

  const handleSubmit = async (data) => {
    await updateStudent(editStudent._id, data);
    fetchStudents();
    setIsEditOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-[600px]">

        <h2 className="text-xl font-bold mb-4">
          Edit Student
        </h2>

        <StudentForm
          initialData={editStudent}
          onSubmit={handleSubmit}
          buttonText="Update Student"
        />

      </div>

    </div>
  );
}