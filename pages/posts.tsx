import { GetServerSideProps } from "next"
import { getSession, useSession } from "next-auth/client"
import { PostList } from "../components/PostList"
import prisma from "../lib/prisma"
import { Post } from "../types/post.type"



export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req})
    if(!session) {
        res.statusCode = 403
        return {props: {posts: [] } }
    }
    const posts = await prisma.post.findMany({
        where: {
            author: {email: session.user.email},
        },
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


type Props = {
    posts: Post[]
}


const Posts: React.FC<Props> = (props) => {
    const [session] = useSession()
    
    if(!session) {
        <div>
            <h1>My Posts</h1>
            <div>You need to be authenticated to view this page</div>
        </div>
    }

    return(
        <div>
            <div>
                <h1>My Posts</h1>
                <PostList posts={props.posts} />
            </div>
        </div>
    )
}

export default Posts