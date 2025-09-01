"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleLogout = () => {
    // Función más robusta para obtener la URL base
    const getBaseUrl = () => {
      // En el servidor, usar la variable de entorno
      if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_APP_URL!;
      }
      // En el cliente, usar la URL actual
      return window.location.origin;
    };

    const baseUrl = getBaseUrl();
    signOut({ callbackUrl: `${baseUrl}/` });
  };

  return <span onClick={handleLogout}>{children}</span>;
};