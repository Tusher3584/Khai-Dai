import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CustomerServiceChat from '../common/CustomerServiceChat';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

export default function Header({ onSearchChange, showSearch = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  return (
    <header className="glass-dark shadow-large border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-gradient">Savora</h1>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-12">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full pl-12 pr-4 py-4 dark-input rounded-2xl transition-all duration-300"
                  placeholder="Discover amazing restaurants and dishes..."
                />
              </div>
            </div>
          )}

          {/* Right side buttons */}
          <div className="flex items-center space-x-6">
            {/* Customer Service Chat */}
            <button 
              onClick={() => setIsChatOpen(true)}
              className="relative p-3 text-gray-300 hover:text-primary-400 transition-all duration-300 hover:bg-primary-500/10 rounded-2xl group"
            >
              <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </button>

            {/* Cart */}
            <button className="relative p-3 text-gray-300 hover:text-primary-400 transition-all duration-300 hover:bg-primary-500/10 rounded-2xl group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 gradient-secondary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold animate-pulse-slow">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-all duration-300 bg-gray-800/50 hover:bg-primary-500/10 px-4 py-3 rounded-2xl">
                  <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden md:block font-medium">{user?.name}</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-3">
                <button className="px-6 py-3 text-primary-400 hover:text-primary-300 transition-colors font-semibold rounded-2xl hover:bg-primary-500/10">
                  Sign In
                </button>
                <button className="btn-primary">
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 text-gray-300 hover:text-primary-400 transition-colors hover:bg-primary-500/10 rounded-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-800 glass-dark">
            {showSearch && (
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full pl-12 pr-4 py-4 dark-input rounded-2xl transition-all duration-300"
                    placeholder="Discover amazing restaurants..."
                  />
                </div>
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="space-y-3">
                <button className="block w-full text-left px-4 py-3 text-primary-400 hover:bg-primary-500/10 rounded-2xl font-semibold transition-colors">
                  Sign In
                </button>
                <button className="block w-full btn-primary text-center">
                  Get Started
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <CustomerServiceChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </header>
  );
}