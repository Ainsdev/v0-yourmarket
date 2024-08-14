import Link from "next/link";
import { HamburgerMenuIcon, RocketIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { type User } from "lucia";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDropdown } from "./user-dropdown";
import { MainNav } from "./mainNav";
import { mainNav } from "@/config/nav";

const routes = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  {
    name: "Documentation",
    href: "https://www.touha.dev/posts/simple-nextjs-t3-authentication-with-lucia",
  },
];

export const Header = ({ user }: { user: User | null }) => {
  return (
    <header className="px-2 py-4 lg:py-6">
      <div className="container flex items-center gap-2 p-0">
        <nav className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={mainNav} />
        </nav>
        <div className="ml-auto">
          {user ? (
            <UserDropdown
              email={user.email ?? ""}
              avatar={user.avatar}
              className="ml-auto"
            />
          ) : (
            <div className="flex items-center justify-center gap-2">
              {/* <Button size="sm" variant="link">
                Buscas Lugar?
              </Button> */}
              <Button asChild variant="secondary">
                <Link href="/sign-in">Iniciar Sesion</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
