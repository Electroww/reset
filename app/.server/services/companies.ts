import { eq } from 'drizzle-orm';
import { db } from '../database/client';
import { clients } from '../model/clients';

const getCompanyFromClient = async (clientId: string) => {
  const company = await db
    .select({ companyId: clients.companyId })
    .from(clients)
    .where(eq(clients.id, clientId));
  return company[0].companyId;
};

export { getCompanyFromClient };
