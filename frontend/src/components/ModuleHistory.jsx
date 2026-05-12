export default function ModuleHistory({
  students,
  selectedStudent,
  setSelectedStudent,
  searchTerm,
  setSearchTerm,
}) {

  // Search Filter
  const filteredStudents = students.filter(
    (student) => {

      const query =
        searchTerm.toLowerCase();

      return (
        student.name
          ?.toLowerCase()
          .includes(query) ||

        student.phone
          ?.toString()
          .includes(query) ||

        student.enrollmentId
          ?.toString()
          .toLowerCase()
          .includes(query)
      );
    }
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h2 className="text-2xl font-bold">
          Student Module Completion History
        </h2>

        <input
          type="text"
          placeholder="Search by Name, Phone Number or Enrollment ID"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-xl px-4 py-3 w-full md:w-[400px] outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* Students */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {searchTerm.trim() ? (

          filteredStudents.length > 0 ? (

            filteredStudents.map((student) => (

              <div
                key={student._id}
                className="border rounded-2xl bg-white p-5 shadow-sm"
              >

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <h3 className="text-lg font-bold">
                      {student.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {student.course}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      ID: {student.enrollmentId}
                    </p>

                    <p className="text-sm text-gray-500">
                      Phone: {student.phone}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">
                      Completed
                    </p>

                    <p className="text-xl font-bold text-green-700">
                      {student.moduleHistory?.length || 0}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedStudent(
                      selectedStudent === student._id
                        ? null
                        : student._id
                    )
                  }
                  className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90 transition"
                >
                  {selectedStudent === student._id
                    ? "Hide History"
                    : "View Module History"}
                </button>

                {selectedStudent === student._id && (

                  <div className="overflow-x-auto mt-5">

                    <table className="w-full border-collapse">

                      <thead>

                        <tr className="bg-gray-100 text-left">

                          <th className="p-3">
                            Module Name
                          </th>

                          <th className="p-3">
                            Completion Date
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {student.moduleHistory
                          ?.length > 0 ? (

                          student.moduleHistory.map(
                            (
                              moduleItem,
                              index
                            ) => (

                              <tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                              >

                                <td className="p-3 font-medium">

                                  {typeof moduleItem === "string"
                                    ? moduleItem
                                    : moduleItem.module}

                                </td>

                                <td className="p-3 text-gray-600">

                                  {typeof moduleItem === "string"
                                    ? "-"
                                    : moduleItem.completionDate}

                                </td>

                              </tr>
                            )
                          )

                        ) : (

                          <tr>

                            <td
                              colSpan="2"
                              className="p-4 text-center text-gray-500"
                            >
                              No Module History
                            </td>

                          </tr>
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>
            ))

          ) : (

            <div className="col-span-full text-center py-10 text-gray-500 text-lg">
              No student found.
            </div>
          )

        ) : (

          <div className="col-span-full text-center py-10 text-gray-500 text-lg">
            Search student by Name, Phone Number or Enrollment ID.
          </div>
        )}

      </div>

    </div>
  );
}