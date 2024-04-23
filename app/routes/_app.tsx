import { Button } from '@/components/ui/button';
import { Outlet } from '@remix-run/react';

export default function _app() {
  return (
    <div className="grid w-full md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] min-h-screen w-">
      <div className="hidden border-r reset-borders bg-primary bg-opacity-5 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="p-6">RESET</div>
          <div className="flex-1">
            <nav className="grid gap-5 items-start px-6 text-sm lg:px-12">
              <div className="flex text-lg font-bold items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary cursor-pointer">
                Dashboard
              </div>
              <div className="flex flex-col gap-4 px-3 py-2">
                <div className="flex text-lg font-bold items-center gap-3 rounded-lg  transition-all hover:text-primary cursor-pointer">
                  Team
                </div>
                <div>Pas de team :(</div>
                <Button variant="outline" size="sm" className="w-fit">
                  Ajouter une team
                </Button>
              </div>
            </nav>
          </div>
          <div className="mt-auto p-6">Déconnexion</div>
        </div>
      </div>
      <div className="flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
