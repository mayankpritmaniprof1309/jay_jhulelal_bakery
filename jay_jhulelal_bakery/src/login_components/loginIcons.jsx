// SVG icon components
export function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M2.5 6.5L10 11L17.5 6.5M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

export function EyeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M2 9s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function EyeOffIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M2 2l16 16M8.5 8.6A3 3 0 0111.4 11.5M7 4.9C8 4.3 9 4 10 4c4 0 7 4 7 4s-.8 1.5-2.2 2.8M3.2 7.2C2.4 8.2 2 9 2 9s3 4 8 4c1 0 2-.2 2.9-.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}