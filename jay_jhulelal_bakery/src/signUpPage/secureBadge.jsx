export function SecureBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 bg-[rgba(180,130,70,0.15)]
                    border border-[rgba(160,110,60,0.28)] rounded-full px-3 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#a0642a] animate-pulse" />
      <span className="text-[11px] font-medium text-[#7a4f1e] uppercase tracking-widest">
        Secure sign-up
      </span>
    </div>
  );
}