import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "./Icons";

function InputField({ id, label, type = "text", placeholder, icon, showToggle, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[12px] font-medium text-[#5c3d1e] tracking-wide">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#a07850] pointer-events-none">
          {icon}
        </span>
        <input
          id={id}
          type={showToggle ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full pl-8 pr-9 py-[9.5px] text-[13.5px] text-[#3b2409]
                     placeholder-[#b89870] bg-[rgba(245,233,220,0.65)]
                     border-[1.5px] rounded-[10px]
                     outline-none transition-all duration-200
                     hover:border-[#c09060]
                     focus:bg-[rgba(245,233,220,0.95)]
                     focus:ring-[3px]
                     ${error
                       ? 'border-[#c0392b] focus:border-[#c0392b] focus:ring-[rgba(192,57,43,0.14)]'
                       : 'border-[rgba(160,110,60,0.32)] focus:border-[#a0642a] focus:ring-[rgba(160,100,42,0.14)]'
                     }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a07850]
                       hover:text-[#7a4f1e] transition-colors duration-150"
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[11px] text-[#c0392b] font-medium mt-0.5">{error}</p>
      )}
    </div>
  );
}

export function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.terms) {
      newErrors.terms = 'Please accept the Terms of Service';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/user/register`,
        {
          firstName: formData.fname,
          lastName:  formData.lname,
          email:     formData.email,
          password:  formData.password,
        }
      );
      console.log('Registered:', response.data);
      navigate('/user/login');
    } catch (error) {
      if (error.response?.status === 409) {
        alert('User already exists');
      } else {
        alert('Registration failed. Please try again.');
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <InputField id="fname" label="First name" placeholder="Mayank"
          icon={<UserIcon />} value={formData.fname} onChange={handleChange} />
        <InputField id="lname" label="Last name" placeholder="Pritmani"
          icon={<UserIcon />} value={formData.lname} onChange={handleChange} />
      </div>

      {/* Email */}
      <InputField id="email" label="Email address" type="email"
        placeholder="Mayank@example.com" icon={<MailIcon />}
        value={formData.email} onChange={handleChange} />

      {/* Passwords row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <InputField id="password" label="Password" placeholder="••••••••"
          icon={<LockIcon />} showToggle value={formData.password}
          onChange={handleChange} error={errors.password} />
        <InputField id="confirmPassword" label="Confirm password" placeholder="••••••••"
          icon={<LockIcon />} showToggle value={formData.confirmPassword}
          onChange={handleChange} error={errors.confirmPassword} />
      </div>

      {/* Terms */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-start gap-2 text-[12px] text-[#7a5c38]">
          <input type="checkbox" id="terms" checked={formData.terms}
            onChange={handleChange} className="mt-0.5 accent-[#a0642a] shrink-0" />
          <label htmlFor="terms">
            I agree to the{" "}
            <a href="#" className="text-[#8b5020] font-medium hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-[#8b5020] font-medium hover:underline">Privacy Policy</a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-[11px] text-[#c0392b] font-medium ml-5">{errors.terms}</p>
        )}
      </div>

      {/* Submit */}
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
        Create account
      </button>

      <p className="text-center text-[12.5px] text-[#8a6040] mt-1">
        Already have an account?{" "}
        <Link to="/user/login" className="text-[#7a4010] font-medium hover:underline">Sign in</Link>
      </p>
    </form>
  );
}