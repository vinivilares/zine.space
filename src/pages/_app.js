import { SessionProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar"
import "styles/globals.css"

export default function App({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="#59F8E8" />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
