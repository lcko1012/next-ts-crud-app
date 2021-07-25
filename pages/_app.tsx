import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import {Fragment} from 'react'
import Header from '../components/Header'
import '../styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}> 
      <Fragment>
        <Header />
        <main className="py-8 px-20">
          <Component {...pageProps} />        
        </main>

        <footer className="bg-gray-100 flex justify-center items-center py-4">
          <p className="text-lg">Learn Next.js with me</p>
        </footer>
      </Fragment>
    </Provider>
  )
}

export default MyApp
