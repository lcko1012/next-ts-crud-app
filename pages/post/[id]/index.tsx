import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import router from "next/router";
import { Fragment, useState } from "react";
import prisma from "../../../lib/prisma";
import { Post } from "../../../types/post.type";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.params
    const post: Post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })

    return {
        props: {post}
    }
}

export default function PostDetailPage({post}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [isValid, setIsValid] = useState(false)

    async function deletePost(id: number) {
        setIsValid(true)
        const res = await fetch(`/api/post/${id}`, {
            method: "DELETE"
        })
        const body = await res.json()
        
        if(!res.ok) {
            throw new Error(body.data.error.msg)
        }

        router.push("/")
    }

    return (
        <Fragment>
            <h1 className="m-8 text-2xl">
                {post.title}
            </h1>
            
            <p className="m-8">{post.body}</p>

            <div className="m-8 text-right">
                <Link href="/post/[id]/edit" as={`/post/${post.id}/edit`}>
                    <a>
                        <button className="bg-blue-500 text-white font-bold py-2 
                            px-4 rounded focus:outline-none focus:shadow-outline flex-grow 
                            md:flex-grow-0 mr-4 hover:bg-blue-700"
                        >
                            Edit
                        </button>
                    </a>
                </Link>

                <button className={`bg-red-500 text-white font-bold py-2 px-4 rounded 
                    focus:outline-none focus:shadow-outline flex-grow md:flex-grow-0 ${
                    isValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-700"
                    }`}
                    onClick={() => deletePost(post.id)}
                    disabled={isValid}
                >
                    Delete
                </button>
            </div>
           
        </Fragment>
    )
}