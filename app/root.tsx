import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { ActionFunctionArgs, LinksFunction } from '@remix-run/node';

import stylesheet from '@/globals.css?url';
import supabaseAuth from './.server/database/auth';
import { getSession } from './sessions';

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

export const loader = async ({
  request,
}: ActionFunctionArgs) => {

  const session = await getSession(request.headers.get('Cookie'));
  console.log(session, session.get('jwt'));
  const { data: { user } } = await supabaseAuth.auth.getUser(
    
  );


  return "ok";
};
