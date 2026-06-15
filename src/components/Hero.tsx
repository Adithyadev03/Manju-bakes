import { Star, ArrowRight, Heart, Sparkles, Shield, Compass } from 'lucide-react';

interface HeroProps {
  onBrowseMenu: () => void;
  onOpenCustomizer: () => void;
}

export default function Hero({ onBrowseMenu, onOpenCustomizer }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FDFBF7]"
    >
      {/* Visual elegant thin line divider in background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#3D2B1F]/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#3D2B1F]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Homemade Kerala Badge */}
            <div className="inline-block px-4.5 py-1.5 bg-[#E8D5C4] rounded-full text-xs font-bold uppercase tracking-widest text-[#3D2B1F] shadow-xs">
              Homemade in Kerala
            </div>
 
            {/* Main Punchy Copy */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-7xl font-serif font-black tracking-tight leading-[1.0] text-[#3D2B1F]">
                Bakes by<br />
                <span className="text-[#A0522D] relative inline-block">
                  Manju
                </span>
              </h1>
              <p className="font-sans text-[#3D2B1F]/85 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed pt-2">
                Heavenly eggless treats, handcrafted with hygiene and love. Experience the warmth of home in every bite, baked in Kanhangad without any artificial colors or heavy creams. Perfect for joyful occasions.
              </p>
            </div>

            {/* Google Reviews and Price Metric block */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-2">
              <div>
                <div className="text-3xl font-black text-[#3D2B1F] tracking-tight">5.0</div>
                <div className="flex justify-center lg:justify-start text-amber-500 text-xs tracking-widest mt-0.5">
                  ★★★★★
                </div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#3D2B1F]/60 mt-1">162 Google Reviews</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-[#3D2B1F]/20"></div>
              <div>
                <div className="text-3xl font-serif font-bold italic text-[#3D2B1F]">₹800+</div>
                <div className="text-xs text-amber-600 font-bold mt-[1px] uppercase tracking-wider">Starting price</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#3D2B1F]/60">Avg per person</div>
              </div>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-2 font-sans text-xs text-[#3D2B1F] font-semibold">
              <div className="flex items-center gap-2 bg-[#F5E6DA]/75 p-3 rounded-2xl border border-[#3D2B1F]/10">
                <div className="p-1 bg-[#8B4513]/10 text-[#8B4513] rounded-lg">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span>100% Hygiene Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-[#EADBC8]/75 p-3 rounded-2xl border border-[#3D2B1F]/10">
                <div className="p-1 bg-[#8B4513]/10 text-[#8B4513] rounded-lg">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span>Eggless Specialties</span>
              </div>
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                id="btn-browse-cakes"
                onClick={onBrowseMenu}
                className="w-full sm:w-auto px-8 py-4 bg-[#8B4513] hover:bg-[#3D2B1F] text-white rounded-full font-sans text-xs uppercase tracking-widest font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="btn-customizer-hero"
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto px-8 py-4 bg-[#EADBC8] hover:bg-[#D9C5B2] text-[#3D2B1F] rounded-full font-sans text-xs uppercase tracking-widest font-black transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#3D2B1F]/10 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#A0522D] animate-spin-slow" />
                <span>Custom Cake Builder</span>
              </button>
            </div>

          </div>

          {/* Right Visual "Bento Grid" Cake Showcase Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 px-4 sm:px-10 lg:px-0">
            
            <div className="relative bg-[#EADBC8]/50 rounded-3xl p-8 border border-[#3D2B1F]/10 shadow-sm flex flex-col justify-between h-auto">
              
              {/* Outer border decorative lines */}
              <div className="absolute inset-3 border border-dashed border-[#8B4513]/20 rounded-2xl pointer-events-none" />

              {/* Central Cake Showcase illustration box */}
              <div className="relative z-10 p-4 flex flex-col items-center">
                
                {/* SVG/Emoticon Hybrid Render of Homemade Cake */}
                <div className="relative w-44 h-44 bg-white/60 rounded-full flex items-center justify-center shadow-xs mb-6 ring-8 ring-[#F5E6DA]">
                  <div className="absolute text-7xl animate-bounce" style={{ animationDuration: '3.5s' }}>🎂</div>
                  <div className="absolute -top-1 -right-1 bg-[#A0522D] text-white rounded-full p-2 h-9 w-9 flex items-center justify-center font-bold text-xs shadow-xs">
                    100%
                  </div>
                  {/* Floating strawberry emoji nodes */}
                  <span className="absolute top-4 left-4 text-2xl animate-pulse">🍓</span>
                  <span className="absolute bottom-6 right-4 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>🍫</span>
                </div>

                {/* Cake Badge Details */}
                <div className="text-center space-y-3 mt-2">
                  <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                    Homemade Freshness
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <span className="bg-[#E8D5C4] text-[#3D2B1F] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Spanish Delight</span>
                    <span className="bg-[#E8D5C4] text-[#3D2B1F] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Choco Truffle</span>
                    <span className="bg-[#E8D5C4] text-[#3D2B1F] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Butterscotch</span>
                  </div>
                  <p className="font-sans text-xs text-[#3D2B1F]/70 max-w-xs mx-auto leading-relaxed">
                    Eggless treats custom baked for kids. Absolutely no added food colorings, no preservation stabilizers, less cream density!
                  </p>
                </div>

              </div>

              {/* Mini visual summary of Manju’s commitment with star icons */}
              <div className="relative z-10 bg-[#FDFBF7] border border-[#3D2B1F]/10 p-4 rounded-2xl mt-4">
                <p className="italic text-xs text-gray-600 leading-relaxed mb-3">
                  "Ordered chocolate truffle for my father's birthday. The taste was heavenly and the delivery was perfectly on time."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8B4513]/10 flex items-center justify-center font-black text-xs text-[#3D2B1F]">LT</div>
                  <span className="text-xs font-bold text-[#3D2B1F]">Lakshmi Mohan</span>
                </div>
              </div>

            </div>

            {/* Fancy ambient elements floating in grid right */}
            <div className="absolute bottom-[-10px] left-[-15px] bg-[#3D2B1F] text-white p-3.5 rounded-full shadow-lg text-[10px] uppercase tracking-widest font-bold hidden sm:flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
              <span>Kanhangad Direct!</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
