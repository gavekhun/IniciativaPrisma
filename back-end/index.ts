import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data:{
            nome: 'Alice',
            email: 'alice@email.com',
            tipoUser: false,
            endereco: 'Rua vesuvio 04 - Wona - Belford Roxo',
            CPF: 171982333356,
            dataNascimento: '08/05/2666',
            phone: '8999-9090'



        }
    })
}

const allUsers =  await prisma.user.findMany({
    include: {
        posts: true,
        cart: true
    }
})
console.dir(allUsers, { depth: null})


  


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })