import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../config/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user:", user);
      navigate("/books");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message);
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
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Sign In</h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={input.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={input.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleEmailPasswordSignIn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mb-4 transition duration-200"
        >
          Sign In with Email
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-200"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
