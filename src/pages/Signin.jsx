import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../config/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", result.user);
      navigate("/books");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google Sign-In failed. Try again!");
    }
  };

  const handleEmailPasswordSignIn = async () => {
    const { email, password } = input;
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/books");
    } catch (err) {
      console.error("Email/password sign-in error:", err);
      setError("Invalid email or password.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 px-4">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
          🔐 Welcome Back
        </h2>

        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-1 text-white/90 font-semibold"
          >
            Email Address
          </label>
          <input
            type="text"
            id="email"
            value={input.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 text-white/90 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={input.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
          />
        </div>

        <button
          onClick={handleEmailPasswordSignIn}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold tracking-wide shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-blue-600 transition-transform duration-300"
        >
          Sign In
        </button>

        <div className="my-4 flex items-center">
          <div className="flex-grow h-px bg-white/30"></div>
          <span className="px-3 text-white/70 text-sm">or</span>
          <div className="flex-grow h-px bg-white/30"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-white/80 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-yellow-300 font-semibold hover:underline hover:text-yellow-200 transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
