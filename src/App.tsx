'import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// --- Types ---
interface Product {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Recipe {
  id: number;
  title: string;
  time: string;
  difficulty: string;
  image: string;
\ ingredients: string[];
  method: string[];
}

// --- Icons (Inline SVGs) ---
const Icons = {
  ShoppingBag: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Minus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
};

// --- Data ---
const PRODUCTS: Product[] = [
  { id: 1, title: "Madagascar Vanilla", tagline: "The Floral One", price: 8.5, color: "bg-[#B5CFB7]", image: "1.png", description: "The classic smoothness of artisanal oat milk." },
  { id: 2, title: "Sun-Kissed Peach", tagline: "The Summer One", price: 9.0, color: "bg-[#E8A87C]", image: "2.png", description: "Botanical earthiness with sun-ripened peach." },
  { id: 3, title: "Midnight Acai", tagline: "The Power One", price: 10.0, color: "bg-[#2D3A27]", image: "3.png", description: "Rich Amazonian acai berry infusion." },
  { id: 4, title: "Tropical Mango", tagline: "The Exotic One", price: 9.0, color: "bg-[#F8F2ED]", image: "4.png", description: "Sun-drenched Alphonso mangoes." },
  { id: 5, title: "Pistachio Dream", tagline: "The Nutty One", price: 11.0, color: "bg-[#B5CFB7]", image: "5.png", description: "Roasted Sicilian pistachios." },
  { id: 6, title: "Midnight Cacao", tagline: "The Dark One", price: 9.5, color: "bg-[#F8F2ED]", image: "6.png", description: "Deep and mysteriously velvety chocolate." }
];

  }
];






const RECIPES: Recipe[] = [
  {
    id: 1, title: "Sage & Honey Granola", time: "20 min", difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["1 cup VELO Vanilla", "2 cups Rolled Oats", "1/2 cup Wildflower Honey", "Fresh Sage", "Maldon Sea Salt"],
    method: ["Toast oats until nutty.", "Infuse honey with sage.", "Combine and freeze into chunks.", "Serve over VELO."]
  },
  {
    id: 2, title: "Botanical Berry Compote", time: "15 min", difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop",
    ingredients: ["VELO Peach", "250g Mixed Berries", "Rosemary", "Balsamic Splash", "30g Sugar"],
    method: ["Simmer berries with rosemary and sugar.", "Add balsamic for depth.", "Cool and drizzle over peach base."]
  }
];

// --- Sub-components ---
const Logo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 10L40 50L60 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="70" y="45" fill="currentColor" style={{ fontFamily: 'Playfair Display', fontSize: '40px', fontWeight: '700' }}>VELO</text>
  </svg>
);

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searching, setSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      alert('Finding the nearest VELO ritual for you...');
    }, 1500);
  };

  return (
    <div className="bg-[#F8F2ED] text-[#2D3A27] font-sans selection:bg-[#E8A87C] selection:text-[#F8F2ED]">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#2D3A27] z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-[70] w-[90%] max-w-7xl px-8 py-3 rounded-full transition-all duration-500 flex items-center justify-between ${scrolled ? 'bg-white/40 backdrop-blur-xl shadow-xl border border-white/20' : 'bg-transparent'}`}>
        <div className="flex items-center gap-12">
          <Logo className="h-8 w-auto" />
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-[#2D3A27]">
            {['Shop', 'Recipes', 'Locations'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#E8A87C] transition-colors">{item}</a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 border-2 border-[#2D3A27] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter hover:bg-[#2D3A27] hover:text-[#F8F2ED] transition-all cursor-pointer">
            Cart ({totalItems})
          </button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icons.Menu />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] z-[69] bg-white/80 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl flex flex-col gap-6 md:hidden">
            {['Shop', 'Recipes', 'Locations'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif italic text-center underline decoration-[#E8A87C]/30">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-8 container mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 lg:items-center gap-24">
          <div className="max-w-xl">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#B5CFB7] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">The Future of Froyo</motion.span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-10">
              {"Guilt-free indulgence, plant-based soul.".split(" ").map((word, i) => (
                <motion.span key={i} initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: i * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }} className="inline-block mr-4 italic last:font-normal last:not-italic">
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="text-xl opacity-70 mb-12 leading-relaxed max-w-md">Velvety, artisan frozen yoghurt crafted from small-batch oat milk and sun-ripened organic fruits.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-[#2D3A27] text-[#F8F2ED] rounded-full px-10 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-[#E8A87C] transition-all flex items-center gap-2 group cursor-pointer"
              >
                Discover Flavours <Icons.ArrowRight />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#B5CFB7]/20 rounded-[80px] blur-3xl transform -rotate-6 scale-90" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative bg-white p-4 rounded-[60px] shadow-2xl rotate-2">
              <img src="https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?q=80&w=2000&auto=format&fit=crop" className="rounded-[40px] grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt="Froyo Swirl" />
              <div className="absolute -bottom-10 -left-10 bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hidden md:block">
                <h4 className="text-2xl font-bold">Classic Oat</h4>
                <p className="text-sm italic opacity-60">Velvet Texture Ritual</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-32 px-8 container mx-auto">
        <div className="mb-24 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30">Our Collection</span>
            <h2 className="text-6xl italic mt-4 font-serif">Seasonal Swirls</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map(product => (
            <motion.div key={product.id} whileHover={{ y: -10 }} className={`${product.color} rounded-[40px] p-10 flex flex-col justify-between aspect-[1/1.2] relative group overflow-hidden border border-black/5`}>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-1">{product.title}</h3>
                <p className="text-xs font-black uppercase tracking-widest opacity-40">{product.tagline}</p>
              </div>
              <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply transition-transform duration-1000 group-hover:scale-110" alt={product.title} />
              <div className="relative z-10 flex justify-between items-end">
                <div className="text-2xl font-serif italic">${product.price.toFixed(2)}</div>
                <button onClick={() => addToCart(product)} className="w-14 h-14 bg-[#2D3A27] text-[#F8F2ED] rounded-full flex items-center justify-center hover:bg-[#E8A87C] transition-all transform active:scale-90 cursor-pointer">
                  <Icons.Plus />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="bg-[#2D3A27] text-[#F8F2ED] py-32 rounded-t-[100px]">
        <div className="container mx-auto px-8">
          <div className="mb-24 text-center md:text-left">
            <span className="text-[#B5CFB7] font-black uppercase tracking-[0.4em] text-[10px]">Culinarty</span>
            <h2 className="text-6xl italic mt-4 font-serif">Botanical Recipes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {RECIPES.map(recipe => (
              <div key={recipe.id} className="group cursor-pointer" onClick={() => setSelectedRecipe(recipe)}>
                <div className="aspect-video rounded-[40px] overflow-hidden mb-8 relative">
                  <img src={recipe.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={recipe.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{recipe.title}</h3>
                    <div className="flex gap-4 text-xs font-black uppercase tracking-widest opacity-40">
                      <span>{recipe.time}</span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#E8A87C] group-hover:border-transparent transition-all">
                    <Icons.ArrowRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Locator Section */}
      <section id="locations" className="py-32 px-8 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-7xl font-bold italic mb-10 font-serif leading-tight">Find VELO <br/>near you.</h2>
            <p className="text-xl opacity-60 mb-12 max-w-md">Available in select high-end boutiques and artisanal food halls across the globe.</p>
            <div className="flex gap-3 bg-white p-3 rounded-full border border-black/5 shadow-sm focus-within:shadow-md transition-all">
              <input type="text" placeholder="Enter City or ZIP..." className="flex-grow bg-transparent px-6 outline-none font-bold placeholder:opacity-20" />
              <button 
                onClick={handleSearch}
                disabled={searching}
                className="bg-[#2D3A27] text-[#F8F2ED] rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50 cursor-pointer"
              >
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>
            <div className="mt-16 space-y-10">
              {['Chelsea Market Gardon, NY', 'Harrods Food Hall, London'].map((loc, i) => (
                <div key={i} className="flex gap-6 items-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${i === 0 ? 'bg-[#E8A87C]/20 text-[#E8A87C]' : 'bg-[#B5CFB7]/20 text-[#B5CFB7]'}`}>
                    <Icons.MapPin />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold italic">{loc}</h4>
                    <p className="text-sm opacity-40 uppercase tracking-widest font-black">Open until 9:00 PM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#B5CFB7]/10 aspect-[4/5] rounded-[80px] border border-black/5 p-4 overflow-hidden relative rotate-2">
            <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover rounded-[60px] grayscale brightness-110 opacity-40" alt="Map" />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-1/4 left-1/3 w-6 h-6 bg-[#E8A87C] rounded-full shadow-[0_0_30px_rgba(232,168,124,0.8)] border-4 border-white" />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-[#B5CFB7] rounded-full shadow-[0_0_30px_rgba(181,207,183,0.8)] border-4 border-white" />
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-[#2D3A27]/20 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F8F2ED] shadow-2xl z-[201] p-12 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-4xl font-serif italic">Your Ritual</h2>
                <button onClick={() => setCartOpen(false)} className="p-3 hover:bg-black/5 rounded-full transition-colors cursor-pointer"><Icons.X /></button>
              </div>
              <div className="flex-grow overflow-y-auto space-y-10 pr-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-6 opacity-20">
                    <Icons.ShoppingBag />
                    <p className="text-xs uppercase tracking-[0.4em] font-black text-center">Your journey is empty.</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className={`w-24 h-24 rounded-3xl ${item.color} overflow-hidden shadow-inner flex-shrink-0`}>
                      <img src={item.image} className="w-full h-full object-cover mix-blend-multiply opacity-50" alt={item.title} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
                      <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-3">{item.tagline}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 border border-black/10 px-3 py-1 rounded-full">
                          <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-[#E8A87C]"><Icons.Minus /></button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-[#E8A87C]"><Icons.Plus /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#E8A87C] text-[10px] font-black uppercase tracking-widest border-b border-transparent hover:border-[#E8A87C] transition-all">Remove</button>
                      </div>
                    </div>
                    <div className="text-lg font-serif italic whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="pt-12 border-t border-black/5 mt-12 gap-6 flex flex-col">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span>Ritual Total</span>
                  <span className="text-3xl italic font-serif">${totalPrice.toFixed(2)}</span>
                </div>
                <button disabled={cart.length === 0} className="w-full bg-[#2D3A27] text-[#F8F2ED] py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-[#E8A87C] transition-all transform active:scale-95 disabled:opacity-30 cursor-pointer">Confirm Order</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRecipe(null)} className="fixed inset-0 bg-[#2D3A27]/60 backdrop-blur-md z-[300]" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="fixed inset-6 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-5xl lg:max-h-[90vh] bg-[#F8F2ED] rounded-[60px] z-[301] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
              <button onClick={() => setSelectedRecipe(null)} className="absolute top-8 right-8 p-3 bg-white hover:bg-black/5 rounded-full z-10 transition-colors shadow-sm cursor-pointer"><Icons.X /></button>
              <div className="lg:w-1/2 h-80 lg:h-auto relative overflow-hidden">
                <img src={selectedRecipe.image} className="w-full h-full object-cover grayscale-[20%]" alt={selectedRecipe.title} />
              </div>
              <div className="lg:w-1/2 p-12 lg:p-20 overflow-y-auto">
                <span className="text-[#B5CFB7] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Crafted Combination</span>
                <h2 className="text-4xl md:text-5xl font-bold italic mb-10 font-serif leading-tight">{selectedRecipe.title}</h2>
                <div className="grid grid-cols-2 gap-12 mb-12">
                   <div>
                      <h4 className="text-[10px] uppercase font-black tracking-widest opacity-30 mb-6 underline underline-offset-8 decoration-[#E8A87C]">Ingredients</h4>
                      <ul className="space-y-3 font-medium text-sm">
                        {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                      </ul>
                   </div>
                   <div>
                      <h4 className="text-[10px] uppercase font-black tracking-widest opacity-30 mb-6 underline underline-offset-8 decoration-[#B5CFB7]">The Method</h4>
                      <ol className="space-y-4 text-xs leading-relaxed opacity-70">
                         {selectedRecipe.method.map((step, i) => <li key={i} className="flex gap-3"><span className="font-serif italic text-[#E8A87C]">0{i+1}</span>{step}</li>)}
                      </ol>
                   </div>
                </div>
                <button className="w-full border-2 border-[#2D3A27] text-[#2D3A27] py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#2D3A27] hover:text-[#F8F2ED] transition-all cursor-pointer">Print Ritual</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="py-32 border-t border-black/5 bg-white/30">
        <div className="container mx-auto px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.5em] opacity-30">
            <div className="flex gap-10">
              <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Pinterest</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Behance</a>
            </div>
            <div className="text-center font-black">© 2024 Velo Botanicals. Cultivated Perfection.</div>
            <div className="flex gap-10">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Ritual Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
