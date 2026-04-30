import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-black tracking-[0.15em] mb-3">ZENMO</h3>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Premium watches for the generation that refuses to compromise on style.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/#products" className="hover:text-white transition-colors">Shop</Link></li>
            <li><Link href="/#reviews" className="hover:text-white transition-colors">Reviews</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Cash on Delivery available</li>
            <li>Easy 7-day returns</li>
            <li>6-month warranty</li>
            <li className="pt-1">
              <a href="mailto:hello@zenmo.shop" className="hover:text-white transition-colors">
                hello@zenmo.shop
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 sm:px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} Zenmo. All rights reserved.</span>
        <span>Made with obsession in India 🇮🇳</span>
      </div>
    </footer>
  )
}
