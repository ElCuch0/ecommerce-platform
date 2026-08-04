import { prisma } from "prisma";

export async function findCartById(cartId){
  return prisma.cart.findUnique({ where: { cartId } })
}

export async function createCart(data){
  return prisma.cart.create({ data })
}

export async function deletecart(cartId){
  return prisma.cart.delete({ where: { cartId } })
}
