import {Fragment} from "react"
import {PostListItem} from "./PostListItem"
import {Post} from "../types/post.type"

type Props = {
    posts: Post[]
}

const PostList: React.FC<Props> = ({posts}) => {
    return (
        <Fragment>
            {posts.map(p => (
                <PostListItem key={p.id} post={p}/>
            ))}
        </Fragment>
    )
}


export {PostList}