import {Fragment} from "react"
import {PostListItem} from "./PostListItem"
import {Post} from "../types/post.type"

type Props = {
    posts: Post[] | []
}

const PostList: React.FC<Props> = ({posts}) => {
    return (
        <Fragment>
            <div className="flex flex-wrap">
                {posts.map(p => (
                    <PostListItem key={p.id} post={p}/>
                ))}
            </div>
            
        </Fragment>
    )
}


export {PostList}