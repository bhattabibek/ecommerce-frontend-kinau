import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0b0b0b] via-black to-black text-gray-400">
      
      {/* Ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-6">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <img
              src="/assets/kinaulogo.png"
              alt="Kinau"
              className="h-16 w-16 object-contain drop-shadow-xl"
            />
            <p className="max-w-sm text-sm leading-relaxed text-gray-300">
              Kinau is a premium shopping destination for performance wear,
              footwear, and accessories — crafted for everyday athletes and
              modern lifestyles.
            </p>
          </div>

          {/* Reusable section */}
          {[
            { title: "PRODUCTS", items: ["Footwear", "Clothing", "Accessories", "New Arrivals", "Trending"] },
            { title: "SPORTS", items: ["Cricket", "Football", "Marathon", "Rugby", "Golf"] },
            { title: "COLLECTIONS", items: ["Ultraboost", "Super Nova", "Falcon", "Reebok"] },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-xs font-semibold tracking-[0.25em] text-white">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="group relative cursor-pointer transition-all duration-300 hover:text-white"
                  >
                    <span className="absolute -left-4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Support & Social */}
          <div className="space-y-12">
            <div>
              <h3 className="mb-6 text-xs font-semibold tracking-[0.25em] text-white">
                SUPPORT
              </h3>
              <ul className="space-y-4 text-sm">
                {["About", "Contact", "Order Tracking", "Club"].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer transition-colors duration-300 hover:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-semibold tracking-[0.25em] text-white">
                CONNECT
              </h3>
              <div className="flex gap-6 text-lg">
                {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, i) => (
                  <Icon
                    key={i}
                    className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm py-6 text-center text-xs tracking-wider text-gray-500">
        © 2025 Kinau. Crafted with precision. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
