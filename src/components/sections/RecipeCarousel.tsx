import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';

import { Recipe } from '@/types';
import { RecipeModal } from './RecipeModal';

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Sage & Honey Granola",
    time: "20 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "1 cup Artisanal VELO Madagascar Vanilla",
      "2 cups Rolled Oats",
      "1/2 cup Wildflower Honey",
      "Fresh Sage Leaves",
      "Maldon Sea Salt"
    ],
    method: [
      "Toast oats in a dry pan until nutty and golden.",
      "Melt honey with sage leaves to infuse fragrance.",
      "Combine all elements and freeze into chunks.",
      "Serve over a generous scoop of VELO."
    ]
  },
  {
    id: 2,
    title: "Botanical Berry Compote",
    time: "15 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "Artisanal VELO Sun-Kissed Peach",
      "250g Mixed Forest Berries",
      "1 sprig Rosemary",
      "Splash of Balsamic Vinegar",
      "30g Unrefined Sugar"
    ],
    method: [
      "Simmer berries with rosemary and sugar until bursting.",
      "Add a splash of balsamic for depth.",
      "Cool to room temperature.",
      "Drizzle over velvet peach base."
    ]
  },
  {
    id: 3,
    title: "VELO Glazed Almonds",
    time: "45 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1504113888839-1c800367341d?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "Artisanal VELO Midnight Cacao",
      "Raw Almonds",
      "Cinnamon Bark",
      "Maple Syrup",
      "Smoked Paprika"
    ],
    method: [
      "Whisk maple syrup and spices.",
      "Toss almonds and roast at 180°C for 15 mins.",
      "Let cool completely for extra crunch.",
      "Top your dark chocolate bowl with spiced clusters."
    ]
  },
  {
    id: 4,
    title: "Lavender Peach Swirl",
    time: "10 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "Artisanal VELO Sun-Kissed Peach",
      "Fresh Lavender Flowers",
      "Sliced White Peaches",
      "Honey Drizzle"
    ],
    method: [
      "Infuse honey with crushed lavender.",
      "Slice peaches into delicate fans.",
      "Arrange over ice cream and drizzle with floral honey."
    ]
  },
];

export const RecipeCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(null);

  return (
    <section id="recipes" className="py-24 bg-forest text-cream overflow-hidden">
      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      
      <div className="px-8 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold opacity-60 block mb-4">Botanical Kitchen</span>
          <h2 className="text-5xl md:text-6xl tracking-tight">Velvet Pairings</h2>
        </div>
        <div className="flex items-center space-x-4 mt-8 md:mt-0 group cursor-pointer">
          <span className="text-sm uppercase tracking-widest font-medium group-hover:text-peach transition-colors">View All Recipes</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto space-x-8 px-8 pb-12 scrollbar-hide snap-x no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {recipes.map((recipe, idx) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex-shrink-0 w-[320px] md:w-[450px] aspect-[4/5] relative rounded-[40px] overflow-hidden group snap-center"
          >
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 glass p-8 rounded-3xl border-white/10 text-forest">
              <div className="flex items-center space-x-4 mb-4 opacity-60">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest">{recipe.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest">{recipe.difficulty}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-6 leading-tight">{recipe.title}</h3>
              
              <button 
                onClick={() => setSelectedRecipe(recipe)}
                className="text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-6 bg-forest text-cream rounded-full w-full hover:bg-peach transition-colors"
              >
                Explore Method
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
