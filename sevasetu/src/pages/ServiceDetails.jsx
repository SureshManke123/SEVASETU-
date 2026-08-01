import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api";

function ServiceDetails() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/services/${serviceId}`)
      .then(({ data }) => setService(data.service))
      .catch((err) => setError(err.response?.data?.message || "Could not load this service."));
  }, [serviceId]);

  if (error) return <div className="min-h-screen p-10 text-center text-red-600">{error}</div>;
  if (!service) return <div className="min-h-screen p-10 text-center">Loading service…</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">{service.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{service.description}</p>
        <div className="bg-blue-50 p-6 rounded-lg mb-6 space-y-2">
          <p><strong>Category:</strong> {service.category}</p>
          <p><strong>Location:</strong> {service.location}</p>
          <p><strong>Provider:</strong> {service.provider?.name || "Seva Setu expert"}</p>
          <p><strong>Price:</strong> ₹{service.price}</p>
        </div>
        <Link to={`/booking?serviceId=${service._id}`} className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">Book This Service</Link>
      </div>
    </div>
  );
}

export default ServiceDetails;
