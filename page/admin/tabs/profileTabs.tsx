import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs'; 
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Edit, Save, Camera, Mail, Phone, Clock, Globe, Users, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRestaurantStore } from '@/lib/store';          
import Image from 'next/image';

function ProfileTabs() {
  const [editingProfile, setEditingProfile] = useState(false);
  const { profile } = useRestaurantStore();

  return (
    <TabsContent value="profile" className="animate-fade-in">
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-slate-50/80 to-blue-50/80">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-slate-800 flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              Profil du Restaurant
            </CardTitle>
            <Button 
              onClick={() => setEditingProfile(!editingProfile)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {editingProfile ? (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Sauvegarder
                </>
              ) : (
                <>
                  <Edit className="w-5 h-5 mr-2" />
                  Modifier
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Image 
                    src={profile.logo} 
                    alt="Logo du restaurant"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
                  />
                  {editingProfile && (
                    <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  {editingProfile ? (
                    <input 
                      type="text" 
                      defaultValue={profile.name}
                      className="text-3xl font-bold text-slate-800 bg-transparent border-b-2 border-blue-300 focus:border-blue-600 outline-none"
                    />
                  ) : (
                    <h2 className="text-3xl font-bold text-slate-800">{profile.name}</h2>
                  )}
                  <p className="text-blue-600 font-medium mt-1">Restaurant Principal</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-700">Email</span>
                  </div>
                  {editingProfile ? (
                    <input 
                      type="email" 
                      defaultValue={profile.email}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-slate-800 ml-8">{profile.email}</p>
                  )}
                </div>

                <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-700">Téléphone</span>
                  </div>
                  {editingProfile ? (
                    <input 
                      type="tel" 
                      defaultValue={profile.phone}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-slate-800 ml-8">{profile.phone}</p>
                  )}
                </div>

                <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Globe className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-700">Adresse</span>
                  </div>
                  {editingProfile ? (
                    <textarea 
                      defaultValue={profile.address}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none resize-none"
                      rows={2}
                    />
                  ) : (
                    <p className="text-slate-800 ml-8">{profile.address}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-700">Horaires d&apos;ouverture</span>
                </div>
                {editingProfile ? (
                  <input 
                    type="text" 
                    defaultValue={profile.openingHours}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-slate-800 ml-8">{profile.openingHours}</p>
                )}
              </div>

              <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-700">Capacité</span>
                </div>
                {editingProfile ? (
                  <input 
                    type="number" 
                    defaultValue={profile.capacity}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <p className="text-slate-800 ml-8">{profile.capacity} places</p>
                )}
              </div>

              <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <div className="flex items-center mb-2">
                  <Store className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-700">Description</span>
                </div>
                {editingProfile ? (
                  <textarea 
                    defaultValue={profile.description}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none resize-none"
                    rows={4}
                  />
                ) : (
                  <p className="text-slate-800 ml-8">{profile.description}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default ProfileTabs;