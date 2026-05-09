export default function DashboardStats({
  students,
}) {
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const pendingFees = students.reduce(
    (acc, student) =>
      acc + (student.totalFees - student.paid),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold">
          Total Students
        </h2>

        <p className="text-3xl font-bold mt-2">
          {totalStudents}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold">
          Active Students
        </h2>

        <p className="text-3xl font-bold mt-2">
          {activeStudents}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold">
          Pending Fees
        </h2>

        <p className="text-3xl font-bold mt-2">
          ₹{pendingFees.toLocaleString()}
        </p>
      </div>

    </div>
  );
}