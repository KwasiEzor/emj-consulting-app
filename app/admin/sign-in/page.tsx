import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen navy-gradient flex items-center justify-center">
      <SignIn />
    </div>
  );
}
