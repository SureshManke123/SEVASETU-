import { motion } from "framer-motion";
import {FiUsers,FiShield,FiBriefcase,FiCalendar,FiDollarSign,} from "react-icons/fi";

function AdminStats({ stats }) {
const cards = [
{
label: "Users",
value: stats?.totalUsers || 0,
icon: <FiUsers />,
color: "from-cyan-500 to-blue-600",
},
{
label: "Experts",
value: stats?.totalExperts || 0,
icon: <FiShield />,
color: "from-emerald-500 to-green-600",
},
{
label: "Services",
value: stats?.totalServices || 0,
icon: <FiBriefcase />,
color: "from-purple-500 to-indigo-600",
},
{
label: "Bookings",
value: stats?.totalBookings || 0,
icon: <FiCalendar />,
color: "from-orange-500 to-red-600",
},
{
label: "Revenue",
value: `₹${stats?.totalRevenue || 0}`,
icon: <FiDollarSign />,
color: "from-pink-500 to-rose-600",
},
];

return ( <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
{cards.map((card, index) => (
<motion.div
key={card.label}
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.08 }}
className={`rounded-2xl p-5 text-white bg-gradient-to-br ${card.color} shadow-xl`}
> <div className="flex items-center justify-between"> <div> <p className="text-white/80 text-sm">{card.label}</p> <h3 className="text-3xl font-bold mt-2">{card.value}</h3> </div>

```
        <div className="text-3xl opacity-90">{card.icon}</div>
      </div>
    </motion.div>
  ))}
</div>
);
}

export default AdminStats;
