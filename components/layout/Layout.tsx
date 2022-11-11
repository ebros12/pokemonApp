import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../ui";


type Props = {
    children?: React.ReactNode
    title?: string
  };

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: React.FC<Props> = ({children, title}) => {

  return (
    <>  
        <Head>
            <title>{ title ? title:"Pokemon App"}</title>
            <meta name="author" content="Ebros" />
            <meta name="description" content={`Informacion sobre el pokémon ${title}`} />
            <meta name="keywords" content={`${title}, pokemon, pokedex`} />
            <meta property="og:title" content={`informacion sobre ${title}`} />
            <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <Navbar />

        <main style={{ 
            padding: ' 0px 20px',
         }}>
            { children }
        </main>
    </>
  )
}
