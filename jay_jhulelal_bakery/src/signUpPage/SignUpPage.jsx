import { SecureBadge }    from "./secureBadge";
import { WelcomeMessage } from "./WelcomeMessage";
import { SignUpForm }     from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(245,233,220)] p-6
                    relative overflow-hidden">
      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(180,140,100,0.12) 1px, transparent 1px)",
                 backgroundSize: "24px 24px" }} />

      {/* glows */}
      <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,160,100,0.2) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(180,130,80,0.16) 0%, transparent 70%)" }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-105 bg-[rgb(230,211,179)] rounded-2xl
                      px-9 py-9 border border-[rgba(160,110,60,0.28)]
                      shadow-[0_20px_50px_rgba(150,110,60,0.16)]
                      flex flex-col gap-4">

        <SecureBadge />        {/* ── Component 1 */}

        <hr className="border-dashed border-[rgba(160,110,60,0.3)]" />

        <WelcomeMessage />     {/* ── Component 2 */}

        <hr className="border-dashed border-[rgba(160,110,60,0.3)]" />

        <SignUpForm />         {/* ── Component 3 */}

      </div>
    </div>
  );
}