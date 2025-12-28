import React, { useEffect, useState, useRef } from "react";

// Slide data
const slides = [
  {
    image: "/assets/shopping.jpg",
    title: (
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
        Welcome to KINAU SHOP
      </h1>
    ),
    subtitle: "Where quality, design and performance meet.",
  },
  {
    image: "/assets/background.jpg",
    title: (
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
        Premium Quality Products
      </h1>
    ),
    subtitle: "Crafted collections curated for modern lifestyles.",
  },
  {
    image: "/assets/imageone.jpg",
    title: (
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
        Fast & Reliable Delivery
      </h1>
    ),
    subtitle: "Seamless shopping delivered right to your doorstep.",
  },
];

// Main Slider
export default function SimpleSlider() {
  const [current, setCurrent] = useState(0);
  const slideInterval = useRef<any>(null);

  const goToSlide = (index: number) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    setCurrent(index);
  };

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval.current);
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/1600x900?text=Slide";
            }}
          />

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-2xl space-y-6">
                {slide.title}
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  {slide.subtitle}
                </p>

                <button className="mt-6 inline-flex items-center gap-2 rounded-full
                                   bg-white px-8 py-3 text-sm font-medium text-black
                                   hover:bg-gray-200 transition">
                  Shop Collection
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide(current - 1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20
                   rounded-full bg-white/10 backdrop-blur-md
                   p-4 text-white hover:bg-white/20 transition"
      >
        ←
      </button>

      <button
        onClick={() => goToSlide(current + 1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20
                   rounded-full bg-white/10 backdrop-blur-md
                   p-4 text-white hover:bg-white/20 transition"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              idx === current
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
