import { Outlet } from "react-router-dom";
import { FloatingDock } from "./FloatingDock";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <main className="pb-24">
        <Outlet />
      </main>
      <FloatingDock />
    </div>
  );
};
