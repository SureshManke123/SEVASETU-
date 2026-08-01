import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <>
    
      {/* Hero Section */}
<section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}

          <div>

            <motion.h1
  initial={{opacity:0, y:50}}
  animate={{opacity:1, y:0}}
  transition={{duration:0.8}}
  className="text-5xl font-bold leading-tight"
>

Find Trusted
<br />
Home Service Experts

</motion.h1>

            <p className="mt-6 text-lg text-gray-200">

              Book verified electricians, plumbers,
              painters, cleaners, AC technicians and
              many more professionals near you.

            </p>

            <div className="mt-8 flex gap-4">

              <Link
                to="/services"
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Explore Services
              </Link>

              <Link
                to="/expert-register"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700"
              >
                Become Expert
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700"
              alt="Home Services"
              className="rounded-2xl shadow-2xl"
            />

          </div>

        </div>

      </section>
      {/* Search Section */}

<section className="bg-white py-10 shadow-md">

  <div className="max-w-6xl mx-auto px-6">

    <div className="bg-white rounded-xl shadow-xl p-6 grid md:grid-cols-4 gap-4">

      <input
        type="text"
        placeholder="Search Services..."
        className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Location"
        className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select className="border rounded-lg px-4 py-3">

        <option>All Categories</option>
        <option>Electrician</option>
        <option>Plumber</option>
        <option>Painter</option>
        <option>Cleaning</option>
        <option>AC Repair</option>

      </select>

      <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-800">
        Search
      </button>

    </div>

  </div>

</section>

{/* Categories */}

<section className="py-20 bg-gray-100">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-12">

      Popular Categories

    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

      {[
        "⚡ Electrician",
        "🚰 Plumber",
        "🎨 Painter",
        "🧹 Cleaning",
        "❄ AC Repair",
        "💻 Computer",
      ].map((item) => (

        <div
          key={item}
          className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition duration-300 cursor-pointer"
        >

          <h3 className="font-semibold text-lg">

            {item}

          </h3>

        </div>

      ))}

    </div>

  </div>

</section>
{/* Featured Services */}

<section className="py-20 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex justify-between items-center mb-10">

      <h2 className="text-4xl font-bold">
        Featured Services
      </h2>

      <button className="text-blue-700 font-semibold hover:underline">
        View All →
      </button>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {[
        {
          title: "Electrician",
          price: "₹499",
          location: "Buldhana",
          image:
            "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600",
        },
        {
          title: "Plumber",
          price: "₹399",
          location: "Mehkar",
          image:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
        },
        {
          title: "AC Repair",
          price: "₹799",
          location: "Akola",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
        },
      ].map((service, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
        >

          <img
            src={service.image}
            alt={service.title}
            className="w-full h-56 object-cover"
          />

          <div className="p-6">

            <div className="flex justify-between items-center">

              <h3 className="text-2xl font-bold">
                {service.title}
              </h3>

              <span className="text-yellow-500">
                ⭐ 4.9
              </span>

            </div>

            <p className="text-gray-500 mt-3">
              📍 {service.location}
            </p>

            <div className="flex justify-between items-center mt-6">

              <span className="text-blue-700 font-bold text-xl">
                {service.price}
              </span>

              <button className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800">
                Book Now
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>

{/* Why Choose Us */}

<section className="py-20 bg-blue-50">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      Why Choose Seva Setu?
    </h2>

    <p className="text-center text-gray-600 mb-14">
      Trusted professionals, transparent pricing and hassle-free booking.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">✅</div>

        <h3 className="text-2xl font-semibold mb-3">
          Verified Experts
        </h3>

        <p className="text-gray-600">
          Every professional is verified before joining the platform.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">⚡</div>

        <h3 className="text-2xl font-semibold mb-3">
          Fast Booking
        </h3>

        <p className="text-gray-600">
          Book trusted home services in just a few clicks.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">💰</div>

        <h3 className="text-2xl font-semibold mb-3">
          Affordable Pricing
        </h3>

        <p className="text-gray-600">
          Transparent pricing with no hidden charges.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">🛡️</div>

        <h3 className="text-2xl font-semibold mb-3">
          Secure Platform
        </h3>

        <p className="text-gray-600">
          Safe bookings and secure user information.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">⭐</div>

        <h3 className="text-2xl font-semibold mb-3">
          Top Rated Services
        </h3>

        <p className="text-gray-600">
          Highly rated professionals with excellent customer reviews.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <div className="text-5xl mb-4">📞</div>

        <h3 className="text-2xl font-semibold mb-3">
          24×7 Support
        </h3>

        <p className="text-gray-600">
          Our support team is always ready to help you.
        </p>
      </div>

    </div>

  </div>

</section>
{/* ================= Premium Statistics Section ================= */}
<section className="relative py-24 bg-slate-950 overflow-hidden">
  {/* Background Glow */}
  <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white">
        Trusted Across Maharashtra
      </h2>
      <p className="mt-4 text-slate-300 text-lg">
        Our growing community of customers and verified experts.
      </p>
    </motion.div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { number: '10K+', label: 'Happy Customers', icon: '👥' },
        { number: '500+', label: 'Verified Experts', icon: '🛠' },
        { number: '4.9', label: 'Average Rating', icon: '⭐' },
        { number: '25K+', label: 'Bookings Completed', icon: '📅' },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300 shadow-xl"
        >
          <div className="text-5xl mb-4">{item.icon}</div>
          <h3 className="text-4xl font-extrabold text-white">
            {item.number}
          </h3>
          <p className="mt-3 text-slate-300">{item.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* ================= Testimonials ================= */}

<section className="py-20 bg-gray-100">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      What Our Customers Say
    </h2>

    <p className="text-center text-gray-600 mb-14">
      Trusted by thousands of happy customers across Maharashtra.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Testimonial 1 */}

      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">

        <div className="flex items-center gap-4 mb-5">

          <img
            src="https://i.pravatar.cc/100?img=1"
            alt="Customer"
            className="w-16 h-16 rounded-full"
          />

          <div>

            <h3 className="font-bold text-lg">
              Rahul Patil
            </h3>

            <p className="text-gray-500 text-sm">
              Buldhana
            </p>

          </div>

        </div>

        <p className="text-gray-600">
          "Excellent service! The electrician arrived on time and fixed everything perfectly."
        </p>

        <div className="mt-5 text-yellow-500 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

      </div>

      {/* Testimonial 2 */}

      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">

        <div className="flex items-center gap-4 mb-5">

          <img
            src="https://i.pravatar.cc/100?img=5"
            alt="Customer"
            className="w-16 h-16 rounded-full"
          />

          <div>

            <h3 className="font-bold text-lg">
              Sneha Deshmukh
            </h3>

            <p className="text-gray-500 text-sm">
              Akola
            </p>

          </div>

        </div>

        <p className="text-gray-600">
          "Very professional and affordable. Booking was simple and quick."
        </p>

        <div className="mt-5 text-yellow-500 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

      </div>

      {/* Testimonial 3 */}

      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">

        <div className="flex items-center gap-4 mb-5">

          <img
            src="https://i.pravatar.cc/100?img=8"
            alt="Customer"
            className="w-16 h-16 rounded-full"
          />

          <div>

            <h3 className="font-bold text-lg">
              Amit Shinde
            </h3>

            <p className="text-gray-500 text-sm">
              Washim
            </p>

          </div>

        </div>

        <p className="text-gray-600">
          "Highly recommended! Great platform for finding trusted home service experts."
        </p>

        <div className="mt-5 text-yellow-500 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

      </div>

    </div>

  </div>

</section>
{/* ================= Call To Action ================= */}

<section className="py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white">

  <div className="max-w-5xl mx-auto text-center px-6">

    <h2 className="text-5xl font-bold mb-6">
      Ready to Book a Trusted Expert?
    </h2>

    <p className="text-xl text-gray-200 mb-10">
      Connect with verified professionals for home services.
      Fast booking, transparent pricing and quality work —
      all in one place.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-6">

      <a
        href="/services"
        className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition duration-300"
      >
        Book a Service
      </a>

      <a
        href="/expert-register"
        className="border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-800 transition duration-300"
      >
        Become an Expert
      </a>

    </div>

  </div>

</section>

    </>
  );
}

export default Home;


