// import { prismaClient } from "../database/PrismaClient";
// import { assert, object, refine, size, string } from "superstruct";
// import IsEmail from "isemail";
// import { Prisma, User } from "@prisma/client";

// const Signup = object({
//     email:  refine(string(), 'email', (v: string) => IsEmail.validate(v)),
//     password: size(string(), 7 , 30),
//     name: size(string(), 2, 50)
// })

// type Signup = Omit<Prisma.UserCreateArgs['data'], 'id'>

// async function signup(input: Signup): Promise <User> {
//     assert(input, Signup)
//     return prismaClient.user.create({
//         data
    
//     })
    
// }