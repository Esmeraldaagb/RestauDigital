'use client';

import { useState, useEffect } from 'react';
import { useRestaurantStore } from '@/lib/store';
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
  Banknote
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ManagerDashboard() {
  const {
    orders,
    todayRevenue,
    monthRevenue,
    totalOrders,
    updateOrderStatus,
    markAsPaid
  } = useRestaurantStore();

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');
  const todayOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === new Date().toDateString()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'served': return 'bg-purple-100 text-purple-800';
      case 'paid': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'preparing': return <RefreshCw className="w-4 h-4" />;
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Gestionnaire</h1>
              <p className="text-gray-600">Gérez vos commandes en temps réel</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Revenus du jour</p>
                <p className="text-2xl font-bold text-green-600">{todayRevenue.toLocaleString()} FCFA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commandes Aujourd'hui</p>
                  <p className="text-2xl font-bold text-gray-900">{todayOrders.length}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus du Jour</p>
                  <p className="text-2xl font-bold text-green-600">{todayRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus du Mois</p>
                  <p className="text-2xl font-bold text-purple-600">{monthRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Attente</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingOrders.length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active" className="relative">
              Commandes Actives
              {(pendingOrders.length + preparingOrders.length + readyOrders.length) > 0 && (
                <Badge className="ml-2 bg-red-500">
                  {pendingOrders.length + preparingOrders.length + readyOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Pending Orders */}
            {pendingOrders.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Nouvelles Commandes ({pendingOrders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 bg-yellow-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{order.customerName}</h3>
                            <p className="text-sm text-gray-600">
                              Table: {order.tableId.toUpperCase()} • 
                              {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl">{order.total} FCFA</p>
                            <div className="flex items-center gap-1 mt-1">
                              {order.paymentMethod === 'momo' ? (
                                <CreditCard className="w-4 h-4 text-green-600" />
                              ) : (
                                <Banknote className="w-4 h-4 text-orange-600" />
                              )}
                              <span className="text-sm">
                                {order.paymentMethod === 'momo' ? 'Mobile Money' : 'Espèces'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span>{item.price * item.quantity} FCFA</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            Accepter & Préparer
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedOrder(order.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preparing Orders */}
            {preparingOrders.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    En Préparation ({preparingOrders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {preparingOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{order.customerName}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            En préparation
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {new Date(order.createdAt).toLocaleTimeString()} • {order.total} FCFA
                        </p>
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Marquer comme Prêt
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ready Orders */}
            {readyOrders.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Prêtes à Servir ({readyOrders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {readyOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 bg-green-50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{order.customerName}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            Prêt
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Table: {order.tableId.toUpperCase()} • {order.total} FCFA
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => updateOrderStatus(order.id, 'served')}
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                          >
                            Servie
                          </Button>
                          {order.paymentMethod === 'cash' && (
                            <Button
                              onClick={() => markAsPaid(order.id)}
                              variant="outline"
                              className="border-green-500 text-green-600"
                            >
                              Payé
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 10).map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{order.customerName}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()} • 
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total} FCFA</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques de Vente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Commandes aujourd'hui</span>
                      <span className="font-bold">{todayOrders.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenus du jour</span>
                      <span className="font-bold text-green-600">{todayRevenue.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenus du mois</span>
                      <span className="font-bold text-purple-600">{monthRevenue.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total commandes</span>
                      <span className="font-bold">{totalOrders}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Méthodes de Paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-green-600" />
                        <span>Mobile Money</span>
                      </div>
                      <span className="font-bold">
                        {orders.filter(o => o.paymentMethod === 'momo').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-orange-600" />
                        <span>Espèces</span>
                      </div>
                      <span className="font-bold">
                        {orders.filter(o => o.paymentMethod === 'cash').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.filter(order => order.paymentMethod === 'cash' && order.status !== 'paid').map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg bg-orange-50">
                      <div>
                        <h3 className="font-medium">{order.customerName}</h3>
                        <p className="text-sm text-gray-600">
                          Table: {order.tableId.toUpperCase()} • {order.total} FCFA
                        </p>
                      </div>
                      <Button
                        onClick={() => markAsPaid(order.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Marquer comme Payé
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}