export type NetWorkPost = {
    userId: number
    id: number
    title: string
    body: string
}

export type User = {
    id: number,
    name?: string,
    email?: string,
    emailVerified?: string,
    createdAt?: string,
    updatedAt?: string,
    posts: Post[]      
}

export type Post = {
    id?: number;
    title: string;
    body: string;
    pulished?: boolean,
    author?:  {
        name?: string,
        email?: string
    },
    authorId?: number
}