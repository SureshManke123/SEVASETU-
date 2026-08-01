import { useEffect, useState } from "react";
import API from "../api";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const loadBookings = () => API.get("/bookings/my").then(({ data }) => setBookings(data.bookings)).catch((err) => setError(err.response?.data?.message || "Could not load bookings."));
  useEffect(() => { loadBookings(); }, []);
  const cancelBooking = async (id) => {
    try { await API.put(`/bookings/cancel/${id}`); loadBookings(); }
    catch (err) { alert(err.response?.data?.message || "Could not cancel booking."); }
  };
  return <div className="min-h-screen bg-gray-100 p-8">
    <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg mb-8"><h1 className="text-4xl font-bold">Booking History</h1><p className="mt-2">View and manage your previous bookings</p></div>
    {error && <p className="text-red-600 mb-4">{error}</p>}
    <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto"><table className="w-full border-collapse"><thead><tr className="bg-red-100"><th className="border p-3 text-left">Service</th><th className="border p-3 text-left">Provider</th><th className="border p-3 text-left">Date</th><th className="border p-3 text-left">Status</th><th className="border p-3 text-left">Action</th></tr></thead><tbody>
      {bookings.map((booking) => <tr key={booking._id}><td className="border p-3">{booking.service?.title}</td><td className="border p-3">{booking.provider?.name}</td><td className="border p-3">{new Date(booking.bookingDate).toLocaleDateString()} {booking.bookingTime}</td><td className="border p-3 capitalize">{booking.status}</td><td className="border p-3">{!["cancelled", "completed"].includes(booking.status) && <button onClick={() => cancelBooking(booking._id)} className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>}</td></tr>)}
    </tbody></table>{!bookings.length && !error && <p className="text-center text-gray-500 pt-4">No bookings yet.</p>}</div>
  </div>;
}
export default BookingHistory;
