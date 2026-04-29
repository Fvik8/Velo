import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VeloLogo } from '../VeloLogo';
import { ShoppingBag, Menu, X, Trash2, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';

export const Navbar = () => {
  const { cart, removeFromCart, addToCart, totalItems, totalPrice } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '#shop' },
    { name: 'Recipes', href: '#recipes' },
    { name: 'Locations', href: '#locations' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl px-8 py-4 rounded-full transition-all duration-500 ease-in-out",
          scrolled ? "glass shadow-xl py-3" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <VeloLogo className="h-8 w-auto text-forest" />
            </a>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  className="text-sm font-semibold uppercase tracking-wider text-forest hover:text-peach transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setCartOpen(true)}
              className="hidden md:flex text-xs font-bold border-2 border-forest px-6 py-1.5 rounded-full bg-transparent hover:bg-forest hover:text-cream transition-all uppercase tracking-tighter cursor-pointer"
            >
              Cart ({totalItems})
            </Button>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button className="btn-liquid px-8 py-2 border-none">
                <span>Join Club</span>
              </Button>
            </motion.div>
            <button 
              className="md:hidden text-forest p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 glass rounded-3xl p-8 flex flex-col space-y-6 md:hidden shadow-2xl"
            >
              {navLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-serif tracking-wide"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-forest/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[70] shadow-2xl p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-serif italic">Your Ritual</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-forest/5 rounded-full transition-colors">
                  <X />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto pr-4 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                    <ShoppingBag className="w-16 h-16" />
                    <div>
                      <p className="text-xl font-serif">Your cart is empty.</p>
                      <p className="text-sm uppercase tracking-widest mt-2">Start your journey today.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-6 pb-6 border-b border-forest/5"
                      >
                        <div className={cn("w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0", item.color)}>
                          <img src={item.image} className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-serif text-lg leading-none mb-1">{item.title}</h3>
                          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-4">{item.tagline}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 border border-forest/10 rounded-full px-3 py-1">
                              <button onClick={() => removeFromCart(item.id)} className="p-1 hover:text-peach transition-colors">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold">{item.quantity}</span>
                              <button onClick={() => addToCart(item)} className="p-1 hover:text-peach transition-colors">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-sm font-bold font-serif">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-forest/10 space-y-4">
                <div className="flex justify-between text-sm uppercase tracking-widest font-bold">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button 
                  disabled={cart.length === 0}
                  className="w-full h-16 rounded-full btn-liquid uppercase tracking-[0.2em] font-bold disabled:opacity-50"
                  onClick={() => alert('Proceeding to checkout...')}
                >
                  <span>Checkout</span>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
