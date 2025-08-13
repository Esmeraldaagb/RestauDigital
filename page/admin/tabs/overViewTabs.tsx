import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShoppingBag, Users } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

export default function OverviewTabs({ orders }) {
  return (
    <TabsContent value="overview" className="space-y-8 animate-fade-in">
      {/* Activité Récente */}
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-slate-50/80 to-orange-50/80">
          <CardTitle className="text-3xl font-bold text-slate-800 flex items-center">
            <Activity className="w-8 h-8 mr-4 text-orange-600" />
            Activité Récente
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div>
            {orders.slice(0, 5).map((order, index) => (
              <div
                key={order.id}
                className={`flex justify-between items-center p-8 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-indigo-50/50 transition-all duration-500 hover:scale-[1.02] ${index !== orders.slice(0, 5).length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-slate-300 rounded-2xl flex items-center justify-center animate-pulse">
                    <ShoppingBag className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-slate-800">{order.customerName}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Users className="w-4 h-4 mr-2" />
                      Table {order.tableId.toUpperCase()} • {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-bold text-2xl text-slate-800">{order.total.toLocaleString()} FCFA</p>
                  <Badge className={`text-sm font-medium border ${
                    order.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    order.status === 'preparing' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                    order.status === 'ready' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                    'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {order.status === 'pending' ? 'En attente' :
                      order.status === 'preparing' ? 'En préparation' :
                      order.status === 'ready' ? 'Prêt' : 'Terminé'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}