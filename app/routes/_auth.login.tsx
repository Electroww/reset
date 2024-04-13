import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function login() {
  return (
    <>
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
        <Button>Se connecter</Button>
      </div>
    </>
  );
}
