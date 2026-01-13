import { Outlet } from "react-router-dom";

export function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
