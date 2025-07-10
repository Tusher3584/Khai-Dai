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
  assigned: 'bg-blue-100 text-blue-700 border-blue-200',
  picked_up: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
};

export default function RiderDashboard() {
  const [activeTab, setActiveTab] = useState('deliveries');
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50">
      <Header showSearch={false} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-2">Rider Dashboard</h1>
            <p className="text-neutral-600 text-lg">Deliver excellence, one order at a time</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-neutral-700">Status:</span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  isOnline
                    ? 'gradient-secondary text-white shadow-glow-pink'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-soft p-8 border border-neutral-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Today's Deliveries</p>
            <p className="text-3xl font-bold text-neutral-900">16</p>
            <p className="text-xs text-green-600 font-medium">+4 from yesterday</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-soft p-8 border border-neutral-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-secondary rounded-2xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Today's Earnings</p>
            <p className="text-3xl font-bold text-neutral-900">৳1,240</p>
            <p className="text-xs text-yellow-600 font-medium">Above average</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-soft p-8 border border-neutral-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <Award className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Avg. Time</p>
            <p className="text-3xl font-bold text-neutral-900">16 min</p>
            <p className="text-xs text-blue-600 font-medium">Excellent speed</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-soft p-8 border border-neutral-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Distance Today</p>
            <p className="text-3xl font-bold text-neutral-900">52 km</p>
            <p className="text-xs text-green-600 font-medium">Great coverage</p>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-soft border border-neutral-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-neutral-200">
            <h3 className="text-2xl font-serif font-semibold text-neutral-900">Active Deliveries</h3>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              {mockDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 hover:shadow-medium transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="font-bold text-neutral-900 text-lg">{delivery.id}</h4>
                        <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${statusColors[delivery.status as keyof typeof statusColors]}`}>
                          {delivery.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-neutral-600 font-medium mb-1">From: <span className="text-neutral-800 font-semibold">{delivery.restaurant}</span></p>
                      <p className="text-neutral-600 font-medium">To: <span className="text-neutral-800 font-semibold">{delivery.customer}</span></p>
                    </div>
                    <div className="text-right bg-white px-4 py-3 rounded-xl">
                      <p className="font-bold text-gradient text-xl">৳{delivery.amount}</p>
                      <p className="text-sm text-neutral-500 font-medium">{delivery.distance} • {delivery.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 mb-6 border border-neutral-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 mb-1">Delivery Address</p>
                        <p className="text-neutral-600">{delivery.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 transition-colors bg-primary-50 hover:bg-primary-100 px-4 py-3 rounded-2xl">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold">{delivery.phone}</span>
                    </button>
                    
                    <div className="flex space-x-3">
                      <button className="px-6 py-3 bg-accent-100 text-accent-700 rounded-2xl hover:bg-accent-200 transition-colors font-semibold">
                        Navigate
                      </button>
                      {delivery.status === 'assigned' && (
                        <button className="btn-secondary">
                          Mark as Picked Up
                        </button>
                      )}
                      {delivery.status === 'picked_up' && (
                        <button className="px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors font-semibold">
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
                <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-2xl font-serif font-semibold text-neutral-800 mb-2">No active deliveries</h4>
                <p className="text-neutral-600">New delivery requests will appear here when you're online</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}