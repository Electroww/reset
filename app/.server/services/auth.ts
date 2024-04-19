import { db } from '../database/client';
import { user } from '../model/user';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PROJECT_URL || '',
  process.env.ANON_PUBLIC || ''
);

type Credentials = {
  fullname: string;
  email: string;
  password: string;
};

const createUser = async ({ fullname, email, password }: Credentials) => {
  console.log('pour le fullname on verra');
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error !== null) {
    return error;
  }
  return data;
};

export { createUser };
