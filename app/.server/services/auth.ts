import { CreateUserDto } from '@/types/createUserDto';
import supabaseAuth from '../database/auth';
import { LoginUserDto } from '@/types/loginUserDto';

enum ErrorCodes {
  WEAK_PASSWORD = 'weak_password',
  USER_ALREADY_EXISTS = 'user_already_exists',
  INVALID_CREDENTIALS = 'invalid_credentials',
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

const loginUser = async ({ email, password }: LoginUserDto) => {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  });
  if (error !== null) {
    return { error: ErrorCodes.INVALID_CREDENTIALS };
  }
  return data;
};

export { createUser, loginUser, ErrorCodes };
