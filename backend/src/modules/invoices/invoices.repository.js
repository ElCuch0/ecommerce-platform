import { prisma } from "prisma";

export async function createInvoice(data){
  return prisma.invoice.create({data})
}
