import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, json } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { createUser } from '@/.server/services/auth';

export default function register() {
  return (
    <Form method="post" className="flex flex-col gap-16">
      <div className="flex flex-col gap-3 pt-5">
        <h1 className="text-sm font-black uppercase">Reset</h1>
        <h2 className="text-2xl font-bold">Rejoignez Reset !</h2>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-semibold">Nom et prenom</span>
          <Input name="fullname" type="text" />
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

  await createUser({
    fullname: formData.get('fullname') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  return json({ ok: true });
}
