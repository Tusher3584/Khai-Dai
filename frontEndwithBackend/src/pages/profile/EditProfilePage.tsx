import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save, Shield, CreditCard, Bell } from 'lucide-react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../context/AuthContext';

export default function EditProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '+880123456789',
    address: 'House 45, Road 12, Dhanmondi, Dhaka',
    dateOfBirth: '1990-01-15',
    avatar: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });

  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'card', last4: '4242', brand: 'Visa', isDefault: true },
    { id: '2', type: 'bkash', number: '01712345678', isDefault: false },
  ]);

  const handleSave = () => {
    console.log('Saving profile data:', profileData);
    // Here you would typically make an API call to save the data
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900">
      <Header showSearch={false} />
      
      {/* Back Button */}
      <div className="glass-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-all duration-300 bg-gray-800/50 hover:bg-primary-500/10 px-4 py-3 rounded-2xl">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-300 text-lg">Manage your account preferences and information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="dark-card rounded-3xl p-6 sticky top-24">
              {/* Profile Avatar */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.name.charAt(0)}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 gradient-secondary rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-white mt-4">{profileData.name}</h3>
                <p className="text-gray-400 text-sm">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'gradient-primary text-white glow-purple'
                          : 'text-gray-300 hover:bg-white/5 hover:text-primary-400'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="dark-card rounded-3xl p-8">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-6">Personal Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          className="w-full px-4 py-4 dark-input rounded-2xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <textarea
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 dark-input rounded-2xl resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    {Object.entries(preferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 glass-dark rounded-2xl border border-gray-700">
                        <div>
                          <h3 className="font-semibold text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {key === 'emailNotifications' && 'Receive notifications via email'}
                            {key === 'smsNotifications' && 'Receive SMS notifications'}
                            {key === 'pushNotifications' && 'Receive push notifications'}
                            {key === 'orderUpdates' && 'Get updates about your orders'}
                            {key === 'promotions' && 'Receive promotional offers'}
                            {key === 'newsletter' && 'Subscribe to our newsletter'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setPreferences({...preferences, [key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-serif font-bold text-white">Payment Methods</h2>
                    <button className="btn-primary">Add New Method</button>
                  </div>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-6 glass-dark rounded-2xl border border-gray-700">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {method.type === 'card' ? `${method.brand} ****${method.last4}` : `bKash ${method.number}`}
                            </p>
                            <p className="text-sm text-gray-400">
                              {method.isDefault ? 'Default payment method' : 'Available'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {method.isDefault && (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold border border-green-500/30">
                              Default
                            </span>
                          )}
                          <button className="text-gray-400 hover:text-red-400 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="p-6 glass-dark rounded-2xl border border-gray-700">
                      <h3 className="font-semibold text-white mb-2">Change Password</h3>
                      <p className="text-gray-400 text-sm mb-4">Update your password to keep your account secure</p>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current password"
                          className="w-full px-4 py-3 dark-input rounded-2xl"
                        />
                        <input
                          type="password"
                          placeholder="New password"
                          className="w-full px-4 py-3 dark-input rounded-2xl"
                        />
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 dark-input rounded-2xl"
                        />
                        <button className="btn-secondary">Update Password</button>
                      </div>
                    </div>

                    <div className="p-6 glass-dark rounded-2xl border border-gray-700">
                      <h3 className="font-semibold text-white mb-2">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                      <button className="btn-primary">Enable 2FA</button>
                    </div>

                    <div className="p-6 glass-dark rounded-2xl border border-red-500/30">
                      <h3 className="font-semibold text-red-400 mb-2">Danger Zone</h3>
                      <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all data</p>
                      <button className="px-6 py-3 bg-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/30 transition-colors font-semibold border border-red-500/30">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              {activeTab === 'personal' && (
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-700">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-3 btn-success"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}