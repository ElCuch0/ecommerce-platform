import { prisma } from "prisma";

export async function findAllProducts() {
  return prisma.product.findMany();
}

export async function findProductById(productId) {
  return prisma.product.findUnique({ where: { productId } });
}

export async function createProduct(data) {
  return prisma.product.create({ data });
}

export async function updateProduct(productId, data) {
  return prisma.product.update({
    where: { productId },
    data
  });
}

export async function deleteProduct(productId) {
  return prisma.product.delete({ where: { productId } });
}
