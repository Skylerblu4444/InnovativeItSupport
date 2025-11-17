"use client";

export default function EmergencyButton() {
  const handleClick = async () => {
    await fetch("/api/emergency/trigger", { method: "POST" });

    alert("Emergency ticket created. You will be contacted immediately.");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full px-8 py-4 shadow-2xl hover:bg-red-700 text-xl font-bold"
    >
      Emergency IT Support
    </button>
  );
}
