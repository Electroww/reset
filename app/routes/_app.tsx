import { Teams } from '@/.server/model/teams';
import { getUserSessionId } from '@/.server/services/session';
import { getTeamByUserId } from '@/.server/services/teams';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

export default function App() {
  const fetcher = useFetcher();
  const { teams } = useLoaderData<{ teams: Teams[] }>();

  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const closeForm = () => {
    setIsCreatingTeam(false);
  };

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
                {teams.length ? (
                  <ul>
                    {teams.map((team) => (
                      <li key={team.id}>{team.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    <i>No teams</i>
                  </p>
                )}
                {isCreatingTeam ? (
                  <fetcher.Form method="post" onSubmit={() => closeForm()}>
                    <Input
                      type="text"
                      name="teamName"
                      defaultValue="Nouvelle Team"
                    />
                  </fetcher.Form>
                ) : null}

                <Button
                  onClick={() => setIsCreatingTeam(true)}
                  variant="outline"
                  size="sm"
                  className="w-fit"
                >
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserSessionId(request);
  const teams = await getTeamByUserId(userId);
  return json({ teams: teams });
};
