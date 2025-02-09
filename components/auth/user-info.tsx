import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-[1200px] h-screen shadow-md">
      <CardHeader>
        <p className=" text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className=" space-y-4">
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Id</p>
          <p className=" truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-sm ">
            {user?.id}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Nombre</p>
          <p className=" truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-sm p-1">
            {user?.name}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Correo</p>
          <p className=" truncate text-xs max-w-fit font-mono bg-slate-100 rounded-sm p-1">
            {user?.email}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Rol</p>
          <p className=" truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-sm p-1">
            {user?.role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
