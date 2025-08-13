'use client';

import Link from 'next/link';
import { QrCode, Users, BarChart3, Utensils } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-neutral-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-600 to-neutral-900 text-white rounded-full mb-6 shadow-lg animate-bounce">
            <Utensils className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-900 mb-4 tracking-tight drop-shadow">
            Restaurant<span className="text-orange-600">QR</span>
          </h1>
          <p className="text-2xl text-neutral-700 max-w-2xl mx-auto">
            Système de gestion de commandes par QR Code pour restaurants modernes
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          {/* Gestionnaire Dashboard */}
          <Link href="/proprio/manager" className="group w-full md:w-96">
            <div className="bg-gradient-to-br from-neutral-900 to-orange-600 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-200 hover:border-orange-400 relative overflow-hidden w-full">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-30"></div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors shadow">
                <BarChart3 className="w-8 h-8 text-neutral-900 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Dashboard Gestionnaire</h3>
              <p className="text-orange-100 mb-4">Gérer les commandes, voir les statistiques et suivre les ventes</p>
              <div className="text-orange-200 font-semibold group-hover:text-white transition-colors">
                Accéder au Dashboard →
              </div>
            </div>
          </Link>

          {/* Super Admin */}
          <Link href="/proprio/admin" className="group w-full md:w-96">
            <div className="bg-gradient-to-br from-orange-600 to-neutral-900 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-200 hover:border-orange-400 relative overflow-hidden w-full">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-neutral-900 rounded-full blur-2xl opacity-30"></div>
              <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-900 transition-colors shadow">
                <Users className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Super Admin</h3>
             <p className="text-orange-100 mb-4">Vue d&apos;ensemble globale et gestion complète du système</p>

              <div className="text-orange-200 font-semibold group-hover:text-white transition-colors">
                Panel Admin →
              </div>
            </div>
          </Link>

          {/* (Décommente si tu veux l'interface client) */}
          {/*
          <Link href="/table/table-1" className="group w-full md:w-96">
            <div className="bg-gradient-to-br from-neutral-900 to-orange-600 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-200 hover:border-orange-400 relative overflow-hidden w-full">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-100 rounded-full blur-2xl opacity-30"></div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors shadow">
                <QrCode className="w-8 h-8 text-neutral-900 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Interface Client</h3>
              <p className="text-orange-100 mb-4">Scanner le QR code pour accéder au menu et passer commande</p>
              <div className="text-orange-200 font-semibold group-hover:text-white transition-colors">
                Table 1 (Demo) →
              </div>
            </div>
          </Link>
          */}
        </div>
      </div>
    </div>
  );
}