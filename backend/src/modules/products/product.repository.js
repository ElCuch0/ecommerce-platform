import prisma from "../../infrastructure/database/prisma.js";

export async function findAll() {
  return prisma.product.findMany({
    orderBy: {
      id: "desc"
    }
  });
}

export async function findById(id) {
  return prisma.product.findUnique({
    where: { id }
  });
}

export async function findByReference(reference) {
  return prisma.product.findUnique({
    where: {reference}
  })
}

export async function create(data) {
  return prisma.product.create({ data });
}

export async function update(id, data) {
  return prisma.product.update({
    where: { id },
    data
  });
}

export async function remove(id) {
  return prisma.product.delete({ where: { id } });
}
