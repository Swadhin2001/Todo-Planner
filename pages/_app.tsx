import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
    // <div className="bg-black text-white h-screen" >
    // </div>
  )
}
