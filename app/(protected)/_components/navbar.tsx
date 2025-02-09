"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-center gap-10 items-center p-4 rounded-xl w-full max-w-[1200px] shadow-sm mt-10">
      <div className="flex gap-x-8">
      <Button
        variant={pathname === "/user" ? "default" : "outline"}
        asChild
      >
        <Link href="/user">Usuario</Link>
      </Button>
      <Button
        variant={pathname === "/user/client" ? "default" : "outline"}
        asChild
      >
        <Link href="/user/client">Clientes</Link>
      </Button>
      <Button variant={pathname === "/user/medrecord" ? "default" : "outline"} asChild>
        <Link href="/user/medrecord">Nuevo historial clinico</Link>
      </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
