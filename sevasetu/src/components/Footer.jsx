import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}

        <div>

          <h2 className="text-3xl font-bold text-blue-400">
            🛠 Seva Setu
          </h2>

          <p className="mt-5 text-gray-400 leading-7">
            Your trusted platform for booking verified home service experts.
            Fast, secure and affordable services at your doorstep.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>

          </ul>

        </div>

        {/* Popular Services */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Popular Services
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>⚡ Electrician</li>
            <li>🚰 Plumber</li>
            <li>🎨 Painter</li>
            <li>🧹 Cleaning</li>
            <li>❄ AC Repair</li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>📍 Buldhana, Maharashtra</li>

            <li>📧 support@sevasetu.com</li>

            <li>📞 +91 9876543210</li>

          </ul>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-700 py-6">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">
            © 2026 Seva Setu. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-400 hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;