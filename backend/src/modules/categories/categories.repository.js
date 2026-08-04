import { prisma } from 'prisma';

export async function findAllCategories() {
  return prisma.category.findMany();
}

export async function findCategoryById(categoryId) {
  return prisma.category.findUnique({ where: { categoryId } });
}

export async function createCategory(data) {
  return prisma.category.create({ data });
}

export async function updateCategory(categoryId, data) {
  return prisma.category.update({
    where: { categoryId },
    data
  });
}

export async function deleteCategory(categoryId) {
  return prisma.category.delete({ where: { categoryId } });
}
