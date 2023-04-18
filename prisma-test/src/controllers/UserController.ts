import { Request, Response} from "express"
import { emit } from "process";
import { prismaClient } from "../database/PrismaClient";
import { string } from "superstruct";



// export class UserController {
//     async create (req: Request, res: Response){
//         const { name , email } = req.body;
//         try{

        
//         const userNew = await prismaClient.user.create({
//             data:{
//                 name,
//                 email,
//                 posts:{
                    
//                 }
//             }
//         })

//         return res.json(userNew)
//     }catch(error){
//         return res.status(500).json({500:'E-mail já existe!'})
//     }
//     }
//     async index (req: Request, res: Response){
//         try {
//         const userRead = await prismaClient.user.findMany();
//         return res.json(userRead)
//     }catch(error){
//         return res.status(501).json({error: error})
//     }
//     }

//     async show (req: Request, res: Response){
//         const { id } = req.params;

//         const userShow = await prismaClient.user.findUnique({id})
//         return res.json(userShow)
//     }
//     async update (req: Request, res: Response){
//         const { id } = req.params;
//         try{

//         const userUpdate = await prismaClient.user.upsert()
//         if (userUpdate){
//             const user = await prismaClient.user.findUnique({where:{id}})
//             return res.status(200).send(user)
//         }
        
//     }catch(error){
//         return res.status(501).json({error: error})
//     }
        
        
        
//     }
//     async delete (req: Request, res: Response){
//         const { id } = req.params;
//         try{
//             const userDelete = await prismaClient.user.delete({where: {
//                 id: id
//             }})
//         if (userDelete){
//             return res.status(200).json("Usuário deletado!")

//         }throw new Error();
//         }catch(error){
//             return res.status(501).json({error: error})
//         }
//     }

    
// }

// export class CreateUserController {
//     async handle (req: Request, res: Response){
//         const { email, name} = req.body;
//         try{
//             const user = await prismaClient.user.create({
//                 data:{
//                     email,
//                     name,
                    
//                 }
//             })
//             return res.json(user)

//         }catch(error){
//             return res.status(501).json({error: error})
//         }

//     }
    
// }

const create = async (req: Request,res: Response) => {
    try{
        const { name, email} = req.body;
        const user = await prismaClient.user.findUnique({ where:{email} })
        if(user){
            return res.json("E-mail já cadastrado!")
        }
        const usercreated = await prismaClient.user.create({
            data: {
                name,
                email
            },
            
        })
        return res.status(201).json({message: "Usuário cadastrado", usercreated: usercreated})               
    }catch(error){
        return res.status(501).json({message: error})
    }
};

const index = async(req: Request, res: Response) => {
    

    try{
        const users = await prismaClient.user.findMany({
            where:{
                OR:[
                    {email: {
                        endsWith: 'gmail.com',                                               
                    }},
                    { email:{
                        endsWith: 'io.com'
                    }}
                ],
                NOT: [
                    {email: {
                        endsWith: 'hotmail.com'
                    }}
                ]
            },
            include:{
                 posts: true
                }
        })

        return res.status(201).json(users)

    }catch(error){
        return res.status(501).json({message: error})

    }
}
const show = async(req: Request, res: Response) => {
    const { id } = req.params
    try{        
        const user = await prismaClient.user.findUnique({where:{ id: Number(id)}, select: {email: true}})        
        return res.status(201).json({user})      
    }catch(error){        
        return res.status(501).json({message: error})
    }
}
const update = async(req: Request, res: Response)=>{
    const { id } = req.params;
    const { name, email} = req.body
    try{
        const update = await prismaClient.user.update({
            where: {
                id: Number(id)
            },
            data:{
                name,
                email
            }
        })
        if (update){
            const user = await prismaClient.user.findFirst({where:{ id: Number(id)}});
            return res.status(200).send(user)
        }
    }catch(error) {
        return res.status(501).json({message: error})
    }
}

const destroy = async(req: Request, res: Response)=>{
    const { id } = req.params;
    try {
        console.log('oii')
        const user = await prismaClient.user.findUnique({
            where: {id: Number(id)}
        })
        if(!user){
            return res.json({message: "Usuário não encontrado"})
        }
        const deleted = await prismaClient.user.deleteMany({
            where:{
                id: Number(id),
                             
            },
            

        })        
        console.log('oi')
        if(deleted){
            return res.status(200).json({message: "Usuário deletado com sucesso!"})
        }        
    } catch (error) {
        return res.status(501).json({message: error})        
    }
}

const showPostsUser = async( req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await prismaClient.user.findUnique({
            where:{
                id: Number(id)
            }
        })
        if (!user){
            return res.json({message: "Usuário não encontrado."})
        }
        const userpost = await prismaClient.user.findUnique({
            where:{ id: Number(id)},
            select:{ name: true, email: true, posts: true }
            
        })
        return res.status(201).json({Usuário: userpost})
    } catch (error) {
        return res.status(501).json({error: error})
        
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    showPostsUser
}