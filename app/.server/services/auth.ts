import { CreateUserDto } from '@/types/createUserDto';
import supabaseAuth from '../database/auth';

const createUser = async ({ fullname, email, password }: CreateUserDto) => {
  console.log('pour le fullname on verra');
  const { data, error } = await supabaseAuth.auth.signUp({
    email: email,
    password: password,
  });
  if (error !== null) {
    return error;
  }
  return data;
};

export { createUser };
