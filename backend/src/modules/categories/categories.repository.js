import prisma from '../../infrastructure/database/prisma.js';

export async function findAll() {
  return prisma.category.findMany();
}

export async function findById(id) {
  return prisma.category.findUnique({ where: { id } });
}

export async function findByName(name) {
  return prisma.category.findUnique({
    where: {name}
  })
}

export async function create(data) {
  return prisma.category.create({ data });
}

export async function remove(id) {
  return prisma.category.remove({ where: { id } });
}
