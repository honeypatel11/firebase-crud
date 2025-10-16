import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
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
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("An account with this email already exists.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">  📝 Create Your Account </h2>
        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
        )}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-white/90 font-semibold"> Email Address </label>
          <input type="text" id="email" value={input.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-white/90 font-semibold"> Password</label>
          <input type="password" id="password" value={input.password} onChange={handleChange} placeholder="Enter your password" className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"/>
        </div>
        <button onClick={signUp} className="w-full py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold tracking-wide shadow-lg hover:scale-105 hover:from-green-500 hover:to-blue-600 transition-transform duration-300"> Sign Up</button>
        <p className="text-center text-white/80 mt-6 text-sm"> Already have an account?{" "}
          <Link to="/" className="text-yellow-300 font-semibold hover:underline hover:text-yellow-200 transition">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
