import React from 'react';
import { Plus, Leaf, Flame, Heart } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item);
  };

  return (
    <div className="dark-card rounded-3xl border border-gray-800 p-6 hover:shadow-glow transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="font-serif font-semibold text-white text-lg group-hover:text-primary-400 transition-colors">{item.name}</h4>
            <div className="flex items-center space-x-1">
              {item.isVegetarian && (
                <div className="bg-green-500/20 p-1.5 rounded-xl border border-green-500/30">
                  <Leaf className="h-4 w-4 text-green-400" />
                </div>
              )}
              {item.isSpicy && (
                <div className="bg-red-500/20 p-1.5 rounded-xl border border-red-500/30">
                  <Flame className="h-4 w-4 text-red-400" />
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gradient">৳{item.price}</p>
            <button className="text-gray-400 hover:text-secondary-400 transition-colors p-2 hover:bg-secondary-500/10 rounded-xl">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-2xl shadow-large"
            />
            {item.isAvailable ? (
              <button
                onClick={handleAddToCart}
                className="absolute -bottom-2 -right-2 btn-primary p-2 rounded-2xl hover:scale-110 transition-all duration-300 glow-purple"
              >
                <Plus className="h-5 w-5" />
              </button>
            ) : (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-white text-xs font-semibold bg-white/20 px-2 py-1 rounded-lg">
                  Unavailable
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}