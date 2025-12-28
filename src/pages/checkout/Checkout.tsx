import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const cartItems = [
    { id: 1, name: "Gym T-Shirt", price: 2499, qty: 1 },
    { id: 2, name: "Workout Shorts", price: 1999, qty: 2 },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shipping = 300;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Order placed!");
    // Here you would send the order to backend
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      {/* Billing Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900">
          Billing Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
          />
          <input
            name="address"
            type="text"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
          />
          <div className="flex gap-4">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
            />
            <input
              name="zip"
              type="text"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
            />
          </div>
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900">
          Order Summary
        </h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-800">
              <div>
                {item.name} × {item.qty}
              </div>
              <div>Rs. {item.price * item.qty}</div>
            </div>
          ))}
          <hr className="border-gray-200" />
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Rs. {shipping}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
