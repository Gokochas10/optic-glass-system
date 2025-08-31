import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});
export default function Home() {
  return (
    <main
      className={cn(
        "flex flex-col items-center justify-center bg-gradient h-screen"
      )}
    >
      <div className=" space-y-6 text-center">
        <h1
          className={cn(
            " text-7xl text-sky-50 font-semibold",
            poppins.className
          )}
        >
          Glass System
        </h1>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg" className=" text-lg">
              Inicia Sesión
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
