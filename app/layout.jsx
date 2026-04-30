import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

export const metadata = {
  title: 'ZENMO — Premium Watches',
  description: 'Premium timepieces. Accessible prices. Shop the Zenmo collection.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
