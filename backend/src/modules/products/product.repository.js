import prisma from "../../infrastructure/database/prisma.js";

export async function findAll() {
  return prisma.product.findMany({
    orderBy: {
      id: "desc"
    },
    where: {
      isActive: true
    }
  });
}

export async function findById(id) {
  return prisma.product.findFirst({
    where: {
      id
    }
  });
}

export async function findByReference(reference) {
  return prisma.product.findUnique({
    where: {
      reference
    }
  })
}

export async function create(data) {
  return prisma.product.create({ data });
}

export async function update(id, data) {
  return prisma.product.update({
    where: {
      id
    },
    data
  });
}

export async function deactivate(id) {
  return prisma.product.update({
    where: {
      id
    },
    data: {
      isActive: false
    }
  });
}

export async function activate(id) {
  return prisma.product.update({
    where: {
      id
    },
    data: {
      isActive: true
    }
  })
}
