import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Shield, Users, Mail, Phone, User as UserIcon, MapPin, CreditCard, Bike, Store, FileText, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

interface RestaurantData {
  ownerName: string;
  email: string;
  phone: string;
  restaurantName: string;
  restaurantAddress: string;
  cuisine: string;
  licenseNumber: string;
  taxId: string;
  bankAccount: string;
  password: string;
  confirmPassword: string;
}

interface RiderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const [userType, setUserType] = useState<User['role']>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup } = useAuth();

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '', email: '', phone: '', address: '', dateOfBirth: '', password: '', confirmPassword: ''
  });

  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    ownerName: '', email: '', phone: '', restaurantName: '', restaurantAddress: '', cuisine: '', 
    licenseNumber: '', taxId: '', bankAccount: '', password: '', confirmPassword: ''
  });

  const [riderData, setRiderData] = useState<RiderData>({
    name: '', email: '', phone: '', address: '', licenseNumber: '', vehicleType: 'motorcycle',
    vehicleNumber: '', emergencyContact: '', emergencyPhone: '', password: '', confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (userType === 'customer') {
      if (!customerData.name.trim()) newErrors.name = 'Name is required';
      if (!customerData.email.trim()) newErrors.email = 'Email is required';
      if (!customerData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!customerData.address.trim()) newErrors.address = 'Address is required';
      if (!customerData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (customerData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (customerData.password !== customerData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    } else if (userType === 'restaurant') {
      if (!restaurantData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
      if (!restaurantData.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required';
      if (!restaurantData.email.trim()) newErrors.email = 'Email is required';
      if (!restaurantData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!restaurantData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
      if (restaurantData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (restaurantData.password !== restaurantData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    } else if (userType === 'rider') {
      if (!riderData.name.trim()) newErrors.name = 'Name is required';
      if (!riderData.email.trim()) newErrors.email = 'Email is required';
      if (!riderData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!riderData.vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle number is required';
      if (!riderData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
      if (riderData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (riderData.password !== riderData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      let userData;
      if (userType === 'customer') {
        userData = { name: customerData.name, email: customerData.email, phone: customerData.phone, role: userType };
      } else if (userType === 'restaurant') {
        userData = { name: restaurantData.ownerName, email: restaurantData.email, phone: restaurantData.phone, role: userType };
      } else {
        userData = { name: riderData.name, email: riderData.email, phone: riderData.phone, role: userType };
      }
      await signup(userData);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    { value: 'customer', label: 'Food Lover', icon: Users, description: 'Discover amazing cuisines', color: 'primary' },
    { value: 'restaurant', label: 'Restaurant Owner', icon: Store, description: 'Grow your culinary business', color: 'secondary' },
    { value: 'rider', label: 'Delivery Partner', icon: Bike, description: 'Earn while you ride', color: 'accent' },
  ];

  const renderCustomerForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={customerData.name}
              onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={customerData.email}
              onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="+880 123 456 789"
            />
          </div>
          {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Date of Birth</label>
          <input
            type="date"
            value={customerData.dateOfBirth}
            onChange={(e) => setCustomerData({...customerData, dateOfBirth: e.target.value})}
            className={`w-full px-4 py-4 dark-input rounded-2xl ${errors.dateOfBirth ? 'border-red-500' : ''}`}
          />
          {errors.dateOfBirth && <p className="mt-2 text-sm text-red-400">{errors.dateOfBirth}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">Address</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          <textarea
            value={customerData.address}
            onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
            className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl resize-none ${errors.address ? 'border-red-500' : ''}`}
            rows={3}
            placeholder="Enter your complete address"
          />
        </div>
        {errors.address && <p className="mt-2 text-sm text-red-400">{errors.address}</p>}
      </div>
    </div>
  );

  const renderRestaurantForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Owner Name</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={restaurantData.ownerName}
              onChange={(e) => setRestaurantData({...restaurantData, ownerName: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.ownerName ? 'border-red-500' : ''}`}
              placeholder="Restaurant owner name"
            />
          </div>
          {errors.ownerName && <p className="mt-2 text-sm text-red-400">{errors.ownerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Restaurant Name</label>
          <div className="relative">
            <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={restaurantData.restaurantName}
              onChange={(e) => setRestaurantData({...restaurantData, restaurantName: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.restaurantName ? 'border-red-500' : ''}`}
              placeholder="Your restaurant name"
            />
          </div>
          {errors.restaurantName && <p className="mt-2 text-sm text-red-400">{errors.restaurantName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={restaurantData.email}
              onChange={(e) => setRestaurantData({...restaurantData, email: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Business email address"
            />
          </div>
          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={restaurantData.phone}
              onChange={(e) => setRestaurantData({...restaurantData, phone: e.target.value})}
              className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl"
              placeholder="+880 123 456 789"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Cuisine Type</label>
          <select
            value={restaurantData.cuisine}
            onChange={(e) => setRestaurantData({...restaurantData, cuisine: e.target.value})}
            className="w-full px-4 py-4 dark-input rounded-2xl"
          >
            <option value="">Select cuisine type</option>
            <option value="Bengali">Bengali</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Thai">Thai</option>
            <option value="Mexican">Mexican</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Business License</label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={restaurantData.licenseNumber}
              onChange={(e) => setRestaurantData({...restaurantData, licenseNumber: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.licenseNumber ? 'border-red-500' : ''}`}
              placeholder="Business license number"
            />
          </div>
          {errors.licenseNumber && <p className="mt-2 text-sm text-red-400">{errors.licenseNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Tax ID</label>
          <input
            type="text"
            value={restaurantData.taxId}
            onChange={(e) => setRestaurantData({...restaurantData, taxId: e.target.value})}
            className={`w-full px-4 py-4 dark-input rounded-2xl ${errors.taxId ? 'border-red-500' : ''}`}
            placeholder="Tax identification number"
          />
          {errors.taxId && <p className="mt-2 text-sm text-red-400">{errors.taxId}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Bank Account</label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={restaurantData.bankAccount}
              onChange={(e) => setRestaurantData({...restaurantData, bankAccount: e.target.value})}
              className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl"
              placeholder="Bank account number"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">Restaurant Address</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          <textarea
            value={restaurantData.restaurantAddress}
            onChange={(e) => setRestaurantData({...restaurantData, restaurantAddress: e.target.value})}
            className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl resize-none"
            rows={3}
            placeholder="Complete restaurant address"
          />
        </div>
      </div>
    </div>
  );

  const renderRiderForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={riderData.name}
              onChange={(e) => setRiderData({...riderData, name: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={riderData.email}
              onChange={(e) => setRiderData({...riderData, email: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={riderData.phone}
              onChange={(e) => setRiderData({...riderData, phone: e.target.value})}
              className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl"
              placeholder="+880 123 456 789"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Driving License</label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={riderData.licenseNumber}
              onChange={(e) => setRiderData({...riderData, licenseNumber: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.licenseNumber ? 'border-red-500' : ''}`}
              placeholder="Driving license number"
            />
          </div>
          {errors.licenseNumber && <p className="mt-2 text-sm text-red-400">{errors.licenseNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Vehicle Type</label>
          <select
            value={riderData.vehicleType}
            onChange={(e) => setRiderData({...riderData, vehicleType: e.target.value})}
            className="w-full px-4 py-4 dark-input rounded-2xl"
          >
            <option value="motorcycle">Motorcycle</option>
            <option value="bicycle">Bicycle</option>
            <option value="car">Car</option>
            <option value="scooter">Scooter</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Vehicle Number</label>
          <div className="relative">
            <Bike className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={riderData.vehicleNumber}
              onChange={(e) => setRiderData({...riderData, vehicleNumber: e.target.value})}
              className={`w-full pl-12 pr-4 py-4 dark-input rounded-2xl ${errors.vehicleNumber ? 'border-red-500' : ''}`}
              placeholder="Vehicle registration number"
            />
          </div>
          {errors.vehicleNumber && <p className="mt-2 text-sm text-red-400">{errors.vehicleNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Emergency Contact</label>
          <input
            type="text"
            value={riderData.emergencyContact}
            onChange={(e) => setRiderData({...riderData, emergencyContact: e.target.value})}
            className={`w-full px-4 py-4 dark-input rounded-2xl ${errors.emergencyContact ? 'border-red-500' : ''}`}
            placeholder="Emergency contact name"
          />
          {errors.emergencyContact && <p className="mt-2 text-sm text-red-400">{errors.emergencyContact}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">Emergency Phone</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={riderData.emergencyPhone}
              onChange={(e) => setRiderData({...riderData, emergencyPhone: e.target.value})}
              className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl"
              placeholder="+880 123 456 789"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">Address</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          <textarea
            value={riderData.address}
            onChange={(e) => setRiderData({...riderData, address: e.target.value})}
            className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl resize-none"
            rows={3}
            placeholder="Enter your complete address"
          />
        </div>
      </div>
    </div>
  );

  const getCurrentData = () => {
    switch (userType) {
      case 'customer': return customerData;
      case 'restaurant': return restaurantData;
      case 'rider': return riderData;
      default: return customerData;
    }
  };

  const updatePassword = (password: string) => {
    if (userType === 'customer') {
      setCustomerData({...customerData, password});
    } else if (userType === 'restaurant') {
      setRestaurantData({...restaurantData, password});
    } else {
      setRiderData({...riderData, password});
    }
  };

  const updateConfirmPassword = (confirmPassword: string) => {
    if (userType === 'customer') {
      setCustomerData({...customerData, confirmPassword});
    } else if (userType === 'restaurant') {
      setRestaurantData({...restaurantData, confirmPassword});
    } else {
      setRiderData({...riderData, confirmPassword});
    }
  };

  const currentData = getCurrentData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-gradient">Savora</h1>
          </div>
        </div>
        <h2 className="text-center text-3xl font-serif font-bold text-white mb-2">
          Join the Revolution
        </h2>
        <p className="text-center text-gray-300">
          Create your account and start your culinary journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="dark-card py-10 px-8 shadow-large sm:rounded-3xl">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                I want to join as a
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setUserType(type.value as User['role'])}
                      className={`flex flex-col items-center space-y-3 p-6 rounded-2xl border-2 transition-all duration-300 ${
                        userType === type.value
                          ? 'gradient-primary text-white border-transparent glow-purple'
                          : 'dark-card text-gray-300 border-gray-700 hover:border-primary-500 hover:bg-white/5'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${
                        userType === type.value ? 'bg-white/20' : 'bg-primary-500/20'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${
                          userType === type.value ? 'text-white' : 'text-primary-400'
                        }`} />
                      </div>
                      <div className="text-center">
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

            {/* Dynamic Form Based on User Type */}
            {userType === 'customer' && renderCustomerForm()}
            {userType === 'restaurant' && renderRestaurantForm()}
            {userType === 'rider' && renderRiderForm()}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentData.password}
                    onChange={(e) => updatePassword(e.target.value)}
                    className={`w-full px-4 py-4 pr-12 dark-input rounded-2xl ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={currentData.confirmPassword}
                    onChange={(e) => updateConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-4 pr-12 dark-input rounded-2xl ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400 font-medium">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex justify-center py-4 px-4 border-2 border-gray-700 rounded-2xl shadow-soft bg-gray-800/50 text-gray-300 font-semibold hover:bg-gray-700/50 hover:border-primary-500 transition-all duration-300">
                Sign In Instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}