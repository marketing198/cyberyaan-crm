export default function EmiSection({ students }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">
        Upcoming EMI Dates
      </h2>

      <div className="space-y-4">

        {students.map((student) => {

          const pendingAmount =
            student.totalFees - student.paid;

          return (
            <div
              key={student.id}
              className="border rounded-xl p-4 flex justify-between items-center"
            >

              <div>

                <p className="font-semibold">
                  {student.name}
                </p>

                <p className="text-sm text-gray-500">
                  EMI Date: {student.emiDate}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-red-600">
                  ₹{pendingAmount.toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  Pending
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}