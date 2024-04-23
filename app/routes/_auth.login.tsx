import { ErrorCodes, loginUser } from '@/.server/services/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { commitSession, getSession } from '@/sessions';
import { LoginUserDto } from '@/types/loginUserDto';
import { ActionFunctionArgs } from '@remix-run/node';
import { Form, json, redirect, useActionData } from '@remix-run/react';

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post" className="flex flex-col gap-16">
      <div className="flex flex-col gap-3 pt-5">
        <h1 className="text-sm font-black uppercase">Reset</h1>
        <h2 className="text-2xl font-bold">Connectez-vous</h2>
      </div>
      {actionData?.error ? (
        <em className="text-red-400">{actionData?.error}</em>
      ) : null}
      <div className="flex flex-col gap-6">
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
          Créer un compte
        </Button>
        <Button type="submit">Se connecter</Button>
      </div>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const session = await getSession(request.headers.get('Cookie'));
  const data = await loginUser({
    email: formData.get('email'),
    password: formData.get('password'),
  } as LoginUserDto);

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
    data.error === ErrorCodes.INVALID_CREDENTIALS
  ) {
    return json({
      error: "L'email ou mot de passe est invalide",
    });
  }

  return json({
    error: 'Le serveur a rencontré une erreur',
  });
}
