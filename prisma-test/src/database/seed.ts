import { prismaClient } from "./PrismaClient"
import { faker } from '@faker-js/faker'


async function main() {
    try {
        for ( let i = 0; i < 10; i++){
            await prismaClient.user.create({
                data:{
                    name: faker.name.fullName(),
                    email: faker.internet.email()
                    
                },
                
                
                
            })
        }
        
    } catch (error) {
        console.log({message: error})
        
    }
}



main()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })
