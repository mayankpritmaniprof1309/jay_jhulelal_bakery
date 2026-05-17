import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { MailIcon, LockIcon, EyeOffIcon, EyeIcon } from "./loginIcons.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setformdata] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformdata((prev) => ({ ...prev, [id]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/user/login`,
        { email: formdata.email, password: formdata.password }
        // ✅ no withCredentials needed — using localStorage now
      );
      login(response.data.user); // ✅ login() handles navigate + refreshCart
    } catch (err) {
      if (err.response?.status === 404) {
        alert('Invalid Email or Password');
      } else {
        console.error('Login error:', err.message);
      }
    }
  };

  return (
    <form onSubmit={handelSubmit} className="min-h-screen flex items-center justify-center bg-[rgb(245,233,220)] p-6 relative overflow-hidden">

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(180,140,100,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,160,100,0.22) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(180,130,80,0.18) 0%, transparent 70%)" }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[rgb(230,211,179)] rounded-2xl px-9 py-10
                      border border-[rgba(160,110,60,0.3)]
                      shadow-[0_20px_50px_rgba(150,110,60,0.18),0_4px_16px_rgba(150,110,60,0.1)]
                      animate-[slideUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[rgba(180,130,70,0.15)]
                        border border-[rgba(160,110,60,0.3)] rounded-full px-3 py-1 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a0642a] animate-pulse" />
          <span className="text-[11px] font-medium text-[#7a4f1e] uppercase tracking-widest">
            Secure login
          </span>
        </div>

        <h1 className="font-serif text-[28px] font-semibold text-[#3b2409] leading-tight mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-[#7a5c38] mb-7">Sign in to continue to your account</p>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-[12.5px] font-medium text-[#5c3d1e] mb-1.5 tracking-wide">
            Email address
          </label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a07850] w-4 h-4 pointer-events-none" />
            <input
              id="email"
              type="email"
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full pl-9 pr-3 py-2.5 text-sm text-[#3b2409] placeholder-[#b89870]
                         bg-[rgba(245,233,220,0.7)] border-[1.5px] border-[rgba(160,110,60,0.35)]
                         rounded-xl outline-none transition-all duration-200
                         hover:border-[#c09060]
                         focus:border-[#a0642a] focus:bg-[rgba(245,233,220,0.95)]
                         focus:ring-[3.5px] focus:ring-[rgba(160,100,42,0.15)]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <label htmlFor="password" className="block text-[12.5px] font-medium text-[#5c3d1e] mb-1.5 tracking-wide">
            Password
          </label>
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a07850] w-4 h-4 pointer-events-none" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full pl-9 pr-10 py-2.5 text-sm text-[#3b2409] placeholder-[#b89870]
                         bg-[rgba(245,233,220,0.7)] border-[1.5px] border-[rgba(160,110,60,0.35)]
                         rounded-xl outline-none transition-all duration-200
                         hover:border-[#c09060]
                         focus:border-[#a0642a] focus:bg-[rgba(245,233,220,0.95)]
                         focus:ring-[3.5px] focus:ring-[rgba(160,100,42,0.15)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a07850]
                         hover:text-[#7a4f1e] transition-colors duration-150 p-0.5"
            >
              {showPassword ? <EyeOffIcon className="w-3.5 h-3.5" /> : <EyeIcon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end -mt-0.5 mb-6">
          <a href="/forgetPassword" className="text-[12.5px] font-medium text-[#8b5020] hover:text-[#5c3210]
                                  hover:underline transition-colors duration-150">
            Forgot password?
          </a>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full
    py-3
    bg-gradient-to-br from-[#a0642a] to-[#7a3f10]
    text-white
    rounded-xl
    cursor-pointer
    flex items-center justify-center gap-2
    text-[15px] font-semibold tracking-wide
    shadow-[0_4px_14px_rgba(120,70,20,0.3)]
    transition-all duration-200
    hover:-translate-y-0.5
    hover:scale-[1.01]
    hover:shadow-[0_8px_22px_rgba(120,70,20,0.38)]
    active:scale-[0.98]"
        >
          Sign in
        </button>

        {/* Sign up link */}
        <p className="text-center mt-5 text-[13px] text-[#8a6040]">
          Don't have an account?{" "}
          <Link to="/user/register" className="text-[#7a4010] font-medium hover:underline">Create one</Link>
        </p>
      </div>
    </form>
  );
}