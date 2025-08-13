import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, TrendingUp, ArrowUp, Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRestaurantStore } from '@/lib/store';

function AnalyticTabs() {
  const {
    todayRevenue,
    monthRevenue,
    totalOrders,
  } = useRestaurantStore();

  return (
    <TabsContent value="analytics" className="animate-fade-in">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-orange-200 to-slate-200/80">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="p-3 bg-orange-500 rounded-xl">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              Performance du Restaurant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <span className="font-medium text-gray-700 text-lg">Revenus mensuels</span>
                <span className="font-bold text-green-600 text-2xl">
                  {monthRevenue.toLocaleString()} FCFA
                </span>
              </div>
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <span className="font-medium text-gray-700 text-lg">Commandes totales</span>
                <span className="font-bold text-blue-600 text-2xl">{totalOrders}</span>
              </div>
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                <span className="font-medium text-gray-700 text-lg">Panier moyen</span>
                <span className="font-bold text-purple-600 text-2xl">
                  {totalOrders ? Math.round(todayRevenue / totalOrders).toLocaleString() : '0'} FCFA
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-slate-500/80 to-orange-200/80">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="p-3 bg-slate-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              Tendances & KPI
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                <span className="font-medium text-gray-700 text-lg">Croissance mensuelle</span>
                <Badge className="bg-emerald-100 text-emerald-700 font-bold px-4 py-2 border border-emerald-300 text-lg">
                  <ArrowUp className="w-4 h-4 mr-2" />
                  +18.5%
                </Badge>
              </div>
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <span className="font-medium text-gray-700 text-lg">Satisfaction client</span>
                <Badge className="bg-blue-100 text-blue-700 font-bold px-4 py-2 border border-blue-300 text-lg">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  4.9/5
                </Badge>
              </div>
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                <span className="font-medium text-gray-700 text-lg">Temps moyen service</span>
                <Badge className="bg-orange-100 text-orange-700 font-bold px-4 py-2 border border-orange-300 text-lg">
                  <Clock className="w-4 h-4 mr-2" />
                  15 min
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}

export default AnalyticTabs;