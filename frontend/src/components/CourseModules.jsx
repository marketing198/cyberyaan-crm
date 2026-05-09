export default function CourseModules({
  courseModules,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Cybersecurity Course Modules
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {courseModules.map((module, index) => (

          <div
            key={module}
            className="border rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition"
          >

            <p className="text-sm text-gray-500">
              Module {index + 1}
            </p>

            <h3 className="font-bold text-lg mt-2">
              {module}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}