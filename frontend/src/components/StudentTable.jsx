export default function StudentTable({ students }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-2xl font-bold">
          Student Records
        </h2>

        <button className="bg-black text-white px-4 py-2 rounded-xl">
          Add Student
        </button>

      </div>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-100 text-left">

            <th className="p-3">Name</th>
            <th className="p-3">Course</th>
            <th className="p-3">Fees</th>
            <th className="p-3">Paid</th>
            <th className="p-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr
              key={student.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-3">
                {student.name}
              </td>

              <td className="p-3">
                {student.course}
              </td>

              <td className="p-3">
                ₹{student.totalFees}
              </td>

              <td className="p-3">
                ₹{student.paid}
              </td>

              <td className="p-3">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {student.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}