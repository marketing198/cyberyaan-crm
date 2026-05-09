import { useEffect, useState } from "react";

import EmiSection from "../components/EmiSection";
import ModuleProgress from "../components/ModuleProgress";
import CourseModules from "../components/CourseModules";
import ModuleHistory from "../components/ModuleHistory";
import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";
import Navbar from "../components/Navbar";
import {
  getStudents,
  deleteStudent,
} from "../api/studentApi";

export default function Dashboard() {

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [isOpen, setIsOpen] =
    useState(false);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [editStudent, setEditStudent] =
    useState(null);

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      const data =
        await getStudents();

      setStudents(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    try {

      await deleteStudent(id);

      fetchStudents();

    } catch (error) {

      console.log(error);
    }
  };

  const handleEdit = (student) => {

    setEditStudent(student);

    setIsEditOpen(true);
  };

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const completedStudents = students.filter(
    (student) =>
      student.status === "Completed"
  ).length;

  const pendingFees = students.reduce(
    (acc, student) =>
      acc + (student.totalFees - student.paid),
    0
  );

  const courseModules = [
    "Networking",
    "Linux",
    "Python",
    "Ethical Hacking",
    "Web Pentesting",
    "Network Pentesting",
    "API Pentesting",
    "Active Directory",
    "SOC",
    "Mobile Pentesting",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Cybersecurity Institute CRM
          </h1>

          <p className="text-gray-600 mt-2">
            Manage students, fees,
            modules, attendance,
            and EMI tracking.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-lg font-semibold text-gray-700">
              Total Students
            </h2>

            <p className="text-3xl font-bold mt-3">
              {totalStudents}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-lg font-semibold text-gray-700">
              Active Students
            </h2>

            <p className="text-3xl font-bold mt-3">
              {activeStudents}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-lg font-semibold text-gray-700">
              Completed Students
            </h2>

            <p className="text-3xl font-bold mt-3">
              {completedStudents}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-lg font-semibold text-gray-700">
              Pending Fees
            </h2>

            <p className="text-3xl font-bold mt-3">
              ₹{pendingFees.toLocaleString()}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-2xl font-bold">
              Student Records
            </h2>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
            >
              Add Student
            </button>

          </div>

          <table className="w-full border-collapse min-w-[1200px]">

            <thead>

              <tr className="bg-gray-100 text-left">

                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Course</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Current Module</th>
                <th className="p-3">Completed</th>
                <th className="p-3">Pending</th>
                <th className="p-3">Fees</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>

              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {student.name}
                  </td>

                  <td className="p-3">
                    {student.phone}
                  </td>

                  <td className="p-3">
                    {student.course}
                  </td>

                  <td className="p-3">
                    {student.batch}
                  </td>

                  <td className="p-3">
                    {student.currentModule}
                  </td>

                  <td className="p-3 text-green-700 font-semibold">
                    {student.completedModules}
                  </td>

                  <td className="p-3 text-orange-600 font-semibold">
                    {student.pendingModules}
                  </td>

                  <td className="p-3">
                    ₹{student.totalFees}
                  </td>

                  <td className="p-3">
                    ₹{student.paid}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {student.status}
                    </span>

                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        handleEdit(student)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(student._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <EmiSection students={students} />

          <ModuleProgress students={students} />

        </div>

        <CourseModules
          courseModules={courseModules}
        />

        <ModuleHistory
          students={students}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddStudentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          students={students}
          setStudents={setStudents}
          fetchStudents={fetchStudents}
        />

        <EditStudentModal
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          editStudent={editStudent}
          students={students}
          setStudents={setStudents}
          fetchStudents={fetchStudents}
        />

      </div>

    </div>
  );
}