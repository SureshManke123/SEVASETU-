import { useEffect, useState } from "react";
import API from "../api";

function Notifications() {
  const [notifications, setNotifications] = useState([]); const [error, setError] = useState("");
  const load = () => API.get("/notifications").then(({ data }) => setNotifications(data.notifications)).catch((err) => setError(err.response?.data?.message || "Could not load notifications."));
  useEffect(() => { load(); }, []);
  const dismiss = async (id) => { try { await API.delete(`/notifications/${id}`); setNotifications((items) => items.filter((item) => item._id !== id)); } catch (err) { alert(err.response?.data?.message || "Could not remove notification."); } };
  const markRead = async (id) => { try { await API.put(`/notifications/read/${id}`); setNotifications((items) => items.map((item) => item._id === id ? { ...item, isRead: true } : item)); } catch (err) { alert(err.response?.data?.message || "Could not mark notification as read."); } };
  return <div className="min-h-screen bg-gray-100 p-8"><div className="bg-red-600 text-white p-6 rounded-xl mb-8"><h1 className="text-4xl font-bold">Notifications</h1><p className="mt-2">Manage your notifications</p></div>{error && <p className="text-red-600 mb-4">{error}</p>}<div className="space-y-4">{notifications.map((notification) => <div key={notification._id} className={`p-5 rounded-xl shadow-lg flex justify-between items-center ${notification.isRead ? "bg-white" : "bg-blue-100"}`}><div><h3 className="font-bold text-lg">{notification.title}</h3><p>{notification.message}</p></div><div className="flex gap-2"><button onClick={() => markRead(notification._id)} disabled={notification.isRead} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">Read</button><button onClick={() => dismiss(notification._id)} className="bg-black text-white px-4 py-2 rounded">Dismiss</button></div></div>)}{!notifications.length && !error && <div className="bg-white p-8 rounded-xl shadow-lg text-center"><h2 className="text-2xl font-bold">No Notifications</h2></div>}</div></div>;
}
export default Notifications;
