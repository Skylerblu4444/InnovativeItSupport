export default function ServiceCard({ service }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border">
      <h3 className="text-2xl font-bold">{service.name}</h3>
      <p className="text-gray-600 mt-3">{service.description}</p>

      <div className="mt-6">
        <p className="text-blue-600 font-extrabold text-xl">
          ${service.price}
        </p>
        <p className="text-sm text-gray-500">
          {service.billing_cycle.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
