import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      navigate('/home');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleGoogleLogin = () => alert('Should add Google OAuth');
  const handleFacebookLogin = () => alert('Should add Facebook OAuth');

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/src/assets/VIRTUALBG.jpg')" }}
    >
      <div className="w-full max-w-md bg-[#C0BBB5]/70 p-8 rounded-3xl shadow-2xl backdrop-blur-md transform hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#696137]">
          {isLogin ? 'Welcome Back!' : 'Create Your Account'}
        </h2>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleFacebookLogin}
            className="flex items-center gap-2 px-5 py-3 bg-[#948268] text-white rounded-full shadow-lg hover:bg-[#696137] transition-all"
          >
            <AiFillFacebook className="text-2xl" /> Facebook
          </button>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 px-5 py-3 bg-[#525656] text-white rounded-full shadow-lg hover:bg-[#696137] transition-all"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-[#948268] rounded-full focus:outline-none focus:ring-4 focus:ring-[#696137] transition-all"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border border-[#948268] rounded-full focus:outline-none focus:ring-4 focus:ring-[#696137] transition-all"
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-[#696137] text-white font-medium rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-[#525656]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-[#696137] cursor-pointer ml-1 hover:underline"
            onClick={toggleForm}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
