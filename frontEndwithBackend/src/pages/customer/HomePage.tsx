import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Star, Sparkles, TrendingUp, Award } from 'lucide-react';
import Header from '../../components/layout/Header';
import RestaurantCard from '../../components/common/RestaurantCard';
import { Restaurant } from '../../types';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Artisan Kitchen',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Gourmet', 'International'],
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 45,
    minimumOrder: 200,
    isOpen: true,
    address: 'Dhanmondi, Dhaka',
    menu: [],
  },
  {
    id: '2',
    name: 'Bella Vista Pizzeria',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Italian', 'Mediterranean'],
    rating: 4.6,
    deliveryTime: '30-40 min',
    deliveryFee: 50,
    minimumOrder: 250,
    isOpen: true,
    address: 'Gulshan, Dhaka',
    menu: [],
  },
  {
    id: '3',
    name: 'Royal Spice Garden',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Bengali', 'Mughlai'],
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 35,
    minimumOrder: 150,
    isOpen: false,
    address: 'Old Dhaka',
    menu: [],
  },
  {
    id: '4',
    name: 'Zen Sushi Lounge',
    image: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Japanese', 'Asian Fusion'],
    rating: 4.7,
    deliveryTime: '35-45 min',
    deliveryFee: 60,
    minimumOrder: 350,
    isOpen: true,
    address: 'Banani, Dhaka',
    menu: [],
  },
  {
    id: '5',
    name: 'Fiesta Mexicana',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Mexican', 'Latin American'],
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 40,
    minimumOrder: 180,
    isOpen: true,
    address: 'Uttara, Dhaka',
    menu: [],
  },
  {
    id: '6',
    name: 'Green Garden Café',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Healthy', 'Organic'],
    rating: 4.4,
    deliveryTime: '20-30 min',
    deliveryFee: 30,
    minimumOrder: 120,
    isOpen: true,
    address: 'Wari, Dhaka',
    menu: [],
  },
];

const cuisineCategories = [
  { name: 'All', icon: Sparkles },
  { name: 'Gourmet', icon: Award },
  { name: 'Italian', icon: TrendingUp },
  { name: 'Bengali', icon: Star },
  { name: 'Japanese', icon: Sparkles },
  { name: 'Mexican', icon: TrendingUp },
  { name: 'Healthy', icon: Award },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine.includes(selectedCuisine);
      return matchesSearch && matchesCuisine;
    });
  }, [searchQuery, selectedCuisine]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900">
      <Header onSearchChange={setSearchQuery} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 glass-effect px-6 py-3 rounded-2xl shadow-soft mb-8">
              <Sparkles className="h-5 w-5 text-primary-400" />
              <span className="text-primary-300 font-semibold">Premium Food Delivery Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              <span className="text-gradient">Exquisite flavors,</span>
              <br />
              <span className="text-white">delivered with care</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover culinary masterpieces from Dhaka's finest restaurants, 
              crafted by passionate chefs and delivered to your doorstep
            </p>
            
            {/* Location selector */}
            <div className="inline-flex items-center space-x-4 glass-effect rounded-2xl p-6 max-w-md mx-auto shadow-medium">
              <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-300 font-medium">Delivering to</p>
                <p className="text-lg font-semibold text-white">Dhanmondi, Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Filter */}
      <section className="py-8 glass-dark border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {cuisineCategories.map((cuisine) => {
              const IconComponent = cuisine.icon;
              return (
                <button
                  key={cuisine.name}
                  onClick={() => setSelectedCuisine(cuisine.name)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 font-semibold ${
                    selectedCuisine === cuisine.name
                      ? 'gradient-primary text-white glow-purple'
                      : 'dark-card text-gray-300 hover:bg-white/5 shadow-soft border border-gray-700'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{cuisine.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-2">
                Featured Restaurants
              </h2>
              <p className="text-gray-300">
                <span className="font-semibold text-primary-400">{filteredRestaurants.length}</span> exceptional dining experiences await
              </p>
            </div>
            <div className="flex items-center space-x-3 glass-effect px-6 py-4 rounded-2xl shadow-soft border border-gray-800">
              <Clock className="h-5 w-5 text-accent-400" />
              <span className="text-sm font-medium text-gray-300">Average delivery: 25-35 min</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => {
                  console.log('Navigate to restaurant:', restaurant.id);
                }}
              />
            ))}
          </div>
          
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white mb-2">No restaurants found</h3>
              <p className="text-gray-300">Try adjusting your search or browse different cuisines</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}