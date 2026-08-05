import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/admin/AdminLayout";
import AdminStats from "../components/admin/AdminStats";

function AdminPanel() {
const [users, setUsers] = useState([]);
const [services, setServices] = useState([]);
const [bookings, setBookings] = useState([]);
const [stats, setStats] = useState(null);
const [error, setError] = useState("");
const [pendingExperts, setPendingExperts] = useState([]);

const load = () =>
Promise.all([
API.get("/admin/users"),
API.get("/admin/services"),
API.get("/admin/bookings"),
API.get("/admin/dashboard"),
])
.then(([userData, serviceData, bookingData, statData]) => {
setUsers(userData.data.users);
setServices(serviceData.data.services);
setBookings(bookingData.data.bookings);
setStats(statData.data.dashboard);
})
.catch((err) =>
setError(
err.response?.data?.message ||
"Could not load administration data."
)
);

useEffect(() => {
load();
}, []);

// ================= CHANGE ROLE =================
const changeRole = async (id, role) => {
try {
const res = await API.put(`/admin/users/${id}/role`, { role });
console.log("Role Updated:", res.data);
load();
} catch (err) {
console.log("Role Update Error:", err.response?.data);
alert(
err.response?.data?.message ||
JSON.stringify(err.response?.data) ||
"Could not update role."
);
}
};

// ================= DELETE USER =================
const deleteUser = async (id) => {
if (!window.confirm("Delete this user?")) return;

try {
  await API.delete(`/admin/users/${id}`);
  load();
} catch (err) {
  alert(err.response?.data?.message || "Could not delete user.");
}
};

// ================= DELETE SERVICE =================
const deleteService = async (id) => {
if (!window.confirm("Delete this service?")) return;

try {
  await API.delete(`/admin/services/$;{id}`);
  load();
} catch (err) {
  alert(err.response?.data?.message || "Could not delete service.");
}
};

return ( <AdminLayout>
{error && <p className="text-red-400 mb-4">{error}</p>}

  <AdminStats stats={stats} />

  {/* ================= USERS ================= */}
  <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-white">Users</h2>
      <span className="text-slate-400">{users.length} users</span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Verified</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-slate-800">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>

              <td className="p-3">
                <select
                  value={user.role}
                  onChange={(e) => changeRole(user._id, e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="user">User</option>
                  <option value="expert">Expert</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td className="p-3">{user.isVerified ? "✅" : "⏳"}</td>

              <td className="p-3">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>

  {/* ================= SERVICES ================= */}
  <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-white mb-4">Services</h2>

    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Provider</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service._id} className="border-b border-slate-800">
              <td className="p-3">{service.title}</td>
              <td className="p-3">{service.provider?.name || "—"}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteService(service._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>

  {/* ================= BOOKINGS ================= */}
  <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h2 className="text-2xl font-bold text-white mb-4">Bookings</h2>

    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b border-slate-800">
              <td className="p-3">{booking.customer?.name}</td>
              <td className="p-3">{booking.service?.title}</td>
              <td className="p-3">
                {new Date(booking.bookingDate).toLocaleDateString()}
              </td>
              <td className="p-3 capitalize">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
</AdminLayout>
);
}

export default AdminPanel;
