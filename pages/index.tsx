import {InferGetServerSidePropsType} from "next"
import { PostList } from "../components/PostList"
import prisma from "../lib/prisma"




export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    where: {pulished: true},
    include: {
      author: {
        select: {name: true}
      }
    }
  })
  
  return {
    props: {posts}
  }
}


export default function Home({posts}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PostList posts={posts} />
  )
}
