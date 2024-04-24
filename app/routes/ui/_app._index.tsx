import { createTeam } from '@/.server/services/teams';
import { ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  // isUserLoggedIn(request);
  const formData = await request.formData();
  const { action, ...values } = Object.fromEntries(formData);
  console.log(action);
  switch (action) {
    case 'create':
      createTeam();
      break;
  }
}
