import {Post} from '../types/post.type'
import Link from "next/link"

type Props = {
    post: Post
}

const PostListItem: React.FC<Props> = ({post}) => {
    return (
        <Link href="/post/[id]" as={`/post/${post.id}`}>
            <a>
                <article className="bg-gray-100 border-gray-400 rounded-lg p-6 m-4 transition duration-300 ease-in-out transform hover:-translate-y-2">
                    <div className="text-center md:text-left">
                        <span className="text-lg">{post.title}</span>
                        <p className="text-blue-500">
                            {post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}
                        </p>
                    </div>
                </article>
            </a>
        </Link>
    )
}

export {PostListItem}