'use client';

import { useRestaurantStore } from '@/lib/store';
import { 
  Users, 
  Store, 
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Activity,
  Zap,
  Globe,
  Star,
  ArrowUp,
 
} from 'lucide-react';
import { Card, CardContent, } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticTabs from '@/page/admin/tabs/analyticTabs';
import ManagerTabs from '@/page/admin/tabs/managerTabs';
import ProfileTabs from '@/page/admin/tabs/profileTabs';
import MonitoringTabs from '@/page/admin/tabs/monitoringTab';
import OverviewTabs from '@/page/admin/tabs/overViewTabs';
export default function AdminDashboard() {
  const {
    orders,
    todayRevenue,
    monthRevenue,
    totalOrders,
    menuItems,
    managers,
    profile
  } = useRestaurantStore();

  

  const activeManagers = managers.filter(m => m.status === 'active').length;
  const blockedManagers = managers.filter(m => m.status === 'blocked').length;

  return (
    <div className="min-h-screen relative overflow-hidden pb-12">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-orange-800/50 to-slate-600/50 backdrop-blur-sm"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-slate-500/20 to-orange-500/20 rounded-2xl backdrop-blur-sm border border-orange-400/30">
                      <Store className="w-10 h-10 text-orange-300" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div>
                    <h1 className="text-6xl font-bold text-white mb-2 tracking-tight animate-fade-in">
                      {profile.name}
                    </h1>
                    <p className="text-2xl text-orange-200 animate-fade-in delay-300">Dashboard de Gestion</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8 text-orange-600 animate-fade-in delay-500">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{activeManagers} Gestionnaires Actifs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>{totalOrders} Commandes Aujourd&apos;hui</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Capacité: {profile.capacity} places</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right bg-gradient-to-br from-white/20 to-slate-500/20 backdrop-blur-sm rounded-3xl p-8 border border-orange-400/30 animate-fade-in delay-700">
                <p className="text-orange-200 mb-2 text-lg">Revenus Aujourd&apos;hui</p>
                <p className="text-5xl font-bold text-white mb-2 animate-pulse">{todayRevenue.toLocaleString()}</p>
                <p className="text-xl text-orange-300">FCFA</p>
                <div className="flex items-center justify-end mt-3 text-emerald-300">
                  <ArrowUp className="w-5 h-5 mr-2 animate-bounce" />
                  <span className="text-lg font-medium">+18.5% vs hier</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-15">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 -mt-8 relative z-10">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Commandes Aujourd&apos;hui</p>
                    <p className="text-4xl font-bold text-slate-800 animate-pulse">{totalOrders}</p>
                    <p className="text-xs text-emerald-600 flex items-center mt-2">
                      <ArrowUp className="w-3 h-3 mr-1 animate-bounce" />
                      +12% vs hier
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl">
                    <ShoppingBag className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in delay-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Gestionnaires Actifs</p>
                    <p className="text-4xl font-bold text-emerald-600 animate-pulse">{activeManagers}</p>
                    <p className="text-xs text-emerald-600 flex items-center mt-2">
                      <Zap className="w-3 h-3 mr-1 animate-pulse" />
                      Tous connectés
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in delay-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Revenus du Mois</p>
                    <p className="text-4xl font-bold text-blue-600 animate-pulse">{Math.round(monthRevenue / 1000)}K</p>
                    <p className="text-xs text-blue-600 flex items-center mt-2">
                      <TrendingUp className="w-3 h-3 mr-1 animate-bounce" />
                      +25% ce mois
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-fade-in delay-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Satisfaction Client</p>
                    <p className="text-4xl font-bold text-purple-600 animate-pulse">4.9</p>
                    <p className="text-xs text-purple-600 flex items-center mt-2">
                      <Star className="w-3 h-3 mr-1 fill-current animate-pulse" />
                      Excellent
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl">
                    <Star className="w-8 h-8 text-purple-600 fill-current" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 rounded-2xl p-3">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-700 data-[state=active]:text-white transition-all duration-300 rounded-xl -mt-2"
              >
                Vue d&apos;ensemble
              </TabsTrigger>
              <TabsTrigger 
                value="managers" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-700 data-[state=active]:text-white transition-all duration-300 rounded-xl  -mt-2"
              >
                Gestionnaires
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-700 data-[state=active]:text-white transition-all duration-300 rounded-xl  -mt-2"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-700 data-[state=active]:text-white transition-all duration-300 rounded-xl  -mt-2"
              >
                Monitoring
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-700 data-[state=active]:text-white transition-all duration-300 rounded-xl -mt-2"
              >
                Profil
              </TabsTrigger>
            </TabsList>

              <TabsContent value="overview">
                <OverviewTabs orders={orders} />
              </TabsContent>
              <TabsContent value="managers">
                <ManagerTabs />
              </TabsContent>
              <TabsContent value="analytics">
                <AnalyticTabs />
              </TabsContent>
              <TabsContent value="monitoring">
                <MonitoringTabs />
              </TabsContent>
              <TabsContent value="profile">
                <ProfileTabs />
              </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}