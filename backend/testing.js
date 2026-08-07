import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function test() {
    const roles = await prisma.role.findMany();
    console.log(roles);
}

test();
