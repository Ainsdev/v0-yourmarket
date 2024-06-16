import { Toaster } from "@/components/ui/sonner";

import Sidebar from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { validateRequest } from "@/lib/auth/lucia";
export default async function AppLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <main>
      <div className="flex h-screen">
        {/* <Sidebar /> */}
        <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
          <Header user={user} />
          {props.children}
          {props.modal}
        </main>
      </div>
      <Toaster richColors />
    </main>
  );
}
