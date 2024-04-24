import { CreateUserDto } from '@/types/createUserDto';
import supabaseAuth from '../database/auth';
import { LoginUserDto } from '@/types/loginUserDto';
import { db } from '../database/client';
import { clients } from '../model/clients';
import { companies } from '../model/companies';

enum ErrorCodes {
  WEAK_PASSWORD = 'weak_password',
  USER_ALREADY_EXISTS = 'user_already_exists',
  INVALID_CREDENTIALS = 'invalid_credentials',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = async ({
  fullname,
  email,
  company,
  password,
}: CreateUserDto) => {
  const user = await db.transaction(async (tx) => {
    const { data, error } = await supabaseAuth.auth.signUp({
      email: email,
      password: password,
    });

    if (error !== null) {
      return { error: error.code };
    }

    if (data && data.user) {
      const idCompany = await tx
        .insert(companies)
        .values({
          name: company,
        })
        .returning();
      await tx.insert(clients).values({
        id: data.user.id,
        fullname,
        companyId: idCompany[0].id,
      });
    }

    return data;
  });

  return user;
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
