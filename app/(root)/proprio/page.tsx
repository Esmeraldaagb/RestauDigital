'use client';

import Link from 'next/link';
import { QrCode, Users, BarChart3, Utensils } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 text-white rounded-full mb-6">
            <Utensils className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Restaurant<span className="text-orange-500">QR</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Système de gestion de commandes par QR Code pour restaurants modernes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Client Interface */}
          {/* <Link href="/table/table-1" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <QrCode className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Interface Client</h3>
              <p className="text-gray-600 mb-4">Scanner le QR code pour accéder au menu et passer commande</p>
              <div className="text-green-600 font-semibold group-hover:text-green-700">
                Table 1 (Demo) →
              </div>
            </div>
          </Link> */}

          {/* Gestionnaire Dashboard */}
          <Link href="/proprio/manager" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Dashboard Gestionnaire</h3>
              <p className="text-gray-600 mb-4">Gérer les commandes, voir les statistiques et suivre les ventes</p>
              <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                Accéder au Dashboard →
              </div>
            </div>
          </Link>

          {/* Super Admin */}
          <Link href="/admin" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Super Admin</h3>
              <p className="text-gray-600 mb-4">Vue d'ensemble globale et gestion complète du système</p>
              <div className="text-purple-600 font-semibold group-hover:text-purple-700">
                Panel Admin →
              </div>
            </div>
          </Link>

          {/* Demo Tables */}
          {/* <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <QrCode className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Tables Demo</h3>
            <div className="space-y-2">
              <Link href="/table/table-1" className="block text-sm text-orange-600 hover:text-orange-700">
                • Table 1
              </Link>
              <Link href="/table/table-2" className="block text-sm text-orange-600 hover:text-orange-700">
                • Table 2
              </Link>
              <Link href="/table/table-3" className="block text-sm text-orange-600 hover:text-orange-700">
                • Table 3
              </Link>
              <Link href="/table/table-4" className="block text-sm text-orange-600 hover:text-orange-700">
                • Table 4
              </Link>
            </div>
          </div> */}
        </div>


      </div>
    </div>
  );
}