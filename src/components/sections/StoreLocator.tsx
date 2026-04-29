import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const StoreLocator = () => {
  return (
    <section id="locations" className="py-32 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-forest/60 block mb-6 px-1">Presence</span>
            <h2 className="text-6xl md:text-7xl leading-[0.9] font-medium tracking-tight mb-12 italic font-serif">
              Find VELO near you.
            </h2>
            <p className="text-xl text-forest/60 mb-12 max-w-md leading-relaxed font-light">
              Available in select high-end boutiques and artisanal markets across the globe. 
              Find your nearest velvet ritual.
            </p>

            <div className="relative max-w-md group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/40 group-focus-within:text-peach transition-colors" />
              <Input 
                placeholder="City, ZIP or Neighborhood" 
                className="h-16 pl-14 pr-32 rounded-full border-forest/10 focus-visible:ring-peach focus-visible:border-transparent bg-white/50 text-lg shadow-sm"
              />
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-full btn-liquid border-none"
                  onClick={() => alert('Searching for your nearest VELO ritual...')}
                >
                  <span>Search</span>
                </Button>
              </motion.div>
            </div>

            <div className="mt-16 flex flex-col space-y-8">
               <div className="flex items-start space-x-6 p-6 rounded-3xl hover:bg-white/50 transition-colors cursor-pointer border border-transparent hover:border-forest/5">
                 <div className="w-12 h-12 rounded-full bg-peach/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-peach w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-serif text-2xl mb-1">Chelsea Market Garden</h4>
                    <p className="text-forest/60 text-sm">75 9th Ave, New York, NY 10011</p>
                    <span className="text-[10px] uppercase tracking-widest text-peach mt-2 block font-bold">Open until 9 PM</span>
                 </div>
               </div>
               
               <div className="flex items-start space-x-6 p-6 rounded-3xl hover:bg-white/50 transition-colors cursor-pointer border border-transparent hover:border-forest/5">
                 <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                    <Navigation className="text-sage w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-serif text-2xl mb-1">Harrods Food Hall</h4>
                    <p className="text-forest/60 text-sm">87-135 Brompton Rd, London SW1X 7XL</p>
                    <span className="text-[10px] uppercase tracking-widest text-sage mt-2 block font-bold">Bespoke Collection Available</span>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
           className="relative aspect-[4/5] rounded-[100px] overflow-hidden shadow-3xl bg-peach/10 p-4 border border-forest/5"
        >
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop" 
            alt="Stylized Map"
            className="w-full h-full object-cover filter contrast-[0.8] brightness-[1.1] rounded-[80px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-forest/5 pointer-events-none" />
          
          {/* Faux map pins */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/4 left-1/3 w-4 h-4 bg-peach rounded-full shadow-[0_0_20px_rgba(232,168,124,0.8)]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1 }}
            className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-sage rounded-full shadow-[0_0_20px_rgba(181,207,183,0.8)]"
          />
        </motion.div>
      </div>
    </section>
  );
};
