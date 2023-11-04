import { Footer, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Car next',
  description: 'discover the best new generation car in all over the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=''>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
