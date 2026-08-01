import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        password: form.password,
      });

      alert(res.data.message);

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
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center px-5">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-700">
            🛠 Seva Setu
          </h1>

          <p className="text-gray-500 mt-2">
            Create Your Account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 pr-16"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 pr-16"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-blue-600"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p>

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-700 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;