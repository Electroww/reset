import { eq } from 'drizzle-orm';
import { db } from '../database/client';
import { teams } from '../model/teams';
import { getCompanyFromClient } from './companies';

const createTeam = async (companyId: number, name = 'Nouvelle Team') => {
  console.log(name);
  db.transaction(async (tx) => {
    const team = await tx
      .insert(teams)
      .values({
        name: name,
        companyId,
      })
      .returning();
    console.log(team);
  });
};

const getTeamByUserId = async (userId: string) => {
  const companyId = await getCompanyFromClient(userId);
  return await db.select().from(teams).where(eq(teams.companyId, companyId));
};

export { createTeam, getTeamByUserId };
