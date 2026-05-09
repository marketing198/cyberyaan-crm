export default function ModuleProgress({
  students,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">
        Module Progress
      </h2>

      <div className="space-y-5">

        {students.map((student) => {

          const totalModules =
            student.completedModules +
            student.pendingModules;

          const progress =
            totalModules > 0
              ? (student.completedModules /
                  totalModules) *
                100
              : 0;

          return (
            <div key={student.id}>

              <div className="flex justify-between mb-1">

                <span className="font-medium">
                  {student.name}
                </span>

                <span className="text-sm text-gray-500">
                  {student.currentModule}
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                  className="bg-black h-3 rounded-full"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>

              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-2">

                <span>
                  Completed:
                  {student.completedModules}
                </span>

                <span>
                  Remaining:
                  {student.pendingModules}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}