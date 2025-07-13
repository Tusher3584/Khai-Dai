import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Truck, MapPin, Award, Users } from 'lucide-react';
import Header from '../../components/layout/Header';
import MenuItemCard from '../../components/common/MenuItemCard';
import { MenuItem, Restaurant } from '../../types';

const mockRestaurant: Restaurant = {
  id: '1',
  name: 'The Artisan Kitchen',
  image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1200',
  cuisine: ['Gourmet', 'International'],
  rating: 4.8,
  deliveryTime: '25-35 min',
  deliveryFee: 45,
  minimumOrder: 200,
  isOpen: true,
  address: 'House 45, Road 12, Dhanmondi, Dhaka',
  menu: [],
};

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Burger',
    description: 'Artisanal beef patty with truffle mushrooms, aged cheddar, and house-made aioli',
    price: 650,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Signature Dishes',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Herb-Crusted Chicken',
    description: 'Free-range chicken breast with Mediterranean herbs and roasted vegetables',
    price: 580,
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Signature Dishes',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Artisan Sweet Potato Fries',
    description: 'Hand-cut sweet potato fries with rosemary salt and truffle dip',
    price: 180,
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sides & Appetizers',
    isAvailable: true,
    isVegetarian: true,
  },
  {
    id: '4',
    name: 'Spicy Buffalo Cauliflower',
    description: 'Crispy cauliflower florets tossed in house buffalo sauce with blue cheese dip',
    price: 320,
    image: 'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sides & Appetizers',
    isAvailable: true,
    isSpicy: true,
    isVegetarian: true,
  },
  {
    id: '5',
    name: 'Vanilla Bean Milkshake',
    description: 'Premium vanilla bean ice cream blended with organic milk and Madagascar vanilla',
    price: 280,
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beverages & Desserts',
    isAvailable: false,
  },
  {
    id: '6',
    name: 'Artisan Cold Brew',
    description: 'Single-origin coffee beans cold-brewed for 24 hours, served over ice',
    price: 120,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beverages & Desserts',
    isAvailable: true,
  },
];

const categories = [
  { name: 'All', icon: Award },
  { name: 'Signature Dishes', icon: Star },
  { name: 'Sides & Appetizers', icon: Users },
  { name: 'Beverages & Desserts', icon: Clock },
];

export default function RestaurantPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900">
      <Header showSearch={false} />
      
      {/* Back Button */}
      <div className="glass-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-all duration-300 bg-gray-800/50 hover:bg-primary-500/10 px-4 py-3 rounded-2xl">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to restaurants</span>
          </button>
        </div>
      </div>

      {/* Restaurant Header */}
      <section className="glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12">
            <div className="mb-8 lg:mb-0">
              <img
                src={mockRestaurant.image}
                alt={mockRestaurant.name}
                className="w-full lg:w-64 h-64 object-cover rounded-3xl shadow-large"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-4xl font-serif font-bold text-white">{mockRestaurant.name}</h1>
                <div className="bg-green-500/20 px-3 py-1 rounded-2xl border border-green-500/30">
                  <span className="text-green-400 font-semibold text-sm">Premium</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-lg">{mockRestaurant.cuisine.join(' • ')}</p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="glass-dark p-4 rounded-2xl text-center border border-yellow-500/30">
                  <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2 fill-current" />
                  <p className="font-bold text-yellow-400">{mockRestaurant.rating}</p>
                  <p className="text-xs text-yellow-300">Rating</p>
                </div>
                <div className="glass-dark p-4 rounded-2xl text-center border border-accent-500/30">
                  <Clock className="h-6 w-6 text-accent-400 mx-auto mb-2" />
                  <p className="font-bold text-accent-400">{mockRestaurant.deliveryTime}</p>
                  <p className="text-xs text-accent-300">Delivery</p>
                </div>
                <div className="glass-dark p-4 rounded-2xl text-center border border-secondary-500/30">
                  <Truck className="h-6 w-6 text-secondary-400 mx-auto mb-2" />
                  <p className="font-bold text-secondary-400">৳{mockRestaurant.deliveryFee}</p>
                  <p className="text-xs text-secondary-300">Fee</p>
                </div>
                <div className="glass-dark p-4 rounded-2xl text-center border border-primary-500/30">
                  <MapPin className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                  <p className="font-bold text-primary-400">৳{mockRestaurant.minimumOrder}</p>
                  <p className="text-xs text-primary-300">Minimum</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">{mockRestaurant.address}</span>
                </div>
                <span className={`px-4 py-2 rounded-2xl text-sm font-semibold border ${
                  mockRestaurant.isOpen 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {mockRestaurant.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="glass-dark border-y border-gray-800 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 font-semibold ${
                    selectedCategory === category.name
                      ? 'gradient-primary text-white glow-purple'
                      : 'dark-card text-gray-300 hover:bg-white/5 shadow-soft border border-gray-700'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">
            {selectedCategory === 'All' ? 'Our Complete Menu' : selectedCategory}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white mb-2">No items in this category</h3>
              <p className="text-gray-300">Explore other menu categories for delicious options</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}