import { getUser } from '@/.server/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { json } from '@remix-run/node';
import { Form } from '@remix-run/react';

export default function login() {
  return (
    <Form method="post">
      <div className="flex flex-col gap-3 pt-5">
        <h1 className="text-sm font-black uppercase">Reset</h1>
        <h2 className="text-2xl font-bold">Connectez-vous</h2>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-semibold">Email</span>
          <Input type="email" />
        </div>
        <div>
          <span className="font-semibold">Mot de passe</span>
          <Input type="password" />
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="ghost">Créer un compte</Button>
        <Button type="submit">Se connecter</Button>
      </div>
    </Form>
  );
}

export async function action() {
  // const formData = await request.formData();
  getUser();

  return json({ ok: true });
}
