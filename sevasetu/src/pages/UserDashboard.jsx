import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([API.get("/auth/me"), API.get("/bookings/my")])
      .then(([profile, bookingData]) => { setUser(profile.data.user); setBookings(bookingData.data.bookings); })
      .catch((err) => setError(err.response?.data?.message || "Could not load dashboard."));
  }, []);
  return <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-blue-600 mb-8">User Dashboard</h1>
    {error && <p className="text-red-600 mb-4">{error}</p>}
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6"><h2 className="text-2xl font-bold mb-4">My Profile</h2>{user && <div className="space-y-2"><p><strong>Name:</strong> {user.name}</p><p><strong>Email:</strong> {user.email}</p><p><strong>Phone:</strong> {user.phone || "Not provided"}</p><Link className="text-blue-600 font-medium" to="/profile">Edit profile</Link></div>}</div>
    <div className="bg-white shadow-lg rounded-xl p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Recent Bookings</h2><Link className="text-blue-600 font-medium" to="/booking-history">View all</Link></div><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-blue-100"><th className="border p-3 text-left">Service</th><th className="border p-3 text-left">Date</th><th className="border p-3 text-left">Status</th></tr></thead><tbody>{bookings.slice(0, 5).map((booking) => <tr key={booking._id}><td className="border p-3">{booking.service?.title}</td><td className="border p-3">{new Date(booking.bookingDate).toLocaleDateString()}</td><td className="border p-3 capitalize">{booking.status}</td></tr>)}</tbody></table>{!bookings.length && <p className="text-center text-gray-500 pt-4">No bookings yet.</p>}</div></div>
  </div>;
}
export default UserDashboard;
