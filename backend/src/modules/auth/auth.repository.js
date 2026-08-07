import { prisma } from '../../infrastructure/database/prisma.js';

export async function createUser(data) {
  return prisma.user.create({ data });
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
