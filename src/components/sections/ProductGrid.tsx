import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/types';
import { Button } from '../ui/button';

const products: Product[] = [
  {
    id: 1,
    title: "Madagascar Vanilla",
    tagline: "The Floral One",
    description: "The classic smoothness of artisanal oat milk with hand-crunched honeycomb.",
    image: "https://images.unsplash.com/photo-1516559174662-821197701e63?q=80&w=1000&auto=format&fit=crop",
    color: "bg-sage text-white",
    size: "md:col-span-2 md:row-span-2",
    price: 8.50,
  },
  {
    id: 2,
    title: "Sun-Kissed Peach",
    tagline: "The Summer One",
    description: "Botanical earthiness with a hint of morning dew.",
    image: "https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?q=80&w=1000&auto=format&fit=crop",
    color: "bg-peach text-forest",
    size: "md:col-span-1 md:row-span-1",
    price: 9.00,
  },
  {
    id: 3,
    title: "Midnight Cacao",
    tagline: "The Dark One",
    description: "Deep, dark, and mysteriously velvety.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop",
    color: "bg-white border border-forest/10 text-forest",
    size: "md:col-span-1 md:row-span-1",
    price: 9.50,
  },
  {
    id: 4,
    title: "Midnight Acai",
    tagline: "The Power One",
    description: "Rich Amazonian acai berry infusion for a deep, purple swirl.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28be0?q=80&w=1000&auto=format&fit=crop",
    color: "bg-forest text-cream",
    size: "md:col-span-1 md:row-span-1",
    price: 10.00,
  },
  {
    id: 5,
    title: "Tropical Mango",
    tagline: "The Exotic One",
    description: "Sun-drenched Alphonso mangoes with a touch of lime zest.",
    image: "https://images.unsplash.com/photo-1591154706825-43cbc20256ee?q=80&w=1000&auto=format&fit=crop",
    color: "bg-peach/30 text-forest",
    size: "md:col-span-1 md:row-span-1",
    price: 9.00,
  },
  {
    id: 6,
    title: "Pistachio Dream",
    tagline: "The Nutty One",
    description: "Roasted Sicilian pistachios with a hint of sea salt.",
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1000&auto=format&fit=crop",
    color: "bg-sage/40 text-forest",
    size: "md:col-span-1 md:row-span-1",
    price: 11.00,
  },
];

export const ProductGrid = () => {
  const { addToCart, cart } = useCart();
  const [addedId, setAddedId] = React.useState<number | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section id="shop" className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
        <div className="max-w-xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] font-semibold text-forest/40 block mb-4"
          >
            Curated Flavors
          </motion.span>
          <h2 className="text-5xl md:text-6xl tracking-tight leading-tight">
            Our Seasonal Collection
          </h2>
        </div>
        <p className="text-lg text-forest/60 max-w-xs font-light leading-relaxed">
          Bespoke flavours inspired by the transition of seasons and botanical gardens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className={cn(
              "group relative overflow-hidden rounded-[40px] cursor-pointer aspect-square md:aspect-auto h-[400px]",
              product.size,
              product.color
            )}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute top-8 right-8 flex space-x-2">
               <motion.button 
                 whileTap={{ scale: 0.9 }}
                 onClick={(e) => handleAddToCart(e, product)}
                 className="w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 hover:bg-forest hover:text-cream"
               >
                  {addedId === product.id ? <Check className="w-5 h-5 text-green-500" /> : <Plus className="w-5 h-5" />}
               </motion.button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex justify-between items-end mb-2">
                   <h3 className="text-3xl font-bold">{product.title}</h3>
                   <span className="text-xl font-serif text-forest/60">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-xs uppercase tracking-widest opacity-70 font-semibold mb-4">
                  {product.tagline}
                </p>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-sm leading-relaxed max-w-[280px] opacity-80 mb-6">
                      {product.description}
                    </p>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
