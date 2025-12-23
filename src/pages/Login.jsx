import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 dark:text-white p-6 shadow">
        <h1 className="mb-1 text-center text-2xl font-semibold">InternTrack</h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Sign in to your account
        </p>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
