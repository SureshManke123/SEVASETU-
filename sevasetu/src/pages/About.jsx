function About() {
  const team = [
    {
      name: "Suresh Manke",
      role: "Founder & Full Stack Developer",
    },
    {
      name: "Rahul Patil",
      role: "Backend Developer",
    },
    {
      name: "Amit Sharma",
      role: "UI/UX Designer",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          About Seva Setu
        </h1>

        <p className="text-xl max-w-3xl mx-auto px-4">
          Seva Setu is a platform that connects customers with
          trusted service providers. Our goal is to make
          professional services easily accessible to everyone
          while ensuring quality, trust, and convenience.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-700 text-lg">
            Our mission is to provide a reliable and user-friendly
            platform where people can easily find trusted
            professionals for their daily service needs. We aim
            to simplify service booking while creating
            opportunities for skilled experts.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Our Vision
          </h2>

          <p className="text-gray-700 text-lg">
            Our vision is to become India's most trusted
            service marketplace by connecting customers with
            verified professionals and delivering excellent
            customer experiences.
          </p>
        </div>

      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Why Choose Seva Setu?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="text-center p-4">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="font-bold text-xl">
                Trusted Experts
              </h3>
            </div>

            <div className="text-center p-4">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="font-bold text-xl">
                Fast Service
              </h3>
            </div>

            <div className="text-center p-4">
              <div className="text-5xl mb-3">💰</div>
              <h3 className="font-bold text-xl">
                Affordable Pricing
              </h3>
            </div>

            <div className="text-center p-4">
              <div className="text-5xl mb-3">📞</div>
              <h3 className="font-bold text-xl">
                24/7 Support
              </h3>
            </div>

          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
          Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center"
            >
              <div className="w-24 h-24 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                {member.name.charAt(0)}
              </div>

              <h3 className="text-2xl font-bold">
                {member.name}
              </h3>

              <p className="text-gray-600 mt-2">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-900 text-white py-10 text-center">
        <h2 className="text-3xl font-bold mb-3">
          Seva Setu
        </h2>

        <p className="text-lg">
          Connecting People with Trusted Services.
        </p>

        <p className="mt-4 text-gray-400">
          © 2026 Seva Setu. All Rights Reserved.
        </p>
      </div>

    </div>
  );
}

export default About;