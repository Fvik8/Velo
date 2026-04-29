import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ProductGrid } from './components/sections/ProductGrid';
import { RecipeCarousel } from './components/sections/RecipeCarousel';
import { StoreLocator } from './components/sections/StoreLocator';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

import { CartProvider } from './lib/CartContext';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-forest z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <div className="container mx-auto">
          <Hero />
          <ProductGrid />
        </div>
        
        <RecipeCarousel />
        
        <div className="container mx-auto">
          <StoreLocator />
        </div>
        
        {/* Newsletter Section - Natural Tones Style */}
        <section className="py-32 px-8">
          <div className="max-w-4xl mx-auto glass rounded-[60px] p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-peach via-sage to-peach" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">Join the Velo Society.</h2>
              <p className="text-xl text-forest/60 mb-12 max-w-lg mx-auto leading-relaxed">
                Receive exclusive invites to botanical pop-ups and seasonal flavour drops.
              </p>
              <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
                <input 
                  type="email" 
                  placeholder="The velvet email..."
                  className="flex-grow h-14 px-8 rounded-full bg-white/60 border border-forest/10 focus:outline-none focus:ring-1 focus:ring-peach transition-all"
                />
                <Button className="h-14 px-10 rounded-full btn-liquid tracking-widest text-[10px] uppercase">
                  <span>Subscribe</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-24 px-8 border-t border-forest/10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
          <div className="flex gap-10 text-[10px] uppercase font-bold tracking-widest opacity-50">
            <a href="#" className="hover:text-peach transition-colors">Instagram</a>
            <a href="#" className="hover:text-peach transition-colors">Pinterest</a>
            <a href="#" className="hover:text-peach transition-colors">Journal</a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 text-xs font-medium">
            <span className="opacity-60 uppercase tracking-tighter">Find us in 240+ locations</span>
            <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-forest/10 shadow-sm transition-all hover:shadow-md cursor-pointer group">
               <MapPin className="w-3 h-3 text-peach transition-transform group-hover:scale-110" />
               <span className="text-[10px] uppercase tracking-tighter font-bold">Enter Zip Code</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-forest/5 text-[10px] uppercase tracking-[0.3em] text-center opacity-30 font-bold">
           &copy; 2024 VELO BOTANICALS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
    </CartProvider>
  );
}
