import { includes } from "zod";
import prisma from "../../infrastructure/database/prisma.js";

export async function create(data) {
  return await prisma.user.create({
    data
  })
}

export async function findAll() {
  return prisma.user.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      id: "desc"
    },
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      phone: true,
      isActive: true,
      roleId: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

export async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      phone: true,
      isActive: true,
      roleId: true,
      role: {
        select: {
          name: true
        }
      },
      createdAt: true,
      updatedAt: true
    }
  })
}

export async function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: true
    }
  })
}

export async function activate(id) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      isActive: true
    },
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      phone: true,
      isActive: true,
      roleId: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

export async function deactivate(id) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      isActive: false
    },
    select: {
      id: true,
      name: true,
      lastname: true,
      email: true,
      phone: true,
      isActive: true,
      roleId: true,
      createdAt: true,
      updatedAt: true
    }
  })
}
