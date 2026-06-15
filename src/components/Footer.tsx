import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, CircleAlert, Navigation } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#3D2B1F] text-[#FDFBF7] font-sans">
      
      {/* Upper Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-serif text-2xl font-black text-[#FDFBF7] tracking-tight uppercase">The Cakery</h2>
            <p className="font-sans text-xs sm:text-sm text-[#FDFBF7]/80 leading-relaxed max-w-sm">
              Freshly baked custom gourmet cakes, eggless options, and healthy pastries by 
              Manju. Crafted with premium home ingredients in our super hygiene kitchen.
            </p>
            
            {/* Clean badges indicators */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-sans text-[11px] font-bold">
              <span className="bg-[#FDFBF7]/10 border border-[#FDFBF7]/10 text-[#FDFBF7] px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span>Hygiene Guaranteed</span>
              </span>
              <span className="bg-[#FDFBF7]/10 border border-[#FDFBF7]/10 text-[#FDFBF7] px-2 py-0.5 rounded flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#A0522D]" />
                <span>100% Eggless Care</span>
              </span>
            </div>
            
            <p className="text-[10.5px] text-[#FDFBF7]/60">
              © {new Date().getFullYear()} The Cakery Kanhangad. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links Navigation */}
          <div className="lg:col-span-3 space-y-4 font-sans text-xs sm:text-sm">
            <h3 className="font-serif text-base font-bold text-amber-50">Quick Navigation</h3>
            <ul className="space-y-2.5 text-amber-200/70 font-medium">
              <li>
                <button
                  onClick={() => onScrollToSection('menu')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Bakes Menu Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Our Hygiene Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('reviews')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Verified User Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Customizer Workshop
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Direction Address */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="font-serif text-base font-bold text-amber-50">Contact & Directions</h3>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-amber-200/70 font-medium leading-relaxed">
              
              {/* Address card */}
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-100 block">Baking Kitchen Location:</span>
                  <span>Sri Nidhi, Nittadukkam Nr. Mutthapanthara, Shree Venkatramana Temple Rd, Kanhangad, Kerala 671531</span>
                </div>
              </div>

              {/* Phoner */}
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-bold text-amber-100 block">Call / WhatsApp:</span>
                  <a href="tel:+919567848698" className="hover:text-rose-300 hover:underline">095678 48698</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-bold text-amber-100 block">Email:</span>
                  <a href="mailto:bakesmanju@gmail.com" className="hover:text-rose-300 hover:underline">bakesmanju@gmail.com</a>
                </div>
              </div>

              {/* Time */}
              <div className="flex gap-3 items-center">
                <Clock className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-bold text-amber-100 block">Opening Hours:</span>
                  <span>Daily: 8:00 AM – 7:00 PM</span>
                </div>
              </div>

            </div>

            {/* Google Map Link button */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Sri+Nidhi+Nittadukkam+Nr+Mutthapanthara+Shree+Venkatramana+Temple+Rd+Kanhangad+Kerala+671531"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-rose-800 hover:bg-rose-900 text-amber-50 px-4 py-2 text-xs font-semibold rounded-xl tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 fill-amber-50" />
                <span>Directions on Google Maps</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Embedded Map/About Box */}
      <div className="bg-[#211209] border-t border-[#FDFBF7]/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center sm:items-stretch sm:justify-between sm:flex-row gap-5">
          
          <div className="flex items-center gap-2 text-[11px] text-[#FDFBF7]/60">
            <CircleAlert className="w-4 h-4 text-[#A0522D] shrink-0" />
            <span>Note: No AI Automated Bot is integrated. Orders compiled are sent straight to Manju's WhatsApp.</span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] font-bold text-[#FDFBF7]/60">
            <span>₹800–1,000 average spend per person</span>
            <span>·</span>
            <span>Verified 5-Star Home Bakery</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
