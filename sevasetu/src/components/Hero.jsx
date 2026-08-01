import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";


function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-screen flex items-center">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left */}

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold leading-tight text-white">

            Find Trusted

            <span className="text-cyan-400">
              {" "}Local Experts
            </span>

          </h1>

          <p className="mt-6 text-lg text-gray-300">

            Book electricians, plumbers, tutors,
            mechanics, designers and hundreds of
            verified professionals near you.

          </p>

          <div className="mt-10 flex gap-4">

            <Link
              to="/services"
              className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold"
            >
              Explore Services
            </Link>

            <Link
              to="/expert-register"
              className="px-8 py-4 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition"
            >
              Become Expert
            </Link>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Search Any Service
            </h2>

            <div className="flex">

              <input
                type="text"
                placeholder="Search plumber, tutor..."
                className="flex-1 border rounded-l-xl p-4 outline-none"
              />

              <button className="bg-cyan-500 px-6 rounded-r-xl text-white">

                <FiSearch size={24} />

              </button>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;