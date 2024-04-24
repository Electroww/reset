import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, useActionData } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { createUser, ErrorCodes } from '@/.server/services/auth';
import { getSession, commitSession } from '../sessions';
import { CreateUserDto } from '@/types/createUserDto';
import { json, redirect } from '@remix-run/node'; // or cloudflare/deno

export default function Register() {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post" className="flex flex-col gap-16">
      <div className="flex flex-col gap-3 pt-5">
        <h1 className="text-sm font-black uppercase">Reset</h1>
        <h2 className="text-2xl font-bold">Rejoignez Reset !</h2>
      </div>
      {actionData?.error ? (
        <em className="text-red-400">{actionData?.error}</em>
      ) : null}
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-semibold">Nom et prenom</span>
          <Input name="fullname" type="text" />
        </div>
        <div>
          <span className="font-semibold">Entrepise</span>
          <Input name="company" type="text" />
        </div>
        <div>
          <span className="font-semibold">Email</span>
          <Input name="email" type="email" />
        </div>
        <div>
          <span className="font-semibold">Mot de passe</span>
          <Input name="password" type="password" />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="ghost">
          Se connecter
        </Button>
        <Button type="submit">{"S'inscrire"}</Button>
      </div>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const session = await getSession(request.headers.get('Cookie'));
  const data = await createUser({
    fullname: formData.get('fullname'),
    email: formData.get('email'),
    password: formData.get('password'),
    company: formData.get('company'),
  } as CreateUserDto);

  if (data && 'session' in data && data.session?.access_token) {
    session.set('jwt', data.session.access_token);
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  if (
    data &&
    'error' in data &&
    data.error === ErrorCodes.USER_ALREADY_EXISTS
  ) {
    return json({
      error: "L'email est déjà utilisé.",
    });
  }

  if (data && 'error' in data && data.error === ErrorCodes.WEAK_PASSWORD) {
    return json({
      error: 'Le mot de passe doit contenir au moins 6 caractères.',
    });
  }

  return json({
    error: 'Le serveur a rencontré une erreur',
  });
}
