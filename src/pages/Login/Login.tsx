// src/pages/Login.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../redux/features/thunks";
import { useRedirectIfLoggedIn } from "@/hooks/useCheckStates";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<any>();
  useRedirectIfLoggedIn("/")
  const navigate = useNavigate();
  const [state, setState] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (state === "login") {
      try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        if(resultAction.payload.role === "admin"){
          return navigate("/admin", {replace: true})
        }else{
          return navigate("/", { replace: true });
        }
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
   <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
  >
    {state === "register" && (
      <>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </>
    )}
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="w-full p-2 border border-gray-300 rounded"
    />
    <input
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      type="password"
      className="w-full p-2 border border-gray-300 rounded"
    />
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
    >
      {state === "login" ? "Login" : "Register"}
    </button>

    <p className="text-center text-sm mt-2">
      {state === "login" ? (
        <>
          Don't have an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </>
      )}
    </p>
  </form>
</div>

  );
};

export default Login;
