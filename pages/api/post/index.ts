import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { FormData } from "../../post/new";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === "POST") {
        try {
            const requestData = req.body as FormData
            const newPost = await prisma.post.create({
                data: {
                    title: requestData.title,
                    body: requestData.body
                }
            })
            return res.status(201).json({status: "Success", data: newPost})
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                data: { msg: "Could not create post", error }
            });
        }
    }

    return res.status(405).json({ msg: "Method not implemented" });
}


