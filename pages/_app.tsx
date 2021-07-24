import {Fragment} from 'react'
import '../styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <header>
        <nav>
          <div className="flex justify-between items-center p-8 bg-blue-100">
            <div>
              <a href="/" className="text-blue-500 no-underline mr-3">Home</a>
             
            </div>

            <div>
              <a href="/post/new" className="text-blue-500 no-underline">New Post</a>
            </div>

          </div>
        </nav>
      </header>
      <main>
        <Component {...pageProps} />        
      </main>

      <footer className="bg-gray-100 flex justify-center items-center py-4">
        <p className="text-lg">Learn Next.js with me</p>
      </footer>
    </Fragment>
  )
}

export default MyApp
