import React, { useState } from 'react';
import { MapPin, Clock, Package, DollarSign, Navigation, Phone, Award, TrendingUp } from 'lucide-react';
import Header from '../../components/layout/Header';

const mockDeliveries = [
  {
    id: '#SAV-D1234',
    restaurant: 'The Artisan Kitchen',
    customer: 'John Doe',
    address: 'House 45, Road 12, Dhanmondi, Dhaka',
    phone: '+880123456789',
    amount: 850,
    distance: '2.5 km',
    estimatedTime: '15 min',
    status: 'assigned',
  },
  {
    id: '#SAV-D1235',
    restaurant: 'Bella Vista Pizzeria',
    customer: 'Jane Smith',
    address: 'Apartment 8B, Block C, Gulshan 1, Dhaka',
    phone: '+880987654321',
    amount: 1280,
    distance: '3.2 km',
    estimatedTime: '20 min',
    status: 'picked_up',
  },
];

const statusColors = {
  assigned: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  picked_up: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function RiderDashboard() {
  const [activeTab, setActiveTab] = useState('deliveries');
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-accent-900">
      <Header showSearch={false} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Rider Dashboard</h1>
            <p className="text-gray-300 text-lg">Deliver excellence, one order at a time</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-300">Status:</span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  isOnline
                    ? 'gradient-secondary text-white glow-gold'
                    : 'dark-card text-gray-300 hover:bg-white/10 border border-gray-700'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="dark-card rounded-3xl shadow-large p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">Today's Deliveries</p>
            <p className="text-3xl font-bold text-white">16</p>
            <p className="text-xs text-green-400 font-medium">+4 from yesterday</p>
          </div>
          
          <div className="dark-card rounded-3xl shadow-large p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-secondary rounded-2xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Award className="h-5 w-5 text-secondary-400" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">Today's Earnings</p>
            <p className="text-3xl font-bold text-white">৳1,240</p>
            <p className="text-xs text-secondary-400 font-medium">Above average</p>
          </div>
          
          <div className="dark-card rounded-3xl shadow-large p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <Award className="h-5 w-5 text-accent-400" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">Avg. Time</p>
            <p className="text-3xl font-bold text-white">16 min</p>
            <p className="text-xs text-accent-400 font-medium">Excellent speed</p>
          </div>
          
          <div className="dark-card rounded-3xl shadow-large p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">Distance Today</p>
            <p className="text-3xl font-bold text-white">52 km</p>
            <p className="text-xs text-green-400 font-medium">Great coverage</p>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="dark-card rounded-3xl shadow-large border border-gray-800 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-800">
            <h3 className="text-2xl font-serif font-semibold text-white">Active Deliveries</h3>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              {mockDeliveries.map((delivery) => (
                <div key={delivery.id} className="glass-dark border border-gray-700 rounded-2xl p-6 hover:shadow-glow transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="font-bold text-white text-lg">{delivery.id}</h4>
                        <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${statusColors[delivery.status as keyof typeof statusColors]}`}>
                          {delivery.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-300 font-medium mb-1">From: <span className="text-white font-semibold">{delivery.restaurant}</span></p>
                      <p className="text-gray-300 font-medium">To: <span className="text-white font-semibold">{delivery.customer}</span></p>
                    </div>
                    <div className="text-right dark-card px-4 py-3 rounded-xl border border-gray-700">
                      <p className="font-bold text-gradient text-xl">৳{delivery.amount}</p>
                      <p className="text-sm text-gray-400 font-medium">{delivery.distance} • {delivery.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="glass-dark rounded-2xl p-4 mb-6 border border-gray-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">Delivery Address</p>
                        <p className="text-gray-300">{delivery.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-3 text-primary-400 hover:text-primary-300 transition-colors bg-primary-500/20 hover:bg-primary-500/30 px-4 py-3 rounded-2xl border border-primary-500/30">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold">{delivery.phone}</span>
                    </button>
                    
                    <div className="flex space-x-3">
                      <button className="px-6 py-3 bg-accent-500/20 text-accent-400 rounded-2xl hover:bg-accent-500/30 transition-colors font-semibold border border-accent-500/30">
                        Navigate
                      </button>
                      {delivery.status === 'assigned' && (
                        <button className="btn-secondary">
                          Mark as Picked Up
                        </button>
                      )}
                      {delivery.status === 'picked_up' && (
                        <button className="btn-success">
                          Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockDeliveries.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Package className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-2xl font-serif font-semibold text-white mb-2">No active deliveries</h4>
                <p className="text-gray-300">New delivery requests will appear here when you're online</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}