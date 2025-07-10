import React, { useState, useContext } from "react";
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const { signup, login } = useContext(AuthContext);

  const handleSignup = (e) => {
    e.preventDefault();
    signup(signupData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginData);
  };

  return (
    <div className={`font-montserrat flex items-center justify-center h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]`}>
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* SIGN UP FORM */}
        <div className={`form-container absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ease-in-out ${isActive ? "translate-x-full opacity-100 z-[5] animate-[move_0.6s_forwards]" : "opacity-0 z-[1]"}`}>
          <form onSubmit={handleSignup} className="bg-white h-full px-10 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <div className="flex gap-2 my-5">
              {[FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-sm">
                  <Icon />
                </a>
              ))}
            </div>
            <span className="text-xs">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="w-full my-2 px-4 py-2 text-sm rounded-md bg-[#eee] outline-none"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full my-2 px-4 py-2 text-sm rounded-md bg-[#eee] outline-none"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full my-2 px-4 py-2 text-sm rounded-md bg-[#eee] outline-none"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            <button type="submit" className="mt-3 bg-[#512da8] text-white text-xs px-12 py-2 rounded-md uppercase font-semibold tracking-wider">
              Sign Up
            </button>
          </form>
        </div>

        {/* SIGN IN FORM */}
        <div className={`absolute top-0 left-0 w-1/2 h-full z-[2] transition-all duration-500 ease-in-out ${isActive ? "translate-x-full" : ""}`}>
          <form onSubmit={handleLogin} className="bg-white h-full px-10 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <div className="flex gap-2 my-5">
              {[FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-sm">
                  <Icon />
                </a>
              ))}
            </div>
            <span className="text-xs">or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full my-2 px-4 py-2 text-sm rounded-md bg-[#eee] outline-none"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full my-2 px-4 py-2 text-sm rounded-md bg-[#eee] outline-none"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <a href="#" className="text-xs mt-3 text-gray-700">
              Forget Your Password?
            </a>
            <button type="submit" className="mt-3 bg-[#512da8] text-white text-xs px-12 py-2 rounded-md uppercase font-semibold tracking-wider">
              Sign In
            </button>
          </form>
        </div>

        {/* TOGGLE PANEL */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 ease-in-out rounded-[150px_0_0_100px] z-[1000] ${isActive ? "transform -translate-x-full rounded-[0_150px_100px_0]" : ""}`}>
          <div className={`bg-gradient-to-r from-[#5c6bc0] to-[#512da8] text-white absolute left-[-100%] w-[200%] h-full transition-all duration-500 ease-in-out ${isActive ? "translate-x-1/2" : ""}`}>
            <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-center px-8 transition-all duration-500 ease-in-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-sm my-4">Enter your personal details to use all of site features</p>
              <button
                className="border border-white px-10 py-2 text-xs rounded-md uppercase font-semibold"
                onClick={() => setIsActive(false)}>
                Sign In
              </button>
            </div>

            <div className={`absolute right-0 w-1/2 h-full flex flex-col justify-center items-center text-center px-8 transition-all duration-500 ease-in-out ${isActive ? "translate-x-full" : "translate-x-0"}`}>
              <h1 className="text-2xl font-bold">Hello, Friend!</h1>
              <p className="text-sm my-4">Register with your personal details to use all of site features</p>
              <button
                className="border border-white px-10 py-2 text-xs rounded-md uppercase font-semibold"
                onClick={() => setIsActive(true)}>
                Sign Up!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
