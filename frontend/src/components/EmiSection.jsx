export default function EmiSection({ students }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">
        Upcoming EMI Dates
      </h2>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

        {students.filter(student => (student.totalFees || 0) - (student.paid || 0) > 0).length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending EMIs</p>
        ) : (
          students
            .filter(student => (student.totalFees || 0) - (student.paid || 0) > 0)
            .map((student) => {

            const pendingAmount = student.totalFees - student.paid;

            let nextEmiStr = "Not Set";
            if (student.emiDate) {
              const emiDate = new Date(student.emiDate);
              if (!isNaN(emiDate.getTime())) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
                
                // Calculate next EMI date using current month and original day
                const nextEmi = new Date(today.getFullYear(), today.getMonth(), emiDate.getDate());
                
                // If that date has already passed this month, move it to next month
                if (nextEmi < today) {
                  nextEmi.setMonth(nextEmi.getMonth() + 1);
                }
                
                nextEmiStr = nextEmi.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                });
              } else {
                nextEmiStr = student.emiDate;
              }
            }

            return (
              <div
                key={student._id || Math.random()}
                className="border rounded-xl p-4 flex justify-between items-center bg-gray-50"
              >

                <div>

                  <p className="font-semibold text-gray-900">
                    {student.name}
                  </p>

                  <p className="text-sm font-bold text-red-500 mt-1">
                    Next Due: {nextEmiStr}
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
          })
        )}

      </div>

    </div>
  );
}