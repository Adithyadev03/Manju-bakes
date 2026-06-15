import { useState, useEffect, FormEvent } from 'react';
import { X, Calendar, Clock, Sparkles, MessageSquareCode, BadgeHelp, CheckCircle2 } from 'lucide-react';
import { CakeItem, CartItem } from '../types';

interface CustomizerModalProps {
  item: CakeItem | null; // If null, means "Completely Custom Masterpiece"
  onClose: () => void;
  onAddToCart: (customizedItem: Omit<CartItem, 'id'>) => void;
}

const WEIGHT_MULTIPLIERS = {
  halfKg: 0.5,
  oneKg: 1,
  '1.5kg': 1.5,
  '2kg': 2,
  '2.5kg': 2.5,
  '3kg+': 3,
};

export default function CustomizerModal({ item, onClose, onAddToCart }: CustomizerModalProps) {
  // Option choices
  const [selectedWeight, setSelectedWeight] = useState<'halfKg' | 'oneKg' | 'custom'>('oneKg');
  const [customWeightMultiplier, setCustomWeightMultiplier] = useState<'1.5kg' | '2kg' | '2.5kg' | '3kg+'>('1.5kg');
  
  const [isEggless, setIsEggless] = useState(true); // default to eggless since reviews praise it!
  const [creamLevel, setCreamLevel] = useState<'less' | 'normal' | 'extra'>('less'); // default less cream (kid safe!)
  const [noAddedColors, setNoAddedColors] = useState(true); // default true for kids safety!
  
  const [textOnCake, setTextOnCake] = useState('');
  const [specialDetails, setSpecialDetails] = useState('');
  
  // Custom flavor selection if master custom bakes is selected
  const [customFlavorName, setCustomFlavorName] = useState('');

  // Date/Time preferences
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('16:00'); // 4 PM default

  // Setup default states if item is selected
  useEffect(() => {
    if (item) {
      if (item.price.fixed !== undefined) {
        setSelectedWeight('custom');
      } else if (item.price.halfKg !== undefined && item.price.oneKg === undefined) {
        setSelectedWeight('halfKg');
      } else {
        setSelectedWeight('oneKg');
      }
      setIsEggless(item.isEgglessAvailable);
    } else {
      setSelectedWeight('oneKg');
      setIsEggless(true);
    }
  }, [item]);

  // Compute calculated base price
  const computedPrice = (() => {
    // If master completely custom cake
    if (!item) {
      // Custom standard pricing estimate baseline
      let base = 850; // default medium base 1kg estimate rate
      if (selectedWeight === 'halfKg') base = 450;
      else if (selectedWeight === 'custom') {
        const factor = WEIGHT_MULTIPLIERS[customWeightMultiplier];
        base = 850 * factor;
      }
      // Eggless addon
      if (isEggless) base += 50;
      return base;
    }

    // If predefined menu cake
    if (item.price.fixed !== undefined) {
      return item.price.fixed;
    }

    let calculated = 0;
    if (selectedWeight === 'halfKg') {
      calculated = item.price.halfKg || (item.price.oneKg ? item.price.oneKg * 0.55 : 450);
    } else if (selectedWeight === 'oneKg') {
      calculated = item.price.oneKg || (item.price.halfKg ? item.price.halfKg * 1.8 : 850);
    } else {
      // custom larger weight factor
      const factor = WEIGHT_MULTIPLIERS[customWeightMultiplier];
      const base1Kg = item.price.oneKg || (item.price.halfKg ? item.price.halfKg * 1.8 : 850);
      calculated = base1Kg * factor;
    }

    // eggless has a minor surcharge if the cake isn't default eggless, or we keep it free for loyalty!
    // Let's keep it +₹30 for custom ingredients
    if (isEggless && !item.isEgglessAvailable) {
      calculated += 50;
    }

    return calculated;
  })();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Map mock item for Completely custom cake
    const finalCakeItem: CakeItem = item || {
      id: 'completely-custom',
      name: customFlavorName ? `Custom Flavor: ${customFlavorName}` : 'Custom Handcrafted Masterpiece',
      category: 'special',
      price: {oneKg: 850},
      description: specialDetails || 'A completely customized creation crafted on personal direction.',
      image: '✨',
      tags: ['Personalized Design', 'Specially Handcrafted'],
      isEgglessAvailable: isEggless,
    };

    onAddToCart({
      item: finalCakeItem,
      quantity: 1,
      selectedWeight,
      customWeightVal: selectedWeight === 'custom' 
        ? (WEIGHT_MULTIPLIERS[customWeightMultiplier as keyof typeof WEIGHT_MULTIPLIERS] || 1.5)
        : undefined,
      isEggless,
      creamLevel,
      noAddedColors,
      messageOnCake: textOnCake,
      specialInstructions: `${specialDetails}. Store Pickup Requested. Date: ${deliveryDate || 'ASAP'}, Time: ${deliveryTime}.`,
      price: computedPrice
    });
  };

  return (
    <div id="customizer-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        id="customizer-modal-content"
        className="relative bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-amber-100 flex flex-col my-8 animate-fade-in"
      >
        
        {/* Header decoration */}
        <div className="bg-amber-800 text-amber-50 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {item ? `Customize ${item.name}` : 'Design Your Custom Masterpiece'}
              </h3>
              <p className="font-sans text-[11px] text-amber-200/90 leading-none mt-1">
                Homemade with healthy, premium kitchen ingredients by Manju
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-amber-700/60 rounded-full transition-colors text-amber-100 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customizer fields scroll container */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh] sm:max-h-[68vh] space-y-6">
          
          {/* Section: Completely Custom Title Field if no predefined item */}
          {!item && (
            <div className="space-y-2 bg-amber-50 p-4 rounded-xl border border-amber-100">
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider">
                What base flavor would you like to build? *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Honey Buttercomb Cake, White Forest with Strawberries..."
                value={customFlavorName}
                onChange={(e) => setCustomFlavorName(e.target.value)}
                className="w-full p-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 text-sm text-amber-950 outline-none"
              />
              <span className="text-[10px] text-amber-900/60 font-sans block">
                Describe it fully in the instructions below! Manju will read your notes to prepare.
              </span>
            </div>
          )}

          {/* Section: Weight Picker (not available for portioned Fixed mini prices) */}
          {(!item || item.price.fixed === undefined) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  1. Choose Cake weight / size
                </label>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  {selectedWeight === 'halfKg' ? '½ Kilogram (Serves 4-6)' : selectedWeight === 'oneKg' ? '1 Kilogram (Serves 8-12)' : `Larger sized Cake`}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(!item || item.price.halfKg !== undefined) && (
                  <button
                    type="button"
                    onClick={() => setSelectedWeight('halfKg')}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedWeight === 'halfKg'
                        ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold scale-[1.02]'
                        : 'border-amber-100 hover:border-amber-200 text-amber-950/70'
                    }`}
                  >
                    <span className="text-sm">🍰 ½ Kg</span>
                    <span className="text-[10px] text-amber-900/60 mt-1 font-medium">Standard party</span>
                  </button>
                )}
                {(!item || item.price.oneKg !== undefined) && (
                  <button
                    type="button"
                    onClick={() => setSelectedWeight('oneKg')}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedWeight === 'oneKg'
                        ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold scale-[1.02]'
                        : 'border-amber-100 hover:border-amber-200 text-amber-950/70'
                    }`}
                  >
                    <span className="text-sm">🎂 1 Kg</span>
                    <span className="text-[10px] text-amber-900/60 mt-1 font-medium">Large gathering</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedWeight('custom')}
                  className={`p-3 border rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selectedWeight === 'custom'
                      ? 'border-amber-805 bg-amber-50 text-amber-905 font-bold scale-[1.02]'
                      : 'border-amber-100 hover:border-amber-200 text-amber-950/70'
                  }`}
                >
                  <span className="text-sm">✨ Larger Size</span>
                  <span className="text-[10px] text-amber-900/60 mt-1 font-medium">Multi-tier choice</span>
                </button>
              </div>

              {/* Sub weight selector if Custom represents larger cake size */}
              {selectedWeight === 'custom' && (
                <div className="bg-amber-50/55 border border-amber-100 p-3 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                  <span className="text-xs font-semibold text-amber-900 font-sans">Select Weight Tier:</span>
                  <div className="flex gap-1 bg-white p-1 rounded-lg border border-amber-200">
                    {['1.5kg', '2kg', '2.5kg', '3kg+'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setCustomWeightMultiplier(tier as any)}
                        className={`px-3 py-1 text-xs font-bold rounded-md cursor-pointer ${
                          customWeightMultiplier === tier
                            ? 'bg-amber-800 text-amber-50'
                            : 'text-amber-900/70 hover:text-amber-900'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Section: Bakes Custom Ingredients */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
              2. Custom Healthy Baking Settings
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Eggless Option Checkbox */}
              <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="eggless-choice"
                  checked={isEggless}
                  onChange={(e) => setIsEggless(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 bg-white border-amber-300 rounded-sm focus:ring-emerald-500 mt-0.5 cursor-pointer"
                />
                <div className="leading-tight">
                  <label htmlFor="eggless-choice" className="text-xs sm:text-sm font-bold text-amber-950 cursor-pointer flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-700 rounded-full inline-block" />
                    100% Eggless (Pure Veg)
                  </label>
                  <p className="text-[10px] text-amber-900/60 mt-0.5 leading-normal">
                    Manju uses organic yogurt and dense pure purees in substitute. Incredibly spongy!
                  </p>
                </div>
              </div>

              {/* No Artificial Colors Checkbox */}
              <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="col-safety"
                  checked={noAddedColors}
                  onChange={(e) => setNoAddedColors(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 bg-white border-amber-300 rounded-sm focus:ring-emerald-500 mt-0.5 cursor-pointer"
                />
                <div className="leading-tight">
                  <label htmlFor="col-safety" className="text-xs sm:text-sm font-bold text-amber-950 cursor-pointer">
                    🌱 No Artificial Food Colors
                  </label>
                  <p className="text-[10px] text-amber-900/60 mt-0.5 leading-normal">
                    Keep the glaze safe for children. Uses natural fruit colors if coloring is needed. Highly recommended by school teachers!
                  </p>
                </div>
              </div>

            </div>

            {/* Cream level selection */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-950/70 block">Cream Density Option:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'less', label: '🍧 Less Cream', desc: 'Light coating, healthier bakes' },
                  { value: 'normal', label: '🍰 Normal Cream', desc: 'Standard decorative layering' },
                  { value: 'extra', label: '🧁 Extra Cream', desc: 'Velvety rich thick covering' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCreamLevel(opt.value as any)}
                    className={`p-2.5 border rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      creamLevel === opt.value
                        ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold'
                        : 'border-amber-100 hover:border-amber-200 text-amber-950/70'
                    }`}
                  >
                    <span className="text-xs font-bold">{opt.label}</span>
                    <span className="text-[9px] text-amber-900/50 mt-1 leading-normal hidden sm:inline-block">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Section: Custom text on cake */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
              3. Text to write on the cake bowl
            </label>
            <input
              type="text"
              maxLength={40}
              placeholder="e.g., Happy 5th Birthday Adhav! (Max 40 chars)"
              value={textOnCake}
              onChange={(e) => setTextOnCake(e.target.value)}
              className="w-full p-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 text-sm text-amber-950 outline-none placeholder:text-amber-900/30"
            />
          </div>

          {/* Special instructions / design specifications */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                4. Theme style & Special Instructions
              </label>
              <span className="text-[10px] text-amber-900/50">Describe themes or custom additions</span>
            </div>
            <textarea
              rows={3}
              placeholder="e.g., Make a butterfly decorative theme with strawberries. I will pick up near Sri Nidhi store on Kanhangad limits..."
              value={specialDetails}
              onChange={(e) => setSpecialDetails(e.target.value)}
              className="w-full p-2.5 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 text-sm text-amber-950 outline-none placeholder:text-amber-900/30 font-sans"
            />
          </div>

          {/* Section: Takeaway Pickup Scheduler */}
          <div className="space-y-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100/70">
            <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
              5. Pickup Schedule
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pickup Mode Status */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-950/70 block">Handover Type:</span>
                <div className="p-3 bg-white rounded-lg border border-amber-200">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    🏪 Store Takeaway / Self-Pickup only
                  </span>
                </div>
                <span className="text-[9px] text-amber-900/50 block">
                  Collection from Manju, Sri Nidhi, Nittadukkam, Kanhangad. Home delivery is not supported.
                </span>
              </div>

              {/* Date & Time slots */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-950/70 block">Target Pickup Time:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-2 bg-white border border-amber-200 rounded-lg text-xs outline-none"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full p-2 bg-white border border-amber-200 rounded-lg text-xs outline-none"
                    />
                  </div>
                </div>
                <span className="text-[9px] text-rose-800 font-bold block">
                  ⚠️ Please order at least 1 day in advance for custom shapes!
                </span>
              </div>

            </div>

          </div>

        </form>

        {/* Modal Pricing summary and Footer */}
        <div className="bg-amber-50 p-5 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-sans text-[10px] text-amber-900/50 font-bold uppercase tracking-wider">Estimated Total Price:</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-serif text-2xl font-extrabold text-amber-900">
                ₹{computedPrice}
              </span>
              <span className="font-sans text-xs text-amber-900/50">
                (includes custom packaging)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 border border-amber-250 text-amber-905 hover:bg-amber-100 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="modal-add-to-cart-btn"
              type="button"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-50 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <span>Add Custom Bakes</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
