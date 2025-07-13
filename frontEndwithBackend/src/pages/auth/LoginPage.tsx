import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Sparkles, Shield, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<User['role']>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, userType);
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    { value: 'customer', label: 'Customer', icon: Users, description: 'Order delicious food' },
    { value: 'restaurant', label: 'Restaurant', icon: Sparkles, description: 'Manage your business' },
    { value: 'rider', label: 'Rider', icon: Shield, description: 'Deliver with us' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-gradient">Savora</h1>
          </div>
        </div>
        <h2 className="text-center text-3xl font-serif font-bold text-white mb-2">
          Welcome back
        </h2>
        <p className="text-center text-gray-300">
          Sign in to continue your culinary journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="dark-card py-10 px-8 shadow-large sm:rounded-3xl">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                I am a
              </label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setUserType(type.value as User['role'])}
                      className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                        userType === type.value
                          ? 'gradient-primary text-white border-transparent glow-purple'
                          : 'dark-card text-gray-300 border-gray-700 hover:border-primary-500 hover:bg-white/5'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${
                        userType === type.value ? 'bg-white/20' : 'bg-primary-500/20'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          userType === type.value ? 'text-white' : 'text-primary-400'
                        }`} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{type.label}</p>
                        <p className={`text-sm ${
                          userType === type.value ? 'text-white/80' : 'text-gray-400'
                        }`}>
                          {type.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-4 dark-input rounded-2xl transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-4 pr-12 dark-input rounded-2xl transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300 font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400 font-medium">New to Savora?</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex justify-center py-4 px-4 border-2 border-gray-700 rounded-2xl shadow-soft bg-gray-800/50 text-gray-300 font-semibold hover:bg-gray-700/50 hover:border-primary-500 transition-all duration-300">
                Create your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}