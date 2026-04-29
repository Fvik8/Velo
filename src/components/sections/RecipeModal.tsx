import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, BookOpen, Utensils } from 'lucide-react';
import { Recipe } from '@/types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  return (
    <AnimatePresence>
      {recipe && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest/40 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] bg-cream rounded-[40px] z-[110] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-forest/5 hover:bg-forest/10 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src={recipe.image} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto custom-scrollbar">
              <div className="flex items-center space-x-4 mb-6 opacity-40">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">{recipe.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">{recipe.difficulty}</span>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">{recipe.title}</h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2">
                    <Utensils className="w-3 h-3" />
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm font-medium border-b border-forest/5 pb-2 text-forest/70">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-6">The Method</h3>
                  <ol className="space-y-6">
                    {recipe.method.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-xl font-serif italic opacity-20 flex-shrink-0">0{i + 1}</span>
                        <p className="text-sm leading-relaxed text-forest/80 pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
