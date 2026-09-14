"use client";

export default function TestTailwind() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-10">
      <div>
        <div className="text-xl font-medium text-primary">Tailwind Test</div>
        <p className="text-gray-500">Tailwind is working if this card looks styled!</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-accent text-primary font-semibold rounded-lg shadow-md hover:bg-accent-light">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
} 