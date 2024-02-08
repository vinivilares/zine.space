import { SessionProvider } from "next-auth/react"
import "styles/globals.css"

export default function App({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
