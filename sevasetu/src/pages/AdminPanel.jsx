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

  // ================= LOAD DATA =================

  const load = async () => {
    try {
      const [
        userData,
        serviceData,
        bookingData,
        statData,
        expertData,
      ] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/services"),
        API.get("/admin/bookings"),
        API.get("/admin/dashboard"),
        API.get("/admin/experts/pending"),
      ]);

      setUsers(userData.data.users || []);
      setServices(serviceData.data.services || []);
      setBookings(bookingData.data.bookings || []);
      setStats(statData.data.dashboard || null);
      setPendingExperts(expertData.data.experts || []);

      setError("");
    } catch (err) {
      console.log("Admin Load Error:", err.response?.data);

      setError(
        err.response?.data?.message ||
          "Could not load administration data."
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ================= CHANGE ROLE =================

  const changeRole = async (id, role) => {
    try {
      const res = await API.put(
        `/admin/users/${id}/role`,
        { role }
      );

      console.log("Role Updated:", res.data);

      await load();
    } catch (err) {
      console.log(
        "Role Update Error:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
          "Could not update role."
      );
    }
  };

  // ================= DELETE USER =================

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      await API.delete(`/admin/users/${id}`);

      await load();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not delete user."
      );
    }
  };

  // ================= DELETE SERVICE =================

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) {
      return;
    }

    try {
      await API.delete(`/admin/services/${id}`);

      await load();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not delete service."
      );
    }
  };

  // ================= DELETE BOOKING =================

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) {
      return;
    }

    try {
      await API.delete(`/admin/bookings/${id}`);

      alert("Booking deleted successfully");

      await load();
    } catch (err) {
      console.log(
        "Booking Delete Error:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
          "Could not delete booking."
      );
    }
  };

  // ================= APPROVE / REJECT EXPERT =================

  const approveExpert = async (id, action) => {
    try {
      await API.put(
        `/admin/experts/${id}/approval`,
        {
          action,
        }
      );

      alert(
        action === "approve"
          ? "Expert approved successfully"
          : "Expert rejected successfully"
      );

      await load();
    } catch (err) {
      console.log(
        "Expert approval error:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
          "Could not update expert status."
      );
    }
  };

  // ================= RETURN =================

  return (
    <AdminLayout>

      {error && (
        <p className="text-red-400 mb-4">
          {error}
        </p>
      )}

      <AdminStats stats={stats} />

      {/* ================= PENDING EXPERTS ================= */}

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-bold text-white">
            Pending Expert Requests
          </h2>

          <span className="text-slate-400">
            {pendingExperts.length} pending
          </span>

        </div>

        {pendingExperts.length === 0 ? (
          <p className="text-slate-400">
            No pending expert requests.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-white">

              <thead>
                <tr className="bg-slate-800">

                  <th className="p-3 text-left">
                    Name
                  </th>

                  <th className="p-3 text-left">
                    Email
                  </th>

                  <th className="p-3 text-left">
                    Category
                  </th>

                  <th className="p-3 text-left">
                    Experience
                  </th>

                  <th className="p-3 text-left">
                    Price
                  </th>

                  <th className="p-3 text-left">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {pendingExperts.map((expert) => (
                  <tr
                    key={expert._id}
                    className="border-b border-slate-800"
                  >

                    <td className="p-3">
                      {expert.name}
                    </td>

                    <td className="p-3">
                      {expert.email}
                    </td>

                    <td className="p-3">
                      {expert.category || "—"}
                    </td>

                    <td className="p-3">
                      {expert.experience || 0} years
                    </td>

                    <td className="p-3">
                      ₹{expert.price || 0}
                    </td>

                    <td className="p-3">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            approveExpert(
                              expert._id,
                              "approve"
                            )
                          }
                          className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded text-xs"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            approveExpert(
                              expert._id,
                              "reject"
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                        >
                          Reject
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

      {/* ================= USERS ================= */}

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-bold text-white">
            Users
          </h2>

          <span className="text-slate-400">
            {users.length} users
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-white">

            <thead>
              <tr className="bg-slate-800">

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Email
                </th>

                <th className="p-3 text-left">
                  Role
                </th>

                <th className="p-3 text-left">
                  Verified
                </th>

                <th className="p-3 text-left">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-800"
                >

                  <td className="p-3">
                    {user.name}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">

                    <select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(
                          user._id,
                          e.target.value
                        )
                      }
                      className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                    >

                      <option value="user">
                        User
                      </option>

                      <option value="expert">
                        Expert
                      </option>

                      <option value="admin">
                        Admin
                      </option>

                    </select>

                  </td>

                  <td className="p-3">
                    {user.isVerified
                      ? "✅"
                      : "⏳"}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        deleteUser(user._id)
                      }
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

        <h2 className="text-2xl font-bold text-white mb-4">
          Services
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-white">

            <thead>
              <tr className="bg-slate-800">

                <th className="p-3 text-left">
                  Title
                </th>

                <th className="p-3 text-left">
                  Provider
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {services.map((service) => (
                <tr
                  key={service._id}
                  className="border-b border-slate-800"
                >

                  <td className="p-3">
                    {service.title}
                  </td>

                  <td className="p-3">
                    {service.provider?.name || "—"}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        deleteService(
                          service._id
                        )
                      }
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

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-bold text-white">
            Bookings
          </h2>

          <span className="text-slate-400">
            {bookings.length} bookings
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-white">

            <thead>

              <tr className="bg-slate-800">

                <th className="p-3 text-left">
                  Customer
                </th>

                <th className="p-3 text-left">
                  Service
                </th>

                <th className="p-3 text-left">
                  Date
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="p-6 text-center text-slate-400"
                  >
                    No bookings found.
                  </td>

                </tr>

              ) : (

                bookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-b border-slate-800"
                  >

                    <td className="p-3">
                      {booking.customer?.name || "—"}
                    </td>

                    <td className="p-3">
                      {booking.service?.title || "—"}
                    </td>

                    <td className="p-3">
                      {booking.bookingDate
                        ? new Date(
                            booking.bookingDate
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="p-3 capitalize">
                      {booking.status || "—"}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteBooking(
                            booking._id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </AdminLayout>
  );
}

export default AdminPanel;