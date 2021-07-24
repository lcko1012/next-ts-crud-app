import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import router from "next/router"; 
import { PostForm, EditPostFormData } from "../../../components/PostForm";
import prisma from "../../../lib/prisma";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.params
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })
    return {
        props: {post}
    }
}

async function sendData(id: number, data: EditPostFormData) {
    const res = await fetch(`/api/post/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const body = await res.json()
    if(!res.ok) {
        throw new Error(body.data.error.message)
    }
}


export default function EditPostPage({post} : InferGetServerSidePropsType<typeof getServerSideProps>) {

    async function onFormSubmit(data: EditPostFormData) {
        try{
            await sendData(post.id, data)
            router.push(`/post/${post.id}`)
        }catch(err) {
            alert("Something went wrong :/")
        }
    }

    return (
        <section>
            <PostForm onSubmit={onFormSubmit} post={post} reset={false} />
        </section>
    )
}