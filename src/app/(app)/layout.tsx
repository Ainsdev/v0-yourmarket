import { Toaster } from "@/components/ui/sonner";

import { Header } from "@/components/Header";
import { validateRequest } from "@/lib/auth/lucia";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
export default async function AppLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <main>
      <div className="flex h-screen">
        <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
          <Header user={user} />
          {props.children}
          {props.modal}
        </main>
      </div>
      <Toaster richColors />
      <footer className="w-full py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            &copy; 2024 YourMarket - All rights reserved
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              Shop
            </Link>
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0 justify-center items-center">
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              <InstagramLogoIcon />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              <TwitterLogoIcon />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </footer>
    </main>
  );
}
