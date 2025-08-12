'use client';

import { useState } from 'react';
import { useRestaurantStore } from '@/lib/store';
import { 
  BarChart, 
  Users, 
  Store, 
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const {
    orders,
    todayRevenue,
    monthRevenue,
    totalOrders,
    menuItems
  } = useRestaurantStore();

  const [selectedRestaurant, setSelectedRestaurant] = useState('restaurant-1');

  // Mock data for multiple restaurants
  const restaurants = [
    {
      id: 'restaurant-1',
      name: 'Restaurant Central',
      location: 'Abidjan, Cocody',
      status: 'active',
      todayOrders: 24,
      todayRevenue: 45000,
      tables: 12
    },
    {
      id: 'restaurant-2',
      name: 'Restaurant Plateau',
      location: 'Abidjan, Plateau',
      status: 'active',
      todayOrders: 18,
      todayRevenue: 32000,
      tables: 8
    },
    {
      id: 'restaurant-3',
      name: 'Restaurant Marcory',
      location: 'Abidjan, Marcory',
      status: 'maintenance',
      todayOrders: 0,
      todayRevenue: 0,
      tables: 10
    }
  ];

  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(r => r.status === 'active').length;
  const totalTables = restaurants.reduce((sum, r) => sum + r.tables, 0);
  const globalRevenue = restaurants.reduce((sum, r) => sum + r.todayRevenue, 0);
  const globalOrders = restaurants.reduce((sum, r) => sum + r.todayOrders, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Super Admin Dashboard</h1>
              <p className="text-purple-100">Vue d'ensemble globale du système</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-200">Revenus Globaux Aujourd'hui</p>
              <p className="text-3xl font-bold">{globalRevenue.toLocaleString()} FCFA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Restaurants</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRestaurants}</p>
                </div>
                <Store className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Actifs</p>
                  <p className="text-2xl font-bold text-green-600">{activeRestaurants}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tables Totales</p>
                  <p className="text-2xl font-bold text-blue-600">{totalTables}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commandes Aujourd'hui</p>
                  <p className="text-2xl font-bold text-orange-600">{globalOrders}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus Globaux</p>
                  <p className="text-2xl font-bold text-green-600">{globalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Restaurant Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <p className="text-sm text-gray-600">{restaurant.location}</p>
                      </div>
                      <Badge className={getStatusColor(restaurant.status)}>
                        {getStatusIcon(restaurant.status)}
                        {restaurant.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tables:</span>
                        <span className="font-medium">{restaurant.tables}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Commandes aujourd'hui:</span>
                        <span className="font-medium">{restaurant.todayOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Revenus aujourd'hui:</span>
                        <span className="font-medium text-green-600">
                          {restaurant.todayRevenue.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => setSelectedRestaurant(restaurant.id)}
                    >
                      <Monitor className="w-4 h-4 mr-2" />
                      Voir Détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600">
                          Table {order.tableId.toUpperCase()} • Restaurant Central
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total} FCFA</p>
                        <Badge className={`text-xs ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'ready' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Restaurants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{restaurant.name}</h3>
                          <p className="text-gray-600">{restaurant.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(restaurant.status)}>
                            {restaurant.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <p className="text-2xl font-bold text-blue-600">{restaurant.tables}</p>
                          <p className="text-sm text-blue-600">Tables</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded">
                          <p className="text-2xl font-bold text-orange-600">{restaurant.todayOrders}</p>
                          <p className="text-sm text-orange-600">Commandes</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <p className="text-2xl font-bold text-green-600">
                            {restaurant.todayRevenue.toLocaleString()}
                          </p>
                          <p className="text-sm text-green-600">FCFA</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="w-5 h-5" />
                    Performance Globale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Revenus totaux (mois)</span>
                      <span className="font-bold text-green-600">
                        {(monthRevenue * totalRestaurants).toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commandes totales</span>
                      <span className="font-bold">{totalOrders * totalRestaurants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Panier moyen</span>
                      <span className="font-bold">
                        {Math.round(globalRevenue / globalOrders || 0).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Tendances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Croissance mensuelle</span>
                      <Badge className="bg-green-100 text-green-800">+15.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Satisfaction client</span>
                      <Badge className="bg-blue-100 text-blue-800">4.8/5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Temps moyen service</span>
                      <Badge className="bg-orange-100 text-orange-800">18 min</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>État du Système</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Serveurs</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          En ligne
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Tous les serveurs sont opérationnels</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Base de données</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Stable
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Performances optimales</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Paiements</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Actif
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Tous les services de paiement fonctionnent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres Système</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Configuration Globale</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Notifications en temps réel</p>
                          <p className="text-sm text-gray-600">Recevoir les alertes système</p>
                        </div>
                        <Button size="sm" variant="outline">Activé</Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Maintenance automatique</p>
                          <p className="text-sm text-gray-600">Mises à jour automatiques</p>
                        </div>
                        <Button size="sm" variant="outline">Configuré</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Sécurité</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">Authentification 2FA</p>
                          <p className="text-sm text-gray-600">Sécurité renforcée</p>
                        </div>
                        <Button size="sm" variant="outline">Activer</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}