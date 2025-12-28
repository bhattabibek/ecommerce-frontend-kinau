// src/pages/Login.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../redux/features/thunks";
import { useRedirectIfLoggedIn } from "@/hooks/useCheckStates";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<any>();
  useRedirectIfLoggedIn("/");
  const navigate = useNavigate();

  const [state, setState] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "login") {
      try {
        const resultAction = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(resultAction)) {
          navigate(resultAction.payload.role === "admin" ? "/admin" : "/", { replace: true });
        } else {
          console.error("Login failed:", resultAction.payload);
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    } else {
      dispatch(registerUser({ firstName, lastName, email, password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Card Container */}
      <div className="flex w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Image Box */}
        <div className="w-1/2">
          <img
            src="/assets/shop.jpg" // Replace with your image path
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Login Form */}
        <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-teal-900">
                {state === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {state === "login"
                  ? "Sign in to continue your journey"
                  : "Register to start shopping with us"}
              </p>
            </div>

            {/* Register Fields */}
            {state === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>
            )}

            {/* Email & Password */}
            <div className="space-y-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-teal-700 to-teal-900 text-white font-semibold shadow-lg hover:from-teal-600 hover:to-teal-800 transition-all"
            >
              {state === "login" ? "Sign In" : "Create Account"}
            </button>

            {/* Toggle */}
            <p className="text-center text-gray-700 text-sm">
              {state === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setState("register")}
                    className="cursor-pointer font-medium text-teal-900 hover:underline"
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("login")}
                    className="cursor-pointer font-medium text-teal-900 hover:underline"
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
