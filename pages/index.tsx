import {InferGetServerSidePropsType} from "next"
import { PostList } from "../components/PostList"
import prisma from "../lib/prisma"

type NetworkPosts = {
  userId: number
  id: number
  title: string
  body: string
}

type Post = {
  id: number
  title: string,
  body: string
}


export async function getServerSideProps() {
  const res = await prisma.post.findMany()
  const posts: Post[] = res.map(({id, title, body}) => ({
    id,
    title,
    body
  }))
  
  return {
    props: {posts}
  }
}


export default function Home({posts}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PostList posts={posts} />
  )
}
