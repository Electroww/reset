import { Outlet } from '@remix-run/react';

export default function _app() {
  return (
    <div className="grid w-full md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] min-h-screen w-">
      <div className="hidden border-r reset-borders bg-primary bg-opacity-5 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                Dashboard
              </div>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                Team
              </div>
            </nav>
          </div>
          <div className="mt-auto p-4">div</div>
        </div>
      </div>
      <div className="flex flex-col">
        {' '}
        <Outlet />
      </div>
    </div>
  );
}
