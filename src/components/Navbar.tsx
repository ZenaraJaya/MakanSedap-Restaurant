'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  cart: { [key: string]: number };
}

export default function Navbar({ cart }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Menu', href: '/menu', hasDropdown: true },
    { name: 'Contact', href: '/#contact' },
    { name: 'Reviews', href: '/reviews' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
        isScrolled ? 'bg-[#0b0f19]/90 backdrop-blur-md py-2' : 'bg-[#0b0f19]/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-xl h-9 w-9">
            <img
              src="https://images.unsplash.com/photo-1644920437956-388353e26e28?q=80&w=627&auto=format&fit=crop"
              alt="MakanSedap Logo"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-amber-400/10 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-wider text-amber-300 group-hover:text-amber-200 transition-colors">
              MakanSedap
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group py-2">
              {link.hasDropdown ? (
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  <Link href={link.href}>{link.name}</Link>
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  
                  {/* Dropdown Content */}
                  <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-white/10 bg-[#0b0f19]/95 backdrop-blur-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                    <div className="py-2 flex flex-col">
                      <Link href="/menu?category=main" className="px-4 py-2 hover:bg-white/10 hover:text-amber-300 transition-colors">Main Dish</Link>
                      <Link href="/menu?category=dessert" className="px-4 py-2 hover:bg-white/10 hover:text-amber-300 transition-colors">Desserts</Link>
                      <Link href="/menu?category=drinks" className="px-4 py-2 hover:bg-white/10 hover:text-amber-300 transition-colors">Drinks</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/view-order"
            className="hidden sm:flex rounded-full bg-amber-400 px-5 py-2 text-xs font-black text-black shadow-[0_8px_20px_rgba(245,158,11,0.3)] hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all items-center gap-2"
          >
            VIEW ORDER
            {cartCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black/10 px-1 text-[10px] font-bold border border-black/5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 text-white md:hidden hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0b0f19] transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="space-y-4 mb-8">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-2xl font-bold transition-all duration-300 transform ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className={link.name === 'Menu' ? 'text-amber-400' : 'text-white'}>{link.name}</span>
                  <ChevronDown size={20} className={link.name === 'Menu' ? 'text-amber-400' : 'text-white/20'} />
                </div>
              </Link>
            ))}
          </div>

          <div className={`mt-auto pb-12 transition-all duration-500 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '500ms' }}>
            <Link
              href="/view-order"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-400 py-4 text-base font-black text-black shadow-xl shadow-amber-400/20"
            >
              <ShoppingCart size={20} />
              VIEW ORDER ({cartCount})
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
