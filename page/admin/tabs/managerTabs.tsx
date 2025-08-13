"use client";
import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserPlus, Edit, Ban, CheckCircle, Trash2, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useRestaurantStore } from '@/lib/store';

function ManagerTabs() {
  const {
    managers
  } = useRestaurantStore();

  const [selectedManager, setSelectedManager] = useState<string | null>(null);
  const [showAddManager, setShowAddManager] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'blocked': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'manager': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'supervisor': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-3 h-3" />;
      case 'blocked': return <Ban className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <TabsContent value="managers" className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Gestion des Gestionnaires</h2>
        <Button
          onClick={() => setShowAddManager(true)}
          className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Ajouter un Gestionnaire
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {managers.map((manager) => (
          <Card key={manager.id} className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Image
                    src={manager.avatar}
                    alt={manager.name}
                    width={96}
                    height={96}
                    className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                    manager.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors">
                    {manager.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{manager.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rôle:</span>
                  <Badge className={`${getRoleColor(manager.role)} border font-medium capitalize`}>
                    {manager.role}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Statut:</span>
                  <Badge className={`${getStatusColor(manager.status)} border font-medium`}>
                    {getStatusIcon(manager.status)}
                    <span className="ml-2 capitalize">{manager.status === 'active' ? 'Actif' : 'Bloqué'}</span>
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Téléphone:</span>
                  <span className="text-sm font-medium text-slate-700">{manager.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dernière connexion:</span>
                  <span className="text-sm font-medium text-slate-700">{manager.lastLogin}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`flex-1 transition-all duration-300 ${
                    manager.status === 'active'
                      ? 'hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                      : 'hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  {manager.status === 'active' ? (
                    <>
                      <Ban className="w-4 h-4 mr-1" />
                      Bloquer
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Activer
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}

export default ManagerTabs;