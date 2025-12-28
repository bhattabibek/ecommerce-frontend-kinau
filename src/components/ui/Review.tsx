import { useState } from "react";
import { Star } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={22}
          className={`transition-colors ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductReviewPage() {
  const [reviews, setReviews] = useState([
    { name: "Alice", rating: 5, comment: "Amazing product!" },
    { name: "Bob", rating: 4, comment: "Very good but a bit expensive." },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.comment || formData.rating === 0) return;
    setReviews([...reviews, formData]);
    setFormData({ name: "", rating: 0, comment: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8 font-sans">
      {/* Product Info */}
      <div className="bg-white shadow-lg rounded-3xl p-6">
        <img
          src="https://via.placeholder.com/300x200"
          alt="Product"
          className="rounded-xl w-full mb-4 object-cover"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Fitness Tracker Watch
        </h2>
        <div className="flex items-center gap-2">
          <StarRating rating={4} />
          <span className="text-gray-500 text-sm">4.0 (2 reviews)</span>
        </div>
        <p className="text-gray-700 mt-3 leading-relaxed">
          This watch helps you track your workouts, sleep, and heart rate with
          style and accuracy. Perfect for daily fitness enthusiasts.
        </p>
      </div>

      {/* Customer Reviews */}
      <div className="bg-white shadow-lg rounded-3xl p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Customer Reviews
        </h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{r.name}</span>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write a Review */}
      <div className="bg-white shadow-lg rounded-3xl p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Write a Review
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            placeholder="Your Review"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                onClick={() => setFormData({ ...formData, rating: num })}
                className={`cursor-pointer transition-colors ${
                  formData.rating >= num
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                size={24}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
