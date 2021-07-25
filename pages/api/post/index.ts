import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import { FormData } from "../../post/new";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === "POST") {
        try {
            const requestData = req.body as FormData
            const session = await getSession({req})
            const newPost = await prisma.post.create({
                data: {
                    title: requestData.title,
                    body: requestData.body,
                    author: {connect: {email: session?.user?.email}}
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


