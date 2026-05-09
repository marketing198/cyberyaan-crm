import {
  FaUsers,
  FaMoneyBillWave,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar() {

  const menus = [
    {
      name: "Dashboard",
      icon: <FaChartBar />,
    },

    {
      name: "Students",
      icon: <FaUsers />,
    },

    {
      name: "Fees",
      icon: <FaMoneyBillWave />,
    },

    {
      name: "Modules",
      icon: <FaBook />,
    },

    {
      name: "Attendance",
      icon: <FaClipboardCheck />,
    },
  ];

  return (
    <div className="w-[260px] min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Cyberyaan CRM
      </h1>

      <div className="space-y-3">

        {menus.map((menu, index) => (

          <button
            key={index}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white hover:text-black transition"
          >

            <span className="text-lg">
              {menu.icon}
            </span>

            <span className="font-medium">
              {menu.name}
            </span>

          </button>
        ))}

      </div>

    </div>
  );
}