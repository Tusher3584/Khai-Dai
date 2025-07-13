import React, { useState } from 'react';
import { Package, Clock, DollarSign, Users, ChefHat, Settings, TrendingUp, Award } from 'lucide-react';
import Header from '../../components/layout/Header';

const mockOrders = [
  { id: '#SAV1234', customer: 'John Doe', items: 3, amount: 850, status: 'preparing', time: '2 min ago' },
  { id: '#SAV1235', customer: 'Jane Smith', items: 2, amount: 620, status: 'ready', time: '5 min ago' },
  { id: '#SAV1236', customer: 'Bob Wilson', items: 1, amount: 380, status: 'confirmed', time: '8 min ago' },
];

const statusColors = {
  confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  preparing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  ready: 'bg-green-500/20 text-green-400 border-green-500/30',
  picked_up: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900">
      <Header showSearch={false} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Restaurant Dashboard</h1>
            <p className="text-gray-300 text-lg">Manage your culinary business with elegance</p>
          </div>
          <button className="flex items-center space-x-3 btn-primary">
            <Settings className="h-5 w-5" />
            <span>Restaurant Settings</span>
          </button>
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
            <p className="text-sm font-semibold text-gray-300 mb-1">Today's Orders</p>
            <p className="text-3xl font-bold text-white">24</p>
            <p className="text-xs text-green-400 font-medium">+12% from yesterday</p>
          </div>
          
          <div className="dark-card rounded-3xl shadow-large p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-secondary rounded-2xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">Today's Revenue</p>
            <p className="text-3xl font-bold text-white">৳18,450</p>
            <p className="text-xs text-green-400 font-medium">+8% from yesterday</p>
          </div>
          
          <div className="dark-card rounded-3xl shadow-large p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <Award className="h-5 w-5 text-accent-400" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">Avg. Prep Time</p>
            <p className="text-3xl font-bold text-white">18 min</p>
            <p className="text-xs text-accent-400 font-medium">Excellent performance</p>
          </div>
          
          <div className="dark-card rounded-3xl shadow-large p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-1">Active Orders</p>
            <p className="text-3xl font-bold text-white">8</p>
            <p className="text-xs text-green-400 font-medium">Peak hours</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="dark-card rounded-3xl shadow-large border border-gray-800 overflow-hidden">
          <div className="border-b border-gray-800">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'orders', name: 'Active Orders', icon: Package },
                { id: 'menu', name: 'Menu Management', icon: ChefHat },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 py-6 px-2 border-b-3 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-2xl font-serif font-semibold text-white mb-6">Recent Orders</h3>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="glass-dark border border-gray-700 rounded-2xl p-6 hover:shadow-glow transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div>
                            <p className="font-bold text-white text-lg">{order.id}</p>
                            <p className="text-gray-300 font-medium">{order.customer}</p>
                          </div>
                          <div className="dark-card px-4 py-2 rounded-xl border border-gray-700">
                            <p className="text-sm text-gray-300 font-semibold">{order.items} items</p>
                            <p className="text-lg font-bold text-gradient">৳{order.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${statusColors[order.status as keyof typeof statusColors]}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                          <p className="text-sm text-gray-400 font-medium">{order.time}</p>
                          <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-xl text-sm font-semibold hover:bg-primary-500/30 transition-colors border border-primary-500/30">
                              View Details
                            </button>
                            <button className="btn-secondary text-sm">
                              Update Status
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-serif font-semibold text-white">Menu Management</h3>
                  <button className="btn-primary">
                    Add New Dish
                  </button>
                </div>
                <div className="text-center py-20">
                  <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <ChefHat className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="text-2xl font-serif font-semibold text-white mb-2">Menu Management</h4>
                  <p className="text-gray-300">Advanced menu management features coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}