import { includes } from "zod";
import prisma from "../../infrastructure/database/prisma.js";

export async function create(data) {
  return await prisma.user.create({data})
}

export async function findAll() {
  return prisma.user.findMany()
}

export async function findById(id) {
  return prisma.user.findUnique({
    where: {id}
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

export async function update(id, data) {
  return prisma.user.update({
    where: {id},
    data: {data}
  })
}

export async function remove(id) {
  return prisma.user.delete({
    where: {id}
  })
}
