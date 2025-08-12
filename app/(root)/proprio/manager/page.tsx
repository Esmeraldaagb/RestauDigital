'use client';

import { useState, useEffect } from 'react';
import { 
  Clock, 
  DollarSign, 
  ShoppingBag, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  CreditCard,
  Banknote,
  Users,
  Star,
  ChefHat,
  Bell,
  Calendar,
  BarChart3,
  X,
  Plus,
  Filter
} from 'lucide-react';
import Image from 'next/image';

// Mock data for demonstration
const mockOrders = [
  {
    id: '1',
    customerName: 'Marie Dubois',
    tableId: 'table-5',
    status: 'pending',
    total: 15500,
    paymentMethod: 'momo',
    createdAt: new Date().toISOString(),
    items: [
      { name: 'Salade César', quantity: 2, price: 4500 },
      { name: 'Poulet Grillé', quantity: 1, price: 6500 }
    ]
  },
  {
    id: '2',
    customerName: 'Jean Martin',
    tableId: 'table-3',
    status: 'preparing',
    total: 8500,
    paymentMethod: 'cash',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    items: [
      { name: 'Burger Deluxe', quantity: 1, price: 8500 }
    ]
  },
  {
    id: '3',
    customerName: 'Sophie Laurent',
    tableId: 'table-7',
    status: 'ready',
    total: 12000,
    paymentMethod: 'momo',
    createdAt: new Date(Date.now() - 600000).toISOString(),
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 7000 },
      { name: 'Coca Cola', quantity: 2, price: 2500 }
    ]
  },
  {
    id: '4',
    customerName: 'Paul Durand',
    tableId: 'table-2',
    status: 'served',
    total: 9500,
    paymentMethod: 'card',
    createdAt: new Date(Date.now() - 1200000).toISOString(),
    items: [
      { name: 'Steak Frites', quantity: 1, price: 9500 }
    ]
  },
  {
    id: '5',
    customerName: 'Claire Moreau',
    tableId: 'table-1',
    status: 'pending',
    total: 7200,
    paymentMethod: 'momo',
    createdAt: new Date(Date.now() - 120000).toISOString(),
    items: [
      { name: 'Salade Grecque', quantity: 1, price: 4200 },
      { name: 'Jus d\'orange', quantity: 1, price: 3000 }
    ]
  }
];

export default function ManagerDashboard() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');
  const servedOrders = orders.filter(order => order.status === 'served');
  const todayOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === new Date().toDateString()
  );

  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const monthRevenue = 2450000; // Mock data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200';
      case 'preparing': return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
      case 'served': return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4 animate-pulse" />;
      case 'preparing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'ready': return <CheckCircle className="w-4 h-4 animate-bounce" />;
      case 'served': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const selectedOrderData = orders.find(order => order.id === selectedOrder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Header with Images and Stats */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Food Images Floating */}
        <div className="absolute top-8 left-8 w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl animate-float">
          <Image
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Salade" 
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-20 right-16 w-16 h-16 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl animate-float delay-1000">
          <Image
            src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Burger" 
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-8 left-1/4 w-14 h-14 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl animate-float delay-2000">
          <Image
            src="https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Pizza" 
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">

            <div className="flex justify-between items-start">
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
                    <ChefHat className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard Gestionnaire</h1>
                    <p className="text-blue-200 text-lg">Gérez votre restaurant en temps réel</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{currentTime.toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{currentTime.toLocaleTimeString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>

          {/* STATS - en flex centré */}
          <div className="flex justify-center gap-6 mt-10 animate-fade-in-up delay-300 flex-wrap">
            {/* Carte Stat */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center min-w-[140px]">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mx-auto mb-2">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <p className="text-white/80 text-xs mb-1">Revenus du jour</p>
              <p className="text-2xl font-bold text-white">{todayRevenue.toLocaleString()}</p>
              <p className="text-green-300 text-xs">FCFA</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center min-w-[140px]">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mx-auto mb-2">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <p className="text-white/80 text-xs mb-1">Commandes</p>
              <p className="text-2xl font-bold text-white">{todayOrders.length}</p>
              <p className="text-blue-300 text-xs">Aujourd'hui</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center min-w-[140px]">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mx-auto mb-2">
                <AlertCircle className="w-5 h-5 text-white animate-pulse" />
              </div>
              <p className="text-white/80 text-xs mb-1">En attente</p>
              <p className="text-2xl font-bold text-white">{pendingOrders.length}</p>
              <p className="text-yellow-300 text-xs">À traiter</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center min-w-[140px]">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mx-auto mb-2">
                <RefreshCw className="w-5 h-5 text-white animate-spin" />
              </div>
              <p className="text-white/80 text-xs mb-1">En cuisine</p>
              <p className="text-2xl font-bold text-white">{preparingOrders.length}</p>
              <p className="text-blue-300 text-xs">Préparation</p>
            </div>
          </div>
      </div>

      </div>

      {/* Main Content Layout */}
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Nouvelles Commandes */}
          <div className="w-80 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden animate-fade-in-up">
              <div className="bg-gradient-to-r from-orange-600 to-red-500 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white animate-bounce" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Nouvelles Commandes</h2>
                    <p className="text-orange-100">À traiter rapidement</p>
                  </div>
                  <div className="ml-auto bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-white font-bold">{pendingOrders.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {pendingOrders.map((order, index) => (
                  <div 
                    key={order.id}
                    onClick={() => setSelectedOrder(order.id)}
                    className={`p-4 border-b border-neutral-100 cursor-pointer transition-all duration-300 hover:bg-orange-50 ${
                      selectedOrder === order.id ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-neutral-900">{order.customerName}</h3>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                        {order.tableId.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-neutral-900">{order.total.toLocaleString()} FCFA</span>
                      <span className="text-xs text-neutral-500">
                        {new Date(order.createdAt).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-600 mt-1">
                      {order.items.length} article{order.items.length > 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
                
                {pendingOrders.length === 0 && (
                  <div className="p-8 text-center text-neutral-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                    <p>Aucune nouvelle commande</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Order Details */}
            {selectedOrderData && (
              <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden animate-fade-in-up">
                <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Détail de la commande</h2>
                        <p className="text-neutral-200">{selectedOrderData.customerName} - {selectedOrderData.tableId.toUpperCase()}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-neutral-500 text-sm mb-1">Status</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(selectedOrderData.status)}`}>
                        {getStatusIcon(selectedOrderData.status)}
                        <span className="capitalize">{selectedOrderData.status === 'pending' ? 'En attente' : selectedOrderData.status === 'preparing' ? 'Préparation' : selectedOrderData.status === 'ready' ? 'Prêt' : 'Servi'}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-neutral-500 text-sm mb-1">Montant total</p>
                      <p className="text-2xl font-bold text-neutral-900">{selectedOrderData.total.toLocaleString()} FCFA</p>
                    </div>
                    <div className="text-center">
                      <p className="text-neutral-500 text-sm mb-1">Paiement</p>
                      <div className="flex items-center justify-center gap-1">
                        {selectedOrderData.paymentMethod === 'momo' ? <CreditCard className="w-4 h-4" /> : <Banknote className="w-4 h-4" />}
                        <span className="font-medium">{selectedOrderData.paymentMethod === 'momo' ? 'Mobile Money' : selectedOrderData.paymentMethod === 'cash' ? 'Espèces' : 'Carte'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-neutral-900 mb-3">Articles commandés</h3>
                    <div className="space-y-2">
                      {selectedOrderData.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <div>
                            <span className="font-medium text-neutral-900">{item.name}</span>
                            <span className="text-neutral-500 ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-bold text-neutral-900">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedOrderData.status === 'pending' && (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => updateOrderStatus(selectedOrderData.id, 'preparing')}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Lancer en préparation
                      </button>
                    </div>
                  )}
                  
                  {selectedOrderData.status === 'preparing' && (
                    <button 
                      onClick={() => updateOrderStatus(selectedOrderData.id, 'ready')}
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Marquer comme prêt
                    </button>
                  )}
                </div>
              </div>
            )}

            {!selectedOrder && (
              <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-12 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Sélectionnez une commande</h3>
                <p className="text-neutral-500">Cliquez sur une commande dans la sidebar pour voir les détails</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Table */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden animate-fade-in-up relative">
          {/* Background Pattern for Table */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='m0 40l40-40h-40v40z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative bg-gradient-to-r from-neutral-900 via-blue-900 to-indigo-900 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Récapitulatif des commandes du jour</h2>
                  <p className="text-blue-200">Toutes les commandes - {todayOrders.length} total</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                  {todayRevenue.toLocaleString()} FCFA
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-gradient-to-r from-neutral-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-800 uppercase tracking-wider">Commande</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-800 uppercase tracking-wider">Client & Table</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-800 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-800 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-800 uppercase tracking-wider">Paiement</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-800 uppercase tracking-wider">Heure</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-100">
                {todayOrders.map((order, index) => (
                  <tr 
                    key={order.id} 
                    className={`hover:bg-neutral-50 transition-all duration-300 animate-fade-in-up ${
                      order.status === 'pending' ? 'bg-orange-50/30' : 
                      order.status === 'preparing' ? 'bg-blue-50/30' :
                      order.status === 'ready' ? 'bg-green-50/30' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-neutral-600">#{order.id}</span>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-neutral-900">{order.items.length} article{order.items.length > 1 ? 's' : ''}</div>
                          <div className="text-sm text-neutral-500">{order.items[0]?.name}{order.items.length > 1 ? '...' : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-neutral-900">{order.customerName}</div>
                      <div className="text-sm text-neutral-500 uppercase font-medium">{order.tableId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">
                          {order.status === 'pending' ? 'En attente' : 
                           order.status === 'preparing' ? 'Préparation' : 
                           order.status === 'ready' ? 'Prêt' : 'Servi'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-neutral-900">{order.total.toLocaleString()}</div>
                      <div className="text-sm text-neutral-500">FCFA</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {order.paymentMethod === 'momo' ? <CreditCard className="w-4 h-4 text-blue-500" /> : 
                         order.paymentMethod === 'cash' ? <Banknote className="w-4 h-4 text-green-500" /> :
                         <CreditCard className="w-4 h-4 text-purple-500" />}
                        <span className="text-sm font-medium text-neutral-700">
                          {order.paymentMethod === 'momo' ? 'MoMo' : 
                           order.paymentMethod === 'cash' ? 'Espèces' : 'Carte'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">
                        {new Date(order.createdAt).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Préparer
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Prêt
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'served')}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Servir
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedOrder(order.id)}
                          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Voir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}