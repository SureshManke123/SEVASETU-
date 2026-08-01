import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api";

function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({ address: "", bookingDate: "", bookingTime: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const serviceId = searchParams.get("serviceId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) return navigate("/login");
    if (!serviceId) return alert("Please choose a service before booking.");
    setLoading(true);
    try {
      const { data } = await API.post("/bookings/create", { ...booking, serviceId });
      alert(data.message);
      navigate("/booking-history");
    } catch (err) {
      alert(err.response?.data?.message || "Could not create booking.");
    } finally { setLoading(false); }
  };

  return <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Book Service</h1>
      <form onSubmit={handleSubmit}>
        <input name="address" placeholder="Service Address" value={booking.address} onChange={(e) => setBooking({ ...booking, address: e.target.value })} required className="w-full border p-3 rounded-lg mb-4" />
        <input type="date" name="bookingDate" value={booking.bookingDate} onChange={(e) => setBooking({ ...booking, bookingDate: e.target.value })} required className="w-full border p-3 rounded-lg mb-4" />
        <input type="time" name="bookingTime" value={booking.bookingTime} onChange={(e) => setBooking({ ...booking, bookingTime: e.target.value })} required className="w-full border p-3 rounded-lg mb-4" />
        <textarea name="notes" placeholder="Notes (optional)" value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} className="w-full border p-3 rounded-lg mb-6" />
        <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">{loading ? "Creating booking..." : "Confirm Booking"}</button>
      </form>
    </div>
  </div>;
}

export default Booking;
