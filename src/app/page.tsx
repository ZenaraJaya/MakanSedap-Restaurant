'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { ChefHat, Utensils, ShoppingCart, Headset, MapPin, Phone, Mail } from 'lucide-react';

function LandingPage() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('localCart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white overflow-x-hidden px-2 sm:px-0">

      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-amber-400 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f19]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1644920437956-388353e26e28"
              className="h-9 w-9 rounded-xl object-cover"
            />
            <p className="text-sm font-semibold text-amber-300">MakanSedap</p>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <Link href="/menu">Menu</Link>
            <a href="#contact">Contact</a>
            <Link href="/reviews">Reviews</Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Mobile Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-xl"
            >
              ☰
            </button>

            {/* Cart */}
            <Link
              href={`/view-order`}
              className="rounded-full bg-amber-400 px-3 py-2 text-xs sm:text-sm font-extrabold text-black"
            >
              Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0b0f19] border-b border-white/10 px-4 py-4 space-y-3">
            <a href="#home" className="block">Home</a>
            <a href="#about" className="block">About</a>
            <Link href="/menu" className="block">Menu</Link>
            <a href="#contact" className="block">Contact</a>
            <Link href="/reviews" className="block">Reviews</Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-8 px-4 w-full">

          <div>
            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-6xl font-extrabold">
              Enjoy hundreds of
              <br />
              <span className="text-amber-300">flavors under</span>
              <br />
              one roof
            </h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70">
              Discover chef-crafted dishes, quick ordering, and a smooth dining experience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/menu" className="bg-amber-400 px-5 py-2.5 rounded-full text-black font-bold">
                Browse Menu
              </Link>

              <a href="#about" className="border border-white/20 px-5 py-2.5 rounded-full">
                Read More
              </a>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="p-6 bg-white/5 rounded-xl">
            <ChefHat />
            <h3 className="mt-4 font-bold">Master Chefs</h3>
          </div>

          <div className="p-6 bg-white/5 rounded-xl">
            <Utensils />
            <h3 className="mt-4 font-bold">Quality Food</h3>
          </div>

          <div className="p-6 bg-white/5 rounded-xl">
            <ShoppingCart />
            <h3 className="mt-4 font-bold">Online Order</h3>
          </div>

          <div className="p-6 bg-white/5 rounded-xl">
            <Headset />
            <h3 className="mt-4 font-bold">24/7 Service</h3>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Welcome to <span className="text-amber-300">MakanSedap</span>
        </h2>

        <p className="mt-4 text-white/70">
          We take pride in our culinary diversity, combining Western and traditional cuisines.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="space-y-4 text-white/70">
            <p className="flex gap-2"><MapPin /> Miri, Sarawak</p>
            <p className="flex gap-2"><Phone /> +60 12-345 6789</p>
            <p className="flex gap-2"><Mail /> hello@makansedap.com</p>
          </div>

          <form className="space-y-3">
            <input className="w-full p-3 bg-white/5 rounded" placeholder="Full Name" />
            <input className="w-full p-3 bg-white/5 rounded" placeholder="Email" />
            <textarea className="w-full p-3 bg-white/5 rounded" placeholder="Message" />
            <button className="w-full bg-amber-400 text-black py-3 rounded font-bold">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* MOBILE NAV BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0b0f19] border-t border-white/10 flex justify-around py-3 md:hidden text-sm">
        <a href="#home">Home</a>
        <Link href="/menu">Menu</Link>
        <Link href="/view-order">Cart</Link>
        <a href="#contact">Contact</a>
      </div>

      {/* FOOTER */}
      <footer className="text-center py-6 text-white/50 text-sm">
        © {new Date().getFullYear()} MakanSedap
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <LandingPage />
    </Suspense>
  );
}