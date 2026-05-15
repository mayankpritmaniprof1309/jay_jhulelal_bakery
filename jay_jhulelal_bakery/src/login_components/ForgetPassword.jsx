import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "./loginIcons.jsx";

export default function ForgotPasswordPage() {
  const [step, setStep]               = useState("email"); // "email" | "reset" | "done"
  const [email, setEmail]             = useState("");
  const [token, setToken]             = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPw, setShowNewPw]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/auth/user/requestPasswordReset", { email });
      setStep("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/auth/user/resetPassword", {
        token,
        newPassword,
      });
      setStep("done");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(245,233,220)] p-6 relative overflow-hidden">

      {/* Dot grid */}
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

        {/* ── Step: email ── */}
        {step === "email" && (
          <form onSubmit={handleRequestReset}>
            <div className="inline-flex items-center gap-1.5 bg-[rgba(180,130,70,0.15)]
                            border border-[rgba(160,110,60,0.3)] rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a0642a] animate-pulse" />
              <span className="text-[11px] font-medium text-[#7a4f1e] uppercase tracking-widest">
                Reset password
              </span>
            </div>

            <h1 className="font-serif text-[28px] font-semibold text-[#3b2409] leading-tight mb-1">
              Forgot your password?
            </h1>
            <p className="text-sm text-[#7a5c38] mb-7">
              Enter your email and we'll send you a reset link.
            </p>

            <label className="block text-[12.5px] font-medium text-[#5c3d1e] mb-1.5 tracking-wide">
              Email address
            </label>
            <div className="relative mb-5">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a07850] w-4 h-4 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm text-[#3b2409] placeholder-[#b89870]
                           bg-[rgba(245,233,220,0.7)] border-[1.5px] border-[rgba(160,110,60,0.35)]
                           rounded-xl outline-none transition-all duration-200
                           hover:border-[#c09060]
                           focus:border-[#a0642a] focus:bg-[rgba(245,233,220,0.95)]
                           focus:ring-[3.5px] focus:ring-[rgba(160,100,42,0.15)]"
              />
            </div>

            {error && <p className="text-red-700 text-[12.5px] mb-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[11.5px] rounded-xl text-[#fdf5ec] text-[14.5px] font-semibold
                         tracking-wide transition-all duration-200 disabled:opacity-60
                         bg-linear-to-br from-[#a0642a] to-[#7a3f10]
                         shadow-[0_4px_16px_rgba(120,70,20,0.35)]
                         hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgba(120,70,20,0.4)]
                         active:translate-y-0 active:scale-[0.98]"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>

            <p className="text-center mt-5 text-[13px] text-[#8a6040]">
              Remember it?{" "}
              <Link to="/user/login" className="text-[#7a4010] font-medium hover:underline">
                Back to sign in
              </Link>
            </p>
          </form>
        )}

        {/* ── Step: reset ── */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword}>
            <div className="inline-flex items-center gap-1.5 bg-[rgba(180,130,70,0.15)]
                            border border-[rgba(160,110,60,0.3)] rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a0642a] animate-pulse" />
              <span className="text-[11px] font-medium text-[#7a4f1e] uppercase tracking-widest">
                New password
              </span>
            </div>

            <h1 className="font-serif text-[28px] font-semibold text-[#3b2409] leading-tight mb-1">
              Check your email
            </h1>
            <p className="text-sm text-[#7a5c38] mb-7">
              Paste the token from the email sent to{" "}
              <span className="font-medium text-[#5c3210]">{email}</span>, then choose a new password.
            </p>

            {/* Token */}
            <label className="block text-[12.5px] font-medium text-[#5c3d1e] mb-1.5 tracking-wide">
              Reset token
            </label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste token here"
              className="w-full px-3 py-2.5 text-sm text-[#3b2409] placeholder-[#b89870]
                         bg-[rgba(245,233,220,0.7)] border-[1.5px] border-[rgba(160,110,60,0.35)]
                         rounded-xl outline-none transition-all duration-200 mb-4
                         hover:border-[#c09060]
                         focus:border-[#a0642a] focus:bg-[rgba(245,233,220,0.95)]
                         focus:ring-[3.5px] focus:ring-[rgba(160,100,42,0.15)]"
            />

            {/* New password */}
            <label className="block text-[12.5px] font-medium text-[#5c3d1e] mb-1.5 tracking-wide">
              New password
            </label>
            <div className="relative mb-4">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a07850] w-4 h-4 pointer-events-none" />
              <input
                type={showNewPw ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm text-[#3b2409] placeholder-[#b89870]
                           bg-[rgba(245,233,220,0.7)] border-[1.5px] border-[rgba(160,110,60,0.35)]
                           rounded-xl outline-none transition-all duration-200
                           hover:border-[#c09060]
                           focus:border-[#a0642a] focus:bg-[rgba(245,233,220,0.95)]
                           focus:ring-[3.5px] focus:ring-[rgba(160,100,42,0.15)]"
              />
              <button
                type="button"
                onClick={() => setShowNewPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a07850]
                           hover:text-[#7a4f1e] transition-colors duration-150 p-0.5"
              >
                {showNewPw ? <EyeOffIcon className="w-3.5 h-3.5" /> : <EyeIcon className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Confirm password */}
            <label className="block text-[12.5px] font-medium text-[#5c3d1e] mb-1.5 tracking-wide">
              Confirm new password
            </label>
            <div className="relative mb-5">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a07850] w-4 h-4 pointer-events-none" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm text-[#3b2409] placeholder-[#b89870]
                           bg-[rgba(245,233,220,0.7)] border-[1.5px] border-[rgba(160,110,60,0.35)]
                           rounded-xl outline-none transition-all duration-200
                           hover:border-[#c09060]
                           focus:border-[#a0642a] focus:bg-[rgba(245,233,220,0.95)]
                           focus:ring-[3.5px] focus:ring-[rgba(160,100,42,0.15)]"
              />
            </div>

            {error && <p className="text-red-700 text-[12.5px] mb-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[11.5px] rounded-xl text-[#fdf5ec] text-[14.5px] font-semibold
                         tracking-wide transition-all duration-200 disabled:opacity-60
                         bg-linear-to-br from-[#a0642a] to-[#7a3f10]
                         shadow-[0_4px_16px_rgba(120,70,20,0.35)]
                         hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgba(120,70,20,0.4)]
                         active:translate-y-0 active:scale-[0.98]"
            >
              {loading ? "Updating…" : "Reset password"}
            </button>

            <button
              type="button"
              onClick={() => { setStep("email"); setError(""); }}
              className="w-full mt-2 py-2 text-[13px] text-[#8a6040] hover:text-[#5c3210]
                         hover:underline transition-colors duration-150"
            >
              ← Use a different email
            </button>
          </form>
        )}

        {/* ── Step: done ── */}
        {step === "done" && (
          <div className="text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center
                            bg-[rgba(180,130,70,0.15)] border border-[rgba(160,110,60,0.3)]">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#a0642a]" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-serif text-[28px] font-semibold text-[#3b2409] mb-2">
              Password updated!
            </h1>
            <p className="text-sm text-[#7a5c38] mb-7">
              You can now sign in with your new password.
            </p>
            <Link
              to="/user/login"
              className="block w-full py-[11.5px] rounded-xl text-[#fdf5ec] text-[14.5px] font-semibold
                         text-center tracking-wide transition-all duration-200
                         bg-linear-to-br from-[#a0642a] to-[#7a3f10]
                         shadow-[0_4px_16px_rgba(120,70,20,0.35)]
                         hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgba(120,70,20,0.4)]
                         active:translate-y-0 active:scale-[0.98]"
            >
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}