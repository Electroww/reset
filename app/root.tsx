import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { ActionFunctionArgs, LinksFunction } from '@remix-run/node';

import stylesheet from '@/globals.css?url';
import { createTeam } from './.server/services/teams';
import { getUserSessionId } from './.server/services/session';
import { getCompanyFromClient } from './.server/services/companies';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await getUserSessionId(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if ('teamName' in data) {
    const companyId = await getCompanyFromClient(userId);
    createTeam(companyId, data.teamName as string);
  }
  return 'ok';
}
