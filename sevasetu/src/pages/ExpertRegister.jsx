import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function ExpertRegister() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    experience: "",
    price: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      await API.post("/auth/expert-register", form);

      alert("Expert Registration Successful ✅");

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center py-12 px-5">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-700">
            👨‍🔧 Become a Service Expert
          </h1>

          <p className="text-gray-500 mt-2">
            Register as a verified service provider.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            value={form.address}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <select
            name="category"
            required
            value={form.category}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="">Select Category</option>
            <option>Electrician</option>
            <option>Plumber</option>
            <option>Painter</option>
            <option>Cleaning</option>
            <option>Carpenter</option>
            <option>AC Repair</option>
            <option>Computer Repair</option>
          </select>

          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            required
            value={form.experience}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Starting Price"
            required
            value={form.price}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Submitting..."
                : "Register as Expert"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ExpertRegister;