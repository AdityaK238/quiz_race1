const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function main(){
    //Prisma Client queries go here
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })
