import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast'; 

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <form
      className="space-y-6 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
         
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
          ? 'bg-pink-400 cursor-not-allowed'
          : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
          }`}
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}

export default LoginForm;
