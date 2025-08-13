import React from 'react'
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Monitor, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRestaurantStore } from '@/lib/store';
function monitoringTabs() {
    
  return (
    <div>
                    <TabsContent value="monitoring" className="animate-fade-in">
                      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50/80 to-green-50/80">
                          <CardTitle className="text-3xl font-bold text-slate-800 flex items-center">
                            <div className="p-3 bg-emerald-100 rounded-xl mr-4">
                              <Monitor className="w-8 h-8 text-emerald-600" />
                            </div>
                            État du Système en Temps Réel
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                          <div className="grid gap-8 md:grid-cols-3">
                            <div className="p-8 border border-emerald-200 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-500 hover:scale-105">
                              <div className="flex items-center justify-between mb-6">
                                <span className="font-bold text-slate-800 text-xl">Serveurs</span>
                                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300 font-medium px-3 py-1">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  En ligne
                                </Badge>
                              </div>
                              <div className="space-y-4">
                                <p className="text-gray-600">Tous les serveurs sont opérationnels</p>
                                <div className="w-full bg-emerald-200 rounded-full h-3">
                                  <div className="bg-emerald-500 h-3 rounded-full w-[98%] animate-pulse"></div>
                                </div>
                                <p className="text-sm text-emerald-600 font-medium">98% uptime</p>
                              </div>
                            </div>
                            
                            <div className="p-8 border border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-500 hover:scale-105">
                              <div className="flex items-center justify-between mb-6">
                                <span className="font-bold text-slate-800 text-xl">Base de données</span>
                                <Badge className="bg-blue-100 text-blue-700 border border-blue-300 font-medium px-3 py-1">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Stable
                                </Badge>
                              </div>
                              <div className="space-y-4">
                                <p className="text-gray-600">Performances optimales</p>
                                <div className="w-full bg-blue-200 rounded-full h-3">
                                  <div className="bg-blue-500 h-3 rounded-full w-[95%] animate-pulse"></div>
                                </div>
                                <p className="text-sm text-blue-600 font-medium">85ms latence moyenne</p>
                              </div>
                            </div>
                            
                            <div className="p-8 border border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-500 hover:scale-105">
                              <div className="flex items-center justify-between mb-6">
                                <span className="font-bold text-slate-800 text-xl">Paiements</span>
                                <Badge className="bg-green-100 text-green-700 border border-green-300 font-medium px-3 py-1">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Actif
                                </Badge>
                              </div>
                              <div className="space-y-4">
                                <p className="text-gray-600">Tous les services de paiement fonctionnent</p>
                                <div className="w-full bg-green-200 rounded-full h-3">
                                  <div className="bg-green-500 h-3 rounded-full w-[100%] animate-pulse"></div>
                                </div>
                                <p className="text-sm text-green-600 font-medium">100% disponibilité</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
    </div>
  )
}

export default monitoringTabs