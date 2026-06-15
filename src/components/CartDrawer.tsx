import { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Copy, ClipboardCheck, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('16:00');

  const [copyFeedback, setCopyFeedback] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Compile standard clear WhatsApp text message
  const compileWhatsAppMessage = () => {
    let text = `*🍰 CAKERY ORDER INQUIRE - Homemade Bakes by Manju*\n`;
    text += `===================================\n\n`;
    text += `Hello Manju, I placed an order inquiry through the website. Here are my selected items:\n\n`;

    cart.forEach((item, index) => {
      const weightLabel = item.selectedWeight === 'halfKg' 
        ? '½ Kg' 
        : item.selectedWeight === 'oneKg' 
        ? '1 Kg' 
        : `${item.customWeightVal || 1.5} Kg (Custom weight)`;

      text += `${index + 1}. *${item.item.name}* (Qty: ${item.quantity})\n`;
      text += `   • Size/Weight: ${weightLabel}\n`;
      text += `   • Pure Eggless: ${item.isEggless ? '✅ Yes' : '❌ No'}\n`;
      text += `   • Cream Density: ${item.creamLevel === 'less' ? '🍧 Less Cream' : item.creamLevel === 'normal' ? '🍰 Normal' : '🧁 Extra rich'}\n`;
      text += `   • No Added Coloring: ${item.noAddedColors ? '🌱 Yes (Kid-Safe)' : '🎨 Standard colorful frosting'}\n`;
      if (item.messageOnCake) {
        text += `   • Text on Cake: "${item.messageOnCake}"\n`;
      }
      if (item.specialInstructions) {
        text += `   • Instructions: ${item.specialInstructions}\n`;
      }
      text += `   • Estimated Price: ₹${item.price * item.quantity}\n\n`;
    });

    text += `===================================\n`;
    text += `💵 *ESTIMATED TOTAL AMOUNT:* ₹${totalAmount}\n`;
    text += `===================================\n\n`;

    text += `👤 *CUSTOMER INFORMATION AND LOGISTICS:*\n`;
    text += `• Name: ${userName || 'Not Specified'}\n`;
    text += `• Contact Phone: ${userPhone || 'Not Specified'}\n`;
    text += `• Handover Preference: 🏪 Store Pickup (Takeaway only)\n`;
    text += `• target Date/Time: ${scheduleDate || 'ASAP'} at ${scheduleTime}\n`;

    text += `\n-----------------------------------\n`;
    text += `Please check this bakes availability and let me know. Thanks!`;

    return text;
  };

  const handleLaunchWhatsApp = () => {
    if (!userName.trim() || !userPhone.trim()) {
      alert('Please fill out your Name and Contact Phone for pickup details!');
      return;
    }

    const compiledText = compileWhatsAppMessage();
    const encodedText = encodeURIComponent(compiledText);
    const targetNumber = '918301991822'; // Manju's true Kanhangad WhatsApp
    const waUrl = `https://wa.me/${targetNumber}?text=${encodedText}`;
    
    window.open(waUrl, '_blank');
  };

  const handleCopySummary = () => {
    if (!userName.trim()) {
      alert('Please enter your Name before compiling!');
      return;
    }
    const compiledText = compileWhatsAppMessage();
    navigator.clipboard.writeText(compiledText).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3000);
    });
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 flex justify-end bg-amber-950/40 backdrop-blur-xs">
      
      {/* Drawer Body container */}
      <div 
        id="cart-drawer-body"
        className="relative bg-amber-50/95 w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-amber-100 animate-slide-left overflow-hidden"
      >
        
        {/* Drawer Header */}
        <div className="bg-amber-800 text-amber-50 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛍️</span>
            <div>
              <h3 className="font-serif text-lg font-bold">Your Dessert Cart</h3>
              <p className="font-sans text-[10px] text-amber-100/60 font-medium tracking-wide">
                Direct Inquiry to Homemade Bakes by Manju
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

        {/* Drawer Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Cart items list */}
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="text-5xl block animate-pulse">🧁</span>
              <h4 className="font-serif text-base font-semibold text-amber-950">Your cart is empty</h4>
              <p className="font-sans text-xs text-amber-900/60 max-w-xs mx-auto">
                Head to the Menu Catalogue, choose weights and custom toppings to load up.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center justify-center gap-1 mx-auto"
              >
                <span>Browse catalog now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold text-amber-900/50 uppercase tracking-widest">Selected Items ({cart.length})</span>
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Items</span>
                </button>
              </div>

              {/* Stack of item cards */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemWeightLabel = item.selectedWeight === 'halfKg' 
                    ? '½ Kg' 
                    : item.selectedWeight === 'oneKg' 
                    ? '1 Kg' 
                    : `${item.customWeightVal || 1.5} Kg`;

                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-amber-100 rounded-xl p-3.5 flex items-start gap-3 justify-between"
                    >
                      <div className="text-2xl pt-1">{item.item.image}</div>
                      
                      {/* item text summary specs */}
                      <div className="flex-1 min-w-0 font-sans">
                        <h4 className="text-xs sm:text-sm font-bold text-amber-950 truncate">
                          {item.item.name}
                        </h4>
                        
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                            {itemWeightLabel}
                          </span>
                          {item.isEggless && (
                            <span className="bg-emerald-100 text-emerald-900 text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                              Veg Eggless
                            </span>
                          )}
                          <span className="bg-rose-50 text-rose-800 text-[9px] font-semibold px-1.5 py-0.5 rounded leading-none">
                            {item.creamLevel} cream
                          </span>
                        </div>

                        {item.messageOnCake && (
                          <p className="text-[10px] text-amber-900/60 leading-none mt-2 italic truncate">
                            Writing on: "{item.messageOnCake}"
                          </p>
                        )}
                      </div>

                      {/* item count selectors and individual rate sum */}
                      <div className="flex flex-col items-end justify-between self-stretch shrink-0 font-sans">
                        <span className="text-xs font-bold text-amber-950">
                          ₹{item.price * item.quantity}
                        </span>
                        
                        {/* Incrementor node */}
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg p-0.5 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-amber-100 rounded text-amber-900 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5 text-amber-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-amber-100 rounded text-amber-900 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* Checkout delivery and address collection form */}
          {cart.length > 0 && (
            <div className="space-y-4 border-t border-amber-100 pt-4 font-sans">
              <span className="text-xs font-bold text-amber-900/50 uppercase tracking-widest block">Customer Logistics</span>
              
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-amber-950 uppercase tracking-wider block">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Lakshmi Kutty"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-2 bg-amber-50 text-xs text-amber-950 rounded-lg border border-amber-200 outline-none"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-amber-950 uppercase tracking-wider block">Contact Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., +91 95678 xxxxx"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full p-2 bg-amber-50 text-xs text-amber-950 rounded-lg border border-amber-200 outline-none"
                  />
                </div>

                {/* Pickup-only informational message */}
                <div className="p-3 bg-[#F5E6DA] border border-[#3D2B1F]/10 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#A0522D] uppercase tracking-wider block">Handover Type</span>
                  <div className="text-xs text-[#3D2B1F] font-semibold flex items-center gap-1.5">
                    <span>🏪 Store Pickup / Takeaway Only</span>
                  </div>
                  <p className="text-[10px] text-[#3D2B1F]/70 leading-relaxed">
                    Orders are prepared fresh. Please coordinate self-pickup from our home kitchen in Kanhangad. Delivery is not available.
                  </p>
                </div>

                {/* Date slots and scheduler */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-950/60 block">DATE TARGET</span>
                    <input
                      type="date"
                      required
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full p-1.5 bg-amber-50 border border-amber-200 text-xs rounded-md text-amber-950"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-950/60 block">TIME TARGET</span>
                    <input
                      type="time"
                      required
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full p-1.5 bg-amber-50 border border-amber-200 text-xs rounded-md text-amber-950"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Drawer footer layout displaying totals and compilation triggers */}
        <div className="bg-white p-5 border-t border-amber-150 space-y-3 shadow-inner">
          
          <div className="flex items-center justify-between font-serif">
            <span className="text-sm font-bold text-amber-950">Subtotal Estimated Price:</span>
            <span className="text-xl font-extrabold text-amber-900">₹{totalAmount}</span>
          </div>

          <p className="font-sans text-[10px] text-amber-800/70 text-center flex items-center justify-center gap-1 bg-amber-50 py-2 rounded-lg leading-normal px-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Manju will review ingredients & availability on WhatsApp. No automated chatbot!</span>
          </p>

          <div className="grid grid-cols-12 gap-2">
            <button
              onClick={handleCopySummary}
              disabled={cart.length === 0}
              className="col-span-3 p-3 border border-amber-250 hover:bg-amber-50 text-amber-950 font-bold rounded-xl flex items-center justify-center gap-1 text-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors"
              title="Copy formatted text to clipboard"
            >
              {copyFeedback ? (
                <ClipboardCheck className="w-5 h-5 text-emerald-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>

            <button
              id="checkout-whatsapp-btn"
              onClick={handleLaunchWhatsApp}
              disabled={cart.length === 0}
              className="col-span-9 p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Checkout via WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
