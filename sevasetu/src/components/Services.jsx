import { useState } from "react";
import { Link } from "react-router-dom";

function Services() {
  const [search, setSearch] = useState("");

  const services = [
    "Job Assistance",
    "Resume Builder",
    "Website Development",
    "Digital Marketing",
    "GST Registration",
    "Loan Consultation",
    "Electrician Service",
    "Plumber Service",
  ];

  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Our Services
      </h1>

<div className="bg-red-500 text-white p-4 mb-4">
  SEARCH BOX TEST
</div>
      {/* Search Box */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search Services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 p-3 rounded-lg shadow"
        />
      </div>

      {/* Service Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredServices.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-bold mb-3">
              {service}
            </h2>

            <p className="text-gray-600 mb-4">
              Professional and trusted service provider.
            </p>

            <Link to={`/service/${service}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Services;