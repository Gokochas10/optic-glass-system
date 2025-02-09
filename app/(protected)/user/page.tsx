"use client";
import { UserInfo } from "@/components/auth/user-info";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";

const UserPage = () => {
  const user = useCurrentUser();

  return <UserInfo label="Bienvenido" user={user} />;
};

export default UserPage;
