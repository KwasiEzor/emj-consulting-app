import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/admin/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050e1c] flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
