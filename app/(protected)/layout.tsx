import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className=" bg-gradient h-full w-full flex flex-col gap-y-10 items-center justify-start">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
