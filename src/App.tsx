import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CustomizerModal from './components/CustomizerModal';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CakeItem, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedItemToCustomize, setSelectedItemToCustomize] = useState<CakeItem | null>(null);

  // Read cart state on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cakery_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }
  }, []);

  // Save cart changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('cakery_cart', JSON.stringify(updatedCart));
  };

  // Scroll Helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger customizer modal flow
  const handleOpenCustomizer = (item: CakeItem | null) => {
    setSelectedItemToCustomize(item);
    setIsCustomizerOpen(true);
  };

  // Add customized item to cart
  const handleAddCustomizedToCart = (customItem: Omit<CartItem, 'id'>) => {
    // Generate a unique identifier based on item ID and exact choices so different setups stay in different lines
    const optionFingerprint = `${customItem.item.id}-${customItem.selectedWeight}-${customItem.isEggless}-${customItem.creamLevel}-${customItem.noAddedColors}-${customItem.messageOnCake}`;
    
    const existingIndex = cart.findIndex((i) => `${i.item.id}-${i.selectedWeight}-${i.isEggless}-${i.creamLevel}-${i.noAddedColors}-${i.messageOnCake}` === optionFingerprint);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...customItem, id: `cart-${Date.now()}` }];
    }

    saveCartToStorage(updatedCart);
    setIsCustomizerOpen(false);
    setIsCartOpen(true); // Open cart to show user their addition
  };

  // Quick Add Standard cake with default preferences
  const handleQuickAdd = (item: CakeItem, weight: 'halfKg' | 'oneKg' | 'fixed', isEggless: boolean) => {
    // Default weights
    let priceVal = 0;
    if (weight === 'fixed') {
      priceVal = item.price.fixed || 0;
    } else if (weight === 'halfKg') {
      priceVal = item.price.halfKg || 450;
    } else {
      priceVal = item.price.oneKg || 850;
    }

    const defaultCartItem: Omit<CartItem, 'id'> = {
      item,
      quantity: 1,
      selectedWeight: weight,
      isEggless: isEggless, // respects standard veg tag default
      creamLevel: 'normal',
      noAddedColors: item.tags.includes('No Added Colors'),
      messageOnCake: '',
      specialInstructions: 'Quick standard order from web menu.',
      price: priceVal,
    };

    handleAddCustomizedToCart(defaultCartItem);
  };

  // Quantity updates
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === cartId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCartToStorage(updated);
  };

  // Remove completely
  const handleRemoveItem = (cartId: string) => {
    const updated = cart.filter((item) => item.id !== cartId);
    saveCartToStorage(updated);
  };

  // Clear cart bakes
  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  return (
    <div className="min-h-screen bg-amber-50/20 text-amber-950 antialiased selection:bg-amber-800 selection:text-amber-50">
      
      {/* Header element */}
      <Header
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Hero Workshop */}
      <Hero
        onBrowseMenu={() => handleScrollToSection('menu')}
        onOpenCustomizer={() => handleOpenCustomizer(null)} // passing null starts Completely custom bakes
      />

      {/* Main Catalog Menu */}
      <MenuSection
        onSelectItemToCustomize={(item) => handleOpenCustomizer(item)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Customizer promotional / quick design CTA block */}
      <div id="customizer-promo" className="py-16 bg-gradient-to-tr from-amber-900 to-rose-950 text-white select-none">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-sm font-bold uppercase tracking-widest text-amber-300">Unleash Your Senses</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight">
            Can't find your dream flavor in the menu?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-amber-100/80 max-w-xl mx-auto leading-relaxed">
            Specify customized shapes, multilayer sponges, sugar levels, or complex themes. 
            Describe your inspiration and Manju will craft it perfectly from scratch!
          </p>
          <button
            onClick={() => handleOpenCustomizer(null)}
            className="px-8 py-3 bg-white text-amber-950 hover:bg-amber-100 font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
          >
            Launch Custom Cake Builder
          </button>
        </div>
      </div>

      {/* About Hygiene Store Info */}
      <AboutSection onBrowseMenu={() => handleScrollToSection('menu')} />

      {/* Reviews feed section */}
      <ReviewsSection />

      {/* Contacts footer and map details */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* CUSTOMIZER PANEL OVERLAY (Conditional) */}
      {isCustomizerOpen && (
        <CustomizerModal
          item={selectedItemToCustomize}
          onClose={() => setIsCustomizerOpen(false)}
          onAddToCart={handleAddCustomizedToCart}
        />
      )}

      {/* SHOPPING CART DRAWER (Conditional) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
