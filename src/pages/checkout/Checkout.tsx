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
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="address"
            type="text"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <div className="flex gap-4">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              name="zip"
              type="text"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                {item.name} × {item.qty}
              </div>
              <div>Rs. {item.price * item.qty}</div>
            </div>
          ))}
          <hr />
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Rs. {shipping}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
