import { CreateUserDto } from '@/types/createUserDto';
import supabaseAuth from '../database/auth';

enum ErrorCodes {
  WEAK_PASSWORD = 'weak_password',
  USER_ALREADY_EXISTS = 'user_already_exists',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = async ({ fullname, email, password }: CreateUserDto) => {
  const { data, error } = await supabaseAuth.auth.signUp({
    email: email,
    password: password,
  });
  if (error !== null) {
    return { error: error.code };
  }
  return data;
};

export { createUser, ErrorCodes };
