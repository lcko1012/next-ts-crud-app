import { NextApiRequest, NextApiResponse } from "next";
import { EditPostFormData } from "../../../components/PostForm";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: {id}
    } = req

    if(req.method === "PUT") {
        const data = req.body as EditPostFormData
        try {
            const editedPost = await prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title: data.title,
                    body: data.body
                }
            })
            
            return res.status(200).json({status: "Success", data: editedPost})
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                data: { msg: "Could not update post", error }
            });
        }
        
    }

    if(req.method === "DELETE") {
        try {
            await prisma.post.delete({
                where: {
                    id: Number(id)
                }
            })
    
            return res.status(200).json({status: "Success"})
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                data: { msg: "Could not delete post", error }
            });
        }
    }

    return res.status(405).json({msg: "Method not implemented"})
}