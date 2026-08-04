import { prisma } from "prisma";

export async function createCheckout(data){
  return prisma.checkout.create(data)
}
