import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/client";
import Link from "next/link";
import router from "next/router";
import { Fragment, useState } from "react";
import prisma from "../../../lib/prisma";
import { Post } from "../../../types/post.type";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params
    const post: Post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            author: {
                select: {email: true}
            }
        }
    })

    return {
        props: { post }
    }
}

export default function PostDetailPage({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [isValid, setIsValid] = useState(false)
    const [session, loading] = useSession()
    if (loading) {
        return <div>Authenticating...</div>
    }

    const userHasValidSession = Boolean(session)
    const postBelongsToUser = session?.user?.email === post.author?.email


    let title = post.title
    if (!post.pulished) {
        title = `${post.title} (Draft)`
    }

    async function deletePost(id: number) {
        setIsValid(true)
        const res = await fetch(`/api/post/${id}`, {
            method: "DELETE"
        })
        const body = await res.json()

        if (!res.ok) {
            throw new Error(body.data.error.msg)
        }

        router.push("/")
    }

    async function publishPost(id: number) {
        await fetch(`/api/post/${id}`, {
            method: "PUT"
        })
        router.push("/posts")
    }

    return (
        <Fragment>
            <h1 className="m-8 text-2xl">
                {title}
            </h1>

            <p className="m-8">{post.body}</p>

            <div className="m-8 text-right">

                {
                    userHasValidSession && postBelongsToUser && (
                        <button
                            className={`bg-yellow-500 text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline flex-grow md:flex-grow-0 mr-2 hover:bg-yellow-700"
                            `}
                            disabled={isValid}
                            onClick={() => publishPost(post.id)}>
                            {post.pulished ? 'Hide' : 'Publish'} 
                        </button>
                    )
                }
                {
                    userHasValidSession && postBelongsToUser && (
                        <>
                            <button className={`bg-red-500 text-white font-bold py-2 px-4 rounded 
                                focus:outline-none focus:shadow-outline flex-grow md:flex-grow-0 mr-2 ${isValid
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-red-700"
                                }`}
                                onClick={() => deletePost(post.id)}
                                disabled={isValid}
                            >
                                Delete
                            </button>
                            <Link href="/post/[id]/edit" as={`/post/${post.id}/edit`}>
                                <a>
                                    <button className="bg-blue-500 text-white font-bold py-2 
                                        px-4 rounded focus:outline-none focus:shadow-outline flex-grow 
                                        md:flex-grow-0 mr-4 hover:bg-blue-700"
                                        disabled={isValid}
                                    >
                                        Edit
                                    </button>
                                </a>
                            </Link>
                        </>
                    )
                }

            </div>

        </Fragment>
    )
}