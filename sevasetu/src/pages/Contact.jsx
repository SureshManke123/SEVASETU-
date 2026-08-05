import { useState } from "react";
import API from "../api";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" }); const [loading, setLoading] = useState(false);
  const submit = async (event) => { event.preventDefault(); setLoading(true); try { const { data } = await API.post("/contact", form); alert(data.message); setForm({ name: "", email: "", message: "" }); } catch (err) { alert(err.response?.data?.message || "Could not send message."); } finally { setLoading(false); } };
  return <div className="min-h-screen bg-gray-100 py-10 px-6">
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-8">Have questions? Get in touch with us.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-4"><p>📍 <strong>Address:</strong> Mehkar, Buldhana, Maharashtra</p><p>📞 <strong>Phone:</strong> +91 8459458049</p><p>✉️ <strong>Email:</strong> sureshmanke111@gmail.com</p><p>🕒 <strong>Working Hours:</strong> 9 AM - 7 PM</p></div></div><div><h2 className="text-2xl font-bold mb-4">Send Message</h2>
  <form onSubmit={submit} className="space-y-4">
    <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg" /><input required type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg" /><textarea required placeholder="Your Message" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg" /><button disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">{loading ? "Sending..." : "Send Message"}</button></form></div></div></div></div>;
}
export default Contact;
