"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirige a la página principal después de cerrar sesión
  };

  return <span onClick={handleLogout}>{children}</span>;
};