import React from 'react';
import { Clock, Star, Truck, MapPin } from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div 
      className="dark-card rounded-3xl shadow-large hover:shadow-glow card-hover cursor-pointer overflow-hidden border border-gray-800"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="glass-dark px-4 py-2 rounded-2xl">
              <span className="text-white font-semibold">Currently Closed</span>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 glass-effect px-3 py-2 rounded-2xl flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-white">{restaurant.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 glass-effect px-3 py-2 rounded-2xl">
          <div className="flex items-center space-x-2 text-sm font-medium text-white">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.address.split(',')[0]}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold text-white mb-2">{restaurant.name}</h3>
        <p className="text-gray-300 text-sm mb-4 font-medium">{restaurant.cuisine.join(' • ')}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-2 bg-accent-500/20 px-3 py-2 rounded-xl">
            <Clock className="h-4 w-4 text-accent-400" />
            <span className="font-medium text-accent-300">{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-2 bg-secondary-500/20 px-3 py-2 rounded-xl">
            <Truck className="h-4 w-4 text-secondary-400" />
            <span className="font-medium text-secondary-300">৳{restaurant.deliveryFee}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-2 rounded-xl">
            Min order: <span className="font-semibold text-gray-300">৳{restaurant.minimumOrder}</span>
          </div>
          <div className={`px-3 py-2 rounded-xl text-xs font-semibold ${
            restaurant.isOpen 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {restaurant.isOpen ? 'Open Now' : 'Closed'}
          </div>
        </div>
      </div>
    </div>
  );
}