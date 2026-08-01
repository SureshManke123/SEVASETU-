import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiGrid,
  FiInfo,
  FiMail,
  FiUserPlus,
  FiLogIn,
} from "react-icons/fi";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-all duration-300 ${
      isActive
        ? "text-cyan-400 font-semibold"
        : "text-gray-200 hover:text-cyan-400"
    }`;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-700 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            SevaSetu
          </Link>
        </motion.div>

        {/* Menu */}

        <div className="hidden lg:flex items-center gap-8 font-medium">

          <NavLink to="/" className={navLinkClass}>
            <FiHome />
            Home
          </NavLink>

          <NavLink to="/services" className={navLinkClass}>
            <FiGrid />
            Services
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            <FiInfo />
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            <FiMail />
            Contact
          </NavLink>

          <NavLink to="/expert-register" className={navLinkClass}>
            <FiUserPlus />
            Become Expert
          </NavLink>

        </div>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all"
            >
              <FiLogIn />
              Login
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/register"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg"
            >
              Register
            </Link>
          </motion.div>

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;