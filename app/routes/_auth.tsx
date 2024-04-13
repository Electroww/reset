import { Outlet } from '@remix-run/react';

export default function authLayout() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-primary bg-opacity-5">
      <div className="px-20 py-8 reset-borders shadow-card bg-white rounded-3xl flex flex-col gap-16">
        <Outlet />
      </div>
    </div>
  );
}
