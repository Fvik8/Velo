import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const sentence = "Guilt-free indulgence, plant-based soul";

const ContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const LetterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
};

export const Hero = () => {
  return (
    <section className="min-height-[100vh] flex flex-col md:grid md:grid-cols-2 pt-32 px-8 overflow-hidden">
      <div className="flex flex-col justify-center max-w-xl pr-12 pb-12 md:pb-0">
        <motion.div
          variants={ContainerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <span className="text-sage font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Purely Plant-Based</span>
          <h1 className="text-6xl md:text-7xl leading-[1.0] font-bold tracking-tight mb-8">
            Guilt-free indulgence, <br />
            <i className="font-normal italic">plant-based soul.</i>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg text-forest/80 mb-12 max-w-md leading-relaxed"
        >
          Velvety, artisan frozen yoghurt crafted from small-batch oat milk and sun-ripened seasonal fruits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex space-x-6 items-center"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              className="rounded-full h-14 btn-liquid group px-10 border-none"
              onClick={() => console.log('Navigating to flavors...')}
            >
              <span>Explore Flavors</span>
            </Button>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full border border-forest/20 flex items-center justify-center hover:bg-forest hover:text-cream transition-all cursor-pointer"
            onClick={() => window.location.href = '#locations'}
          >
             <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="relative flex justify-center items-center"
      >
        <div className="absolute w-full h-full bg-sage/20 rounded-full blur-3xl opacity-50 scale-75" />
        <motion.div
          animate={{ 
            rotate: [3, -3, 3]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-full max-w-[500px] h-full aspect-[1/1.1] relative z-10"
        >
          <div className="absolute inset-0 bg-white shadow-2xl rounded-[60px] transform rotate-2 -z-10" />
          <img 
            src="https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?q=80&w=2000&auto=format&fit=crop" 
            alt="Velo Luxury Froyo Swirl"
            className="w-full h-full object-cover rounded-[60px] shadow-xl grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-10 left-10 text-forest p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20">
            <h3 className="text-2xl font-bold">Classic Oat</h3>
            <p className="text-sm italic opacity-80">Smooth & Creamy Ritual</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
