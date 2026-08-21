import prisma from "./src/infrastructure/database/prisma.js";

const products = await prisma.product.deleteMany({
    where: {
        inventory: null
    }
})

console.log("Se eliminaron: ", products)
