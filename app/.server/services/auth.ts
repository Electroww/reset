import { db } from '../database/client';
import { user } from '../model/user';

type Credentials = {
  fullname: string;
  email: string;
  password: string;
};

const createUser = ({ fullname, email, password }: Credentials) => {
  return db.insert(user).values({
    fullName: fullname,
    email,
    password,
  });
};

export { createUser };
