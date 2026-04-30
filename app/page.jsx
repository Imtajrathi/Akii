import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products, reviews } from '@/data/products'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80"
            alt="Zenmo watch hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">
              New Collection — 2024
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Wear the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                Difference.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 font-light leading-relaxed">
              Premium look. Without the premium price.<br />
              <span className="text-gray-400 text-base">Timepieces starting at ₹1,299.</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#products"
                className="bg-white text-brand px-8 py-3.5 text-sm font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors rounded-sm"
              >
                Shop Now
              </Link>
              <Link
                href="/#about"
                className="border border-white/30 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-widest hover:border-white/60 transition-colors rounded-sm"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="bg-brand text-white py-4 overflow-hidden">
        <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-16 px-4 text-xs font-semibold uppercase tracking-widest">
          <span>10,000+ Customers</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span>4.7 ★ Rating</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span>Loved Across India 🇮🇳</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span>Cash on Delivery</span>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-3">
            The Collection
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Every wrist. Every occasion.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── LIFESTYLE SECTION ── */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-4">
                Wear It Your Way
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-6">
                From campus<br />to candlelight.
              </h2>
              <p className="text-muted leading-relaxed mb-8 max-w-sm">
                Zenmo watches aren't just accessories — they're how you show up. Effortlessly stylish, every single day.
              </p>
              <Link
                href="/#products"
                className="inline-block bg-brand text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-sm"
              >
                Find Your Style
              </Link>
            </div>

            <div className="order-1 md:order-2 grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=600&q=80"
                  alt="Lifestyle wrist shot"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80"
                  alt="Watch lifestyle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-3">Why Zenmo</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Built different.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: '◇',
              title: 'Premium Design',
              desc: 'Every detail is obsessed over. The dial, the strap, the finish — crafted to look expensive without the price tag.',
            },
            {
              icon: '◯',
              title: 'Everyday Comfort',
              desc: 'Featherlight. Wrist-friendly. You\'ll forget you\'re wearing it — until someone notices.',
            },
            {
              icon: '△',
              title: 'Versatile Style',
              desc: 'Casual Friday. Date night. Board meeting. Zenmo works for all of it. One watch, endless outfits.',
            },
          ].map(item => (
            <div key={item.title} className="text-center p-8 border border-border hover:border-brand transition-colors group">
              <div className="text-3xl mb-5 group-hover:scale-110 transition-transform inline-block">
                {item.icon}
              </div>
              <h3 className="text-base font-bold mb-3 tracking-wide">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-surface border-y border-border py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Free Shipping', sub: 'On orders above ₹999' },
            { label: 'COD Available', sub: 'Pay on delivery' },
            { label: '7-Day Returns', sub: 'Hassle-free' },
            { label: '6-Month Warranty', sub: 'We stand behind it' },
          ].map(t => (
            <div key={t.label}>
              <p className="text-xs font-bold uppercase tracking-widest">{t.label}</p>
              <p className="text-xs text-muted mt-1">{t.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-3">Real People</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">They said what?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map(r => (
            <div key={r.id} className="border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">{r.name}</p>
                  <p className="text-[11px] text-muted mt-0.5">{r.location}</p>
                </div>
              </div>
              <p className="text-xs text-gold mb-3">{'★'.repeat(r.rating)}</p>
              <p className="text-sm text-muted leading-relaxed">"{r.text}"</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand/40 mt-4">{r.product}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-brand text-white py-20 text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-4">
          Don't wait
        </p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
          Your wrist is waiting.
        </h2>
        <p className="text-gray-400 mb-10 text-lg">Limited stock. Unlimited style.</p>
        <Link
          href="/#products"
          className="bg-white text-brand px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors rounded-sm inline-block"
        >
          Shop the Collection
        </Link>
      </section>
    </>
  )
}
