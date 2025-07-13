import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Wallet, Smartphone, Clock, Shield, CheckCircle } from 'lucide-react';
import Header from '../../components/layout/Header';
import { useCart } from '../../context/CartContext';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  fee?: number;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, American Express' },
  { id: 'bkash', name: 'bKash', icon: Wallet, description: 'Pay with your bKash account', fee: 15 },
  { id: 'nagad', name: 'Nagad', icon: Smartphone, description: 'Pay with your Nagad account', fee: 10 },
  { id: 'cash', name: 'Cash on Delivery', icon: Wallet, description: 'Pay when your order arrives', fee: 20 },
];

export default function CheckoutPage() {
  const { items, getTotalAmount } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: 'House 45, Road 12',
    area: 'Dhanmondi',
    city: 'Dhaka',
    phone: '+880123456789',
  });
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getTotalAmount();
  const deliveryFee = 45;
  const selectedMethod = paymentMethods.find(m => m.id === selectedPayment);
  const paymentFee = selectedMethod?.fee || 0;
  const total = subtotal + deliveryFee + paymentFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-accent-900">
        <Header showSearch={false} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 gradient-accent rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-300 mb-8">Your delicious meal is on its way</p>
            
            <div className="dark-card rounded-3xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-300">Order ID</span>
                <span className="font-bold text-white">#SAV-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-300">Estimated Delivery</span>
                <div className="flex items-center space-x-2 text-accent-400">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">25-35 minutes</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Total Paid</span>
                <span className="text-2xl font-bold text-gradient">৳{total}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full btn-primary">
                Track Your Order
              </button>
              <button className="w-full dark-card text-gray-300 py-4 rounded-2xl hover:bg-white/10 transition-colors">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900">
      <Header showSearch={false} />
      
      {/* Back Button */}
      <div className="dark-card border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-all duration-300 bg-gray-800/50 hover:bg-primary-500/10 px-4 py-3 rounded-2xl">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Cart</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="dark-card rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">Delivery Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Street Address</label>
                  <input
                    type="text"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                    className="w-full dark-input rounded-2xl py-4 px-4"
                    placeholder="House number, street name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Area</label>
                  <input
                    type="text"
                    value={deliveryAddress.area}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, area: e.target.value})}
                    className="w-full dark-input rounded-2xl py-4 px-4"
                    placeholder="Area/Neighborhood"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">City</label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                    className="w-full dark-input rounded-2xl py-4 px-4"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={deliveryAddress.phone}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                    className="w-full dark-input rounded-2xl py-4 px-4"
                    placeholder="+880 123 456 789"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="dark-card rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-secondary rounded-xl flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedPayment === method.id
                          ? 'gradient-primary text-white border-transparent glow-purple'
                          : 'dark-card text-gray-300 border-gray-700 hover:border-primary-500 hover:bg-white/5'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${
                        selectedPayment === method.id ? 'bg-white/20' : 'bg-primary-500/20'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${
                          selectedPayment === method.id ? 'text-white' : 'text-primary-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{method.name}</p>
                        <p className={`text-sm ${
                          selectedPayment === method.id ? 'text-white/80' : 'text-gray-400'
                        }`}>
                          {method.description}
                        </p>
                        {method.fee && (
                          <p className={`text-xs font-medium ${
                            selectedPayment === method.id ? 'text-white/60' : 'text-gray-500'
                          }`}>
                            +৳{method.fee} fee
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Card Details Form */}
              {selectedPayment === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      className="w-full dark-input rounded-2xl py-4 px-4"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        className="w-full dark-input rounded-2xl py-4 px-4"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">CVV</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        className="w-full dark-input rounded-2xl py-4 px-4"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      className="w-full dark-input rounded-2xl py-4 px-4"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="dark-card rounded-3xl p-8 sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.menuItem.id} className="flex items-center space-x-4">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{item.menuItem.name}</p>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-white">৳{item.menuItem.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-700 pt-6 space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery Fee</span>
                  <span>৳{deliveryFee}</span>
                </div>
                {paymentFee > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Payment Fee</span>
                    <span>৳{paymentFee}</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-gradient">৳{total}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center space-x-3 mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <Shield className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-green-400">Secure Payment</p>
                  <p className="text-xs text-green-300">Your payment information is encrypted</p>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full btn-success mt-6 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Place Order • ৳${total}`}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By placing this order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}