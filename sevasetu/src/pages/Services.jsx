import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/services")
      .then(({ data }) => setServices(data.services))
      .catch((err) => setError(err.response?.data?.message || "Could not load services."));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Our Services</h1>
      {error && <p className="text-center text-red-600 mb-6">{error}</p>}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-xl font-bold mb-3">{service.title}</h2>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p className="text-sm text-gray-500 mb-4">{service.category} · {service.location} · ₹{service.price}</p>
            <Link to={`/service/${service._id}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View Details</Link>
          </div>
        ))}
      </div>
      {!error && services.length === 0 && <p className="text-center text-gray-500">No services are available yet.</p>}
    </div>
  );
}

export default Services;
