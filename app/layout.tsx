import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OmniGroove - Dashboard",
  description: "Gérez vos playlists et exportez-les vers vos plateformes préférées",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

