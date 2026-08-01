import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function SearchServices() {
  const [services, setServices] = useState([]); const [search, setSearch] = useState(""); const [category, setCategory] = useState(""); const [location, setLocation] = useState(""); const [error, setError] = useState("");
  useEffect(() => { const timer = setTimeout(() => { API.get("/services/filter", { params: { ...(category && { category }), ...(location && { location }) } }).then(({ data }) => setServices(data.services.filter((s) => `${s.title} ${s.description}`.toLowerCase().includes(search.toLowerCase())))).catch((err) => setError(err.response?.data?.message || "Could not search services.")); }, 250); return () => clearTimeout(timer); }, [search, category, location]);
  const categories = [...new Set(services.map((s) => s.category))]; const locations = [...new Set(services.map((s) => s.location))];
  return <div className="min-h-screen bg-gray-100 p-8"><div className="bg-red-600 text-white p-6 rounded-xl mb-8"><h1 className="text-4xl font-bold">Search Services</h1><p className="mt-2">Find services quickly using filters</p></div>{error && <p className="text-red-600 mb-4">{error}</p>}
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 grid md:grid-cols-3 gap-4"><input placeholder="Search service..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-3 rounded-lg" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded-lg"><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={location} onChange={(e) => setLocation(e.target.value)} className="border p-3 rounded-lg"><option value="">All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{services.map((service) => <div key={service._id} className="bg-white shadow-lg rounded-xl p-6"><h2 className="text-2xl font-bold text-red-600">{service.title}</h2><p className="mt-2"><strong>Category:</strong> {service.category}</p><p className="mt-2"><strong>Location:</strong> {service.location}</p><Link to={`/service/${service._id}`} className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded">View Details</Link></div>)}</div>
    {!error && !services.length && <p className="text-center text-gray-500 text-xl">No Services Found</p>}</div>;
}
export default SearchServices;
