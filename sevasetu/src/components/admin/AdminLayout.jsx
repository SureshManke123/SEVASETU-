import { motion } from "framer-motion";
import { useState } from "react";
import {
FiHome,
FiUsers,
FiBriefcase,
FiCalendar,
FiBell,
FiSettings,
FiShield,
} from "react-icons/fi";

function AdminLayout({ children }) {
const [active, setActive] = useState("Dashboard");

const menuItems = [
{ label: "Dashboard", icon: <FiHome /> },
{ label: "Users", icon: <FiUsers /> },
{ label: "Experts", icon: <FiShield /> },
{ label: "Services", icon: <FiBriefcase /> },
{ label: "Bookings", icon: <FiCalendar /> },
{ label: "Notifications", icon: <FiBell /> },
{ label: "Settings", icon: <FiSettings /> },
];

return ( <div className="min-h-screen bg-slate-950 text-white flex">
{/* Sidebar */}
<motion.aside
initial={{ x: -100, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
className="w-64 bg-slate-900 border-r border-slate-800 p-6 hidden md:block"
> <h1 className="text-3xl font-bold text-cyan-400 mb-10">
SevaSetu </h1>

```
    <nav className="space-y-3">
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            active === item.label
              ? "bg-cyan-500 text-white"
              : "hover:bg-slate-800 text-slate-300"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  </motion.aside>

  {/* Main */}
  <div className="flex-1">
    {/* Topbar */}
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">{active}</h2>

      <div className="flex items-center gap-4">
        <FiBell className="text-xl text-slate-400" />
        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>

    <main className="p-6">{children}</main>
  </div>
</div>


);
}

export default AdminLayout;
