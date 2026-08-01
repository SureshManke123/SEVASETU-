import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExpertRegister from "./pages/ExpertRegister";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import AdminPanel from "./pages/AdminPanel";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import SearchServices from "./pages/SearchServices";
import Notifications from "./pages/Notifications";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expert-register" element={<ExpertRegister />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/service/:serviceId"
          element={<ServiceDetails />}
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/booking-history"
          element={<BookingHistory />}
        />
        <Route
          path="/search-services"
          element={<SearchServices />}
        />
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* User Dashboard */}

        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* Expert Dashboard */}

        <Route
          path="/expert-dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["expert"]}>
              <ExpertDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </RoleProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
