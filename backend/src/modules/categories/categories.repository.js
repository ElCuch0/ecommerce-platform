import prisma from '../../infrastructure/database/prisma.js';

export async function findAll() {
  return prisma.category.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      id: "desc"
    }
  });
}

export async function findById(id) {
  return prisma.category.findUnique({
    where: {
      id
    }
  });
}

export async function findByName(name) {
  return prisma.category.findUnique({
    where: {
      name
    }
  })
}

export async function create(data) {
  return prisma.category.create({ data });
}

export async function update(id, data) {
  return prisma.category.update({
    where: {
      id
    },
    data
  })
}

export async function deactivate(id) {
  return prisma.category.update({
    where: {
      id
    },
    data: {
      isActive: false
    }
  });
}

export async function activate(id) {
  return prisma.category.update({
    where: {
      id
    },
    data: {
      isActive: true
    }
  });
}
