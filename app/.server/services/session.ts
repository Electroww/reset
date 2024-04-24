import { getSession } from '@/sessions';
import supabaseAuth from '../database/auth';
import { redirect } from '@remix-run/node';

const getUserSessionId = async (request: Request) => {
  // https://remix.run/docs/en/1.19.3/pages/faq#how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes
  const session = await getSession(request.headers.get('Cookie'));
  const jwt = session.get('jwt');
  const { data } = await supabaseAuth.auth.getUser(jwt);
  if (data && data.user) {
    return data.user.id;
  }
  throw redirect('/login');
};

export { getUserSessionId };
