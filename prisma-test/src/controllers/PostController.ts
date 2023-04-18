import { prismaClient } from "../database/PrismaClient";
import { Request, Response } from "express";



const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body
    const { id } = req.params

    try {
        const user = await prismaClient.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!user) {
            console.log('mostra eu 1')
            return res.json({ message: "Usuário não encontrado" })
        }
        console.log('mostra eu 2')

        const post = await prismaClient.post.create({
            data: {
                title: String(title),
                content: String(content),
                userId: user.id
                              
            },
            include:{
                author: true
            }
           

        })
        console.log('mostra eu 3')
        return res.status(201).json({ message: "Post criado!", post })

    } catch (error) {
        return res.status(501).json({ message: error })

    }

}

const index = async(req:Request, res:Response) => {

    try {
        const posts = await prismaClient.post.findMany({
            select:{
                title: true,
                content: true,
                author: true
            }
            
        })

        return res.status(201).json(posts)
        
    } catch (error) {
        return res.status(501).json({message: error})
        
    }

}
const show = async(req: Request, res: Response) => {
    const { id} = req.params
    try {
        const user = await prismaClient.post.findUnique({
            where: {
                id: Number(id)
            },
            select:{
                title: true,
                content: true,
                author: true
            }
            
        })
        if (!user){
            return res.json({message: "Usuário não encontrado"})
        }
        const listPost = await prismaClient.post.findMany()
        const postList = listPost.map((table)=> table.userId)
        return res.status(200).json({postList})
        
    } catch (error) {
        return res.status(500).json({message: error})
        
    }

}

const updatePost = async(req: Request, res:Response) =>{
    const {id} = req.params
    const { title, content} = req.body
    try {
        const post = await prismaClient.post.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!post){
            return res.json({message: "Post não encontrado"})
        }
         await prismaClient.post.update({
            where:{
                id: Number(id)
            },
            data:{
                title,
                content,
                
            }
         })
         return res.status(201).json(post)
        
    } catch (error) {
        return res.status(501).json({message: error})

        
    }
}

const destroy = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
        const deletePost = await prismaClient.post.delete({
            where: {
                id: Number(id)
            }
        })
        if (deletePost){
            return res.json({message: "Post deletado!"})
        }
        
    } catch (error) {
        
    }
}

module.exports = {
    createPost,
    index,
    updatePost,
    show,
    destroy
}