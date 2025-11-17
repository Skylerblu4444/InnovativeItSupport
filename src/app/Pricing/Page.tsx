export default function PricingPage() {
  const pricing = [
    {
      name: "Startup Shield",
      price: 499,
      features: [
        "Basic IT Support",
        "Basic Cybersecurity Tools",
        "Monthly Vulnerability Scans"
      ]
    },
    {
      name: "Business Pro",
      price: 1499,
      popular: true,
      features: [
        "24/7 Monitoring",
        "Incident Response",
        "Pen Testing Discount",
        "Cloud Management",
        "Priority Support"
      ]
    },
    {
      name: "Enterprise Elite",
      price: "Custom",
      features: [
        "Dedicated Engineer",
        "Enterprise SOC",
        "Zero Trust Architecture",
        "Advanced Pen Testing",
        "AI Security Automation"
      ]
    }
  ];

  return (
    <div className="px-10 py-16">
      <h1 className="text-5xl font-extrabold text-center">
        Transparent Pricing Built For Every Business
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {pricing.map((p) => (
          <div
            key={p.name}
            className={`p-10 rounded-3xl shadow-xl border hover:-translate-y-2 transition-all ${
              p.popular ? "bg-blue-600 text-white scale-105" : "bg-white"
            }`}
          >
            <h2 className="text-3xl font-bold">{p.name}</h2>

            <p className="text-5xl font-extrabold mt-4">
              {p.price === "Custom" ? "Custom" : `$${p.price}`}
            </p>

            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <button className="mt-10 w-full py-4 bg-black text-white rounded-xl">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
