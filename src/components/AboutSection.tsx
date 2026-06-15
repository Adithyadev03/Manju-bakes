import { ShieldCheck, Sparkles, Heart, Award, ArrowRight, Star } from 'lucide-react';

interface AboutSectionProps {
  onBrowseMenu: () => void;
}

export default function AboutSection({ onBrowseMenu }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-[#FDFBF7] border-y border-[#3D2B1F]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Text Description & USP bullets */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <span className="font-sans text-xs font-bold text-[#A0522D] tracking-widest uppercase block">Our Story & Core Values</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3D2B1F] leading-snug">
                Freshly Baked on Order in Kanhangad
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#3D2B1F]/80 leading-relaxed">
                Welcome to <strong>The Cakery</strong>, a home baking initiative founded by Manju in Kanhangad, Kerala. 
                Our journey started with a simple belief: celebration cakes should not just look beautiful, they should be 
                <strong> healthy, chemical-free, and safe </strong> for families, especially little kids!
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-[#F5E6DA] p-5 rounded-2xl border border-[#3D2B1F]/10 shadow-xs space-y-2">
                <div className="p-2 bg-[#8B4513]/10 text-[#8B4513] w-10 h-10 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#3D2B1F]">Absolute Hygiene Bakes</h3>
                <p className="font-sans text-xs text-[#3D2B1F]/70 leading-relaxed">
                  Every sponge is baked inside a spotless, sparkling domestic home kitchen using premium flour, brand fats, and fresh fruits.
                </p>
              </div>

              <div className="bg-[#EADBC8] p-5 rounded-2xl border border-[#3D2B1F]/10 shadow-xs space-y-2">
                <div className="p-2 bg-[#8B4513]/10 text-amber-600 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-100" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#3D2B1F]">Kid-Safe: Less Cream</h3>
                <p className="font-sans text-xs text-[#3D2B1F]/70 leading-relaxed">
                  No heavy grease! We prioritize standard or less cream coatings and absolutely no added chemical food colorings on request.
                </p>
              </div>

              <div className="bg-[#D9C5B2] p-5 rounded-2xl border border-[#3D2B1F]/10 shadow-xs space-y-2">
                <div className="p-2 bg-[#8B4513]/10 text-[#A0522D] w-10 h-10 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#3D2B1F]">100% Eggless Mastery</h3>
                <p className="font-sans text-xs text-[#3D2B1F]/70 leading-relaxed">
                  Special vegetarian recipes that substitute eggs using high-quality emulsifiers while retaining rich fluffiness.
                </p>
              </div>

              <div className="bg-[#C7B299] p-5 rounded-2xl border border-[#3D2B1F]/10 shadow-xs space-y-2">
                <div className="p-2 bg-[#3D2B1F]/10 text-[#3D2B1F] w-10 h-10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#3D2B1F]">Tailored Theme Artistry</h3>
                <p className="font-sans text-xs text-[#3D2B1F]/70 leading-relaxed">
                  Describe any birthday theme, customized color patterns or special layers, and get it precisely executed!
                </p>
              </div>

            </div>

            {/* Quote Block */}
            <blockquote className="border-l-4 border-[#A0522D] pl-4 py-2 italic font-serif text-sm text-[#3D2B1F]/90 bg-[#F5E6DA]/30 pr-3 rounded-r-lg">
              "We ordered Butterscotch and Chocolate Truffle for my father-son duo birthday celebration. 
              The taste was heavenly, baked eggless and delivered with total promptness on previous-day short notice!"
              <span className="block mt-1 font-sans text-[11px] font-bold text-[#A0522D] not-italic">— Verified review from maps, Kanhangad</span>
            </blockquote>

          </div>

          {/* Right Side: Visual Card Stack & Local Highlights */}
          <div className="lg:col-span-5 relative">
            
            <div className="bg-[#EADBC8]/50 rounded-3xl p-6 sm:p-8 border border-[#3D2B1F]/10 shadow-xs space-y-6 relative overflow-hidden">
              {/* Decorative background border */}
              <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 bg-white/20 rounded-full pointer-events-none" />

              <h3 className="font-serif text-xl font-bold text-[#3D2B1F]">
                Manju's Baking Code
              </h3>

              <div className="space-y-4">
                {[
                  { title: 'Freshness Standard', text: 'Baked strictly on previous-day order. We do not store pre-made cakes or stale materials.' },
                  { title: 'Natural Ingredients', text: 'Real milk fats, pure ghee, natural fruit purees and reduction fillings over cheap synthetic squashes.' },
                  { title: 'Kanhangad Locality Care', text: 'As a local community kitchen, we support direct handovers and coordinate seamless self-pickup at your convenience.' },
                  { title: 'Transparent Quotes', text: 'Standard items run on fixed ₹750–1200 rates. We do not apply unexpected hidden surcharges!' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="bg-[#8B4513] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-[#3D2B1F]">{item.title}</h4>
                      <p className="font-sans text-xs text-[#3D2B1F]/70 leading-normal">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={onBrowseMenu}
                className="w-full py-3 bg-[#8B4513] hover:bg-[#3D2B1F] text-white text-xs uppercase tracking-widest font-bold rounded-full text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Browse the Menu Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
