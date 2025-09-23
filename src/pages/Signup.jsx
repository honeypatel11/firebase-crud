import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const signUp = async () => {
    const { email, password } = input;

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", res.user);
      navigate("/books");
    } catch (err) {
      console.error("Signup error:", err);
      setError("An account with this email already exists.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">📝 Sign Up</h2>

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
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={signUp}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
