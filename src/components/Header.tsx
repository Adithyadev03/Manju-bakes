import { useState, useEffect } from 'react';
import { ShoppingBag, Star, Phone, MapPin, Clock } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ cartCount, onCartClick, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if store is open (Manju opens her baking hours. Real closes 7 PM)
  useEffect(() => {
    const checkOpenStatus = () => {
      const currentHour = new Date().getHours();
      setIsOpen(currentHour >= 8 && currentHour < 19); // 8 AM to 7 PM
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#3D2B1F]/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div 
            id="brand-logo"
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center text-white font-serif text-xl font-bold shadow-xs">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-tight uppercase text-[#3D2B1F]">
                The Cakery
              </span>
              <span className="font-sans text-[10px] tracking-widest uppercase text-[#A0522D] font-bold">
                Bakes by Manju
              </span>
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-7 font-sans text-xs font-semibold uppercase tracking-widest text-[#3D2B1F]/70">
            <button
              onClick={() => onScrollToSection('menu')}
              className="hover:text-[#A0522D] transition-colors cursor-pointer"
            >
              Menu
            </button>
            <button
              onClick={() => onScrollToSection('customizer-promo')}
              className="hover:text-[#A0522D] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A0522D] animate-pulse"></span>
              Custom Order
            </button>
            <button
              onClick={() => onScrollToSection('about')}
              className="hover:text-[#A0522D] transition-colors cursor-pointer"
            >
              Story
            </button>
            <button
              onClick={() => onScrollToSection('reviews')}
              className="hover:text-[#A0522D] transition-colors cursor-pointer flex items-center gap-1"
            >
              Reviews
              <span className="bg-[#EADBC8] text-[#3D2B1F] text-[10px] px-1.5 py-0.5 rounded-full font-bold">5.0</span>
            </button>
            <button
              onClick={() => onScrollToSection('contact')}
              className="hover:text-[#A0522D] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action Area */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Store Status Indicator - Compact */}
            <div className="hidden sm:flex items-center bg-[#EADBC8]/40 border border-[#3D2B1F]/10 px-2.5 py-1 rounded-full text-xs font-semibold text-[#3D2B1F] gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="uppercase tracking-widest text-[10px]">{isOpen ? 'Open · Closes 7pm' : 'Closed · Opens 8am'}</span>
            </div>

            {/* Quick Call */}
            <a
              href="tel:+919567848698"
              id="call-manju-header"
              className="p-2 text-[#3D2B1F] bg-[#F5E6DA]/60 hover:bg-[#EADBC8] rounded-full transition-colors flex items-center justify-center border border-[#3D2B1F]/10"
              title="Call Manju (+91 95678 48698)"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onCartClick}
              className="relative p-2.5 sm:px-4 sm:py-2.5 bg-[#8B4513] hover:bg-[#3D2B1F] text-white rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">My Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A0522D] text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
