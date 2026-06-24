"use client";

import Link from "next/link";
import { ShieldX } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/sign-in");
  };

  return (
    <div className="min-h-screen bg-[#050e1c] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="font-poppins font-bold text-2xl text-white mb-3">Accès refusé</h1>
        <p className="text-white/50 mb-8">
          Votre compte n&apos;a pas les droits administrateur nécessaires pour accéder à cette page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-colors">
            Retour au site
          </Link>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold hover:bg-[#b8941e] transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
