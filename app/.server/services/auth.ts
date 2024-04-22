import { CreateUserDto } from '@/types/createUserDto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PROJECT_URL || '',
  process.env.ANON_PUBLIC || ''
);

const createUser = async ({ fullname, email, password }: CreateUserDto) => {
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
