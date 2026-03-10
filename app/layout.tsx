import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { ChatWidget } from '@/components/ChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NovaCart | Immersive 3D Marketplace',
  description: 'Experience the future of shopping with NovaCart. Premium goods, interactive 3D exploration, and AI-powered support.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
