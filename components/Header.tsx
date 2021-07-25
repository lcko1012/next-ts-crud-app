import { useRouter } from 'next/router'
import React from 'react'
import {signOut, useSession} from 'next-auth/client'
import Link from 'next/link'

const Header: React.FC = () => {
    const router = useRouter()
    // const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname  
    const [session, loading] = useSession()

    let left = (
        <div>
            <Link href="/">
                <a className="mr-2">
                    Home
                </a>
            </Link>
        </div>
    )

    let right = null

    if(loading) {
        left = (
            <div>
                <Link href="/">
                    <a className="mr-2">
                        Home
                    </a>
                </Link>
            </div>
        )

        right = (
            <div className="ml-auto">
                <p>Validating session...</p>
            </div>
        )
    }

    if(!session) {
        right = (
            <div className="ml-auto">
               <Link href="/api/auth/signin">
                    <a>Log in</a>
               </Link>
            </div>
        )
    }

    if(session) {
        left = (
            <div>
                <Link href="/">
                    <a className="mr-2">
                        Home
                    </a>
                </Link>

                <Link href="/posts">
                    <a >
                        My posts
                    </a>
                </Link>
            </div>
        )

        right = (
            <div className="ml-auto flex items-center">
                <p>{session.user.name} ({session.user.email})</p>
                <Link href="/post/new">
                    <button className="p-2">
                        <a>New Post</a>
                    </button>
                </Link>

                <button className="p-2" onClick={() => signOut()}>
                    <a>Log out</a>
                </button>
            </div>
        )
    } 

    return (
        <nav className="flex px-8 py-3 items-center bg-blue-200">
            {left}
            {right}
        </nav>
    )
}

export default Header