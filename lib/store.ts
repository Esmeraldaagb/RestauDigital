'use client';

import { create } from 'zustand';
import img1 from "@/assets/jollof.jpeg"
import img2 from "@/assets/banane.jpeg"
import img3 from "@/assets/bissap.jpeg"
import img4 from "@/assets/eau.jpeg"
import img5 from "@/assets/atcheke.jpeg"
import img6 from "@/assets/pooulet.jpeg"
import img7 from "@/assets/bolognaise.jpeg"
import img8 from "@/assets/legume.jpeg"
import img9 from "@/assets/gombo.jpeg"
import img10 from "@/assets/saucet.jpeg"
import img11 from "@/assets/chawarma.jpeg"
import img12 from "@/assets/burger.jpeg"
import img13 from "@/assets/nouilles.jpeg"
import img14 from "@/assets/pilon.jpeg"
import img15 from "@/assets/mangue.jpeg"
import img16 from "@/assets/pasteque.jpeg"
import img17 from "@/assets/ananas.jpeg"
import img18 from "@/assets/gingembre.jpeg"

import type { StaticImageData } from 'next/image';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | StaticImageData;
  available: boolean;
  customizations?: string[];
}

export interface OrderItem extends MenuItem {
  quantity: number;
  customizations: string[];
  tableId: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'paid';
  paymentMethod: 'momo' | 'cash' | 'pending';
  createdAt: Date;
  paidAt?: Date;
  customerName?: string;
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'supervisor' | 'admin';
  status: 'active' | 'blocked';
  avatar: string;
  phone: string;
  joinedDate: string;
  lastLogin: string;
}

export interface RestaurantProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  openingHours: string;
  capacity: number;
  logo: string;
}

interface RestaurantStore {
  // Menu items
  menuItems: MenuItem[];
  
  // Current order (client side)
  currentOrder: OrderItem[];
  currentTable: string;
  
  // All orders (admin side)
  orders: Order[];
  
  // Management data
  managers: Manager[];
  profile: RestaurantProfile;
  
  // Computed values
  todayRevenue: number;
  monthRevenue: number;
  totalOrders: number;
  
  // Actions
  setCurrentTable: (tableId: string) => void;
  addToOrder: (item: MenuItem, quantity: number, customizations: string[]) => void;
  removeFromOrder: (itemId: string) => void;
  clearOrder: () => void;
  submitOrder: (paymentMethod: 'momo' | 'cash') => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  markAsPaid: (orderId: string) => void;
  
  // Computed value getters
  getTodayRevenue: () => number;
  getMonthRevenue: () => number;
  getTotalOrders: () => number;
}

// Sample menu data
const sampleMenu: MenuItem[] = [
  {
    id: '1',
    name: 'Poulet Braisé',
    description: 'Poulet grillé avec épices locales, servi avec attiéké',
    price: 2500,
    category: 'Plats principaux',
    image: img6,
    available: true,
    customizations: ['Épices douces', 'Épices piquantes', 'Sans piment']
  },
  {
    id: '2',
    name: 'Riz Jollof',
    description: 'Riz parfumé aux tomates et épices, avec viande ou poisson',
    price: 2000,
    category: 'Plats principaux',
    image: img1,
    available: true,
    customizations: ['Avec viande', 'Avec poisson', 'Végétarien']
  },
  {
    id: '3',
    name: 'Attiéké Poisson',
    description: 'Attiéké traditionnel avec poisson grillé et sauce tomate',
    price: 2200,
    category: 'Plats principaux',
    image: img5,
    available: true,
    customizations: ['Poisson entier', 'Filets', 'Sauce à part']
  },
  {
    id: '4',
    name: 'Jus de Bissap',
    description: 'Jus naturel de fleurs d\'hibiscus, rafraîchissant',
    price: 500,
    category: 'Boissons',
    image: img3,
    available: true,
    customizations: ['Avec gingembre', 'Sans sucre', 'Très sucré']
  },
  {
    id: '5',
    name: 'Eau Minérale',
    description: 'Eau minérale fraîche 1.5L',
    price: 300,
    category: 'Boissons',
    image: img4,
    available: true
  },
  {
    id: '6',
    name: 'Banane Plantain',
    description: 'Bananes plantains frites, croustillantes',
    price: 800,
    category: 'Accompagnements',
    image: img2,
    available: true,
    customizations: ['Bien cuites', 'Moyennement cuites']
  },
  {
    id: '7',
    name: 'Bolognaise fromage',
    description: 'Bolognaise avec du fromage fondu',
    price: 800,
    category: 'Plats principaux',
    image: img7,
    available: true,
    customizations: ['Sans fromages', 'Bien pimenté', 'Sans piment']
  },
  {
    id: '8',
    name: 'Sauce Légume',
    description: 'Sauce Légume tchayo & akassa',
    price: 3000,
    category: 'Plats principaux',
    image: img8,
    available: true,
    customizations: ['Moins d\'huile', 'Sans peau de vache', 'Sans poisson', 'Avec huile rouge']
  },
  {
    id: '9',
    name: 'Sauce gombo',
    description: 'Gombo 4 pièces',
    price: 3000,
    category: 'Plats principaux',
    image: img9,
    available: true,
    customizations: ['Moins d\'huile', 'Sans peau de vache', 'Sans poisson', 'Avec huile rouge', 'Sans gambas']
  },
  {
    id: '10',
    name: 'Sauce riz',
    description: 'Riz sauce tomate',
    price: 2000,
    category: 'Plats principaux',
    image: img10,
    available: true,
    customizations: ['Poisson', 'Fromage', 'Oeuf', 'Saucisse', 'Sans piment']
  },
  {
    id: '11',
    name: 'Chawarma viande',
    description: 'Chawarma algérienne + viande',
    price: 1500,
    category: 'Fast-food',
    image: img11,
    available: true,
    customizations: ['Poulet', 'Boeuf', 'Piment', 'Sans piment']
  },
  {
    id: '12',
    name: 'Burger',
    description: 'Burger deux fromages',
    price: 2500,
    category: 'Fast-food',
    image: img12,
    available: true,
    customizations: ['Poulet', 'Boeuf', 'Piment', 'Sans piment', 'Cheddar', 'Frite', 'Sans frite']
  },
  {
    id: '13',
    name: 'Nouilles',
    description: 'Spaghetti viande',
    price: 2500,
    category: 'Plats principaux',
    image: img13,
    available: true,
    customizations: ['Poulet', 'Boeuf', 'Piment', 'Sans piment']
  },
  {
    id: '14',
    name: 'Pilon',
    description: 'Pilon de poulet braisé',
    price: 2000,
    category: 'Accompagnements',
    image: img14,
    available: true,
    customizations: ['Bien cuites', 'Moyennement cuites', 'Piment', 'Sans piment']
  },
  {
    id: '15',
    name: 'Jus mangue',
    description: 'Jus de mangue 0.5cl',
    price: 2000,
    category: 'Boissons',
    image: img15,
    available: true,
    customizations: ['Bien sucré', 'Sans sucre']
  },
  {
    id: '16',
    name: 'Jus pastèque',
    description: 'Jus de pastèque 0.5cl',
    price: 2000,
    category: 'Boissons',
    image: img16,
    available: true,
    customizations: ['Bien sucré', 'Sans sucre']
  },
  {
    id: '17',
    name: 'Jus ananas',
    description: 'Jus ananas 0.5cl',
    price: 2000,
    category: 'Boissons',
    image: img17,
    available: true,
    customizations: ['Bien sucré', 'Sans sucre']
  },
  {
    id: '18',
    name: 'Jus gingembre',
    description: 'Jus gingembre 0.5cl',
    price: 2000,
    category: 'Boissons',
    image: img18,
    available: true,
    customizations: ['Bien sucré', 'Sans sucre']
  }
];

// Mock data for demo
const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'Marie Kouassi',
    tableId: 'table-a1',
    total: 12500,
    status: 'ready',
    paymentMethod: 'momo',
    items: [
      { 
        ...sampleMenu[2], 
        quantity: 1, 
        customizations: ['Poisson entier'], 
        tableId: 'table-a1' 
      },
      { 
        ...sampleMenu[3], 
        quantity: 2, 
        customizations: ['Avec gingembre'], 
        tableId: 'table-a1' 
      }
    ],
    createdAt: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '2',
    customerName: 'Kofi Asante',
    tableId: 'table-b2',
    total: 18000,
    status: 'preparing',
    paymentMethod: 'cash',
    items: [
      { 
        ...sampleMenu[7], 
        quantity: 1, 
        customizations: ['Sans peau de vache'], 
        tableId: 'table-b2' 
      },
      { 
        ...sampleMenu[1], 
        quantity: 1, 
        customizations: ['Avec viande'], 
        tableId: 'table-b2' 
      }
    ],
    createdAt: new Date(Date.now() - 45 * 60 * 1000)
  },
  {
    id: '3',
    customerName: 'Ama Osei',
    tableId: 'table-c3',
    total: 15500,
    status: 'pending',
    paymentMethod: 'pending',
    items: [
      { 
        ...sampleMenu[0], 
        quantity: 1, 
        customizations: ['Épices piquantes'], 
        tableId: 'table-c3' 
      },
      { 
        ...sampleMenu[5], 
        quantity: 1, 
        customizations: ['Bien cuites'], 
        tableId: 'table-c3' 
      }
    ],
    createdAt: new Date(Date.now() - 15 * 60 * 1000)
  }
];

const mockManagers: Manager[] = [
  {
    id: '1',
    name: 'Jean-Baptiste Kouame',
    email: 'jb.kouame@restaurant.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+225 07 12 34 56 78',
    joinedDate: '2023-01-15',
    lastLogin: '2024-01-15 14:30'
  },
  {
    id: '2',
    name: 'Aminata Traore',
    email: 'a.traore@restaurant.com',
    role: 'manager',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+225 05 98 76 54 32',
    joinedDate: '2023-03-20',
    lastLogin: '2024-01-15 12:15'
  },
  {
    id: '3',
    name: 'Koffi Yao',
    email: 'k.yao@restaurant.com',
    role: 'supervisor',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+225 01 23 45 67 89',
    joinedDate: '2023-06-10',
    lastLogin: '2024-01-14 18:45'
  },
  {
    id: '4',
    name: 'Fatoumata Diallo',
    email: 'f.diallo@restaurant.com',
    role: 'manager',
    status: 'blocked',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+225 09 87 65 43 21',
    joinedDate: '2023-08-05',
    lastLogin: '2024-01-10 09:20'
  }
];

const mockProfile: RestaurantProfile = {
  name: 'Restaurant Le Palmier',
  address: '123 Boulevard de la République, Abidjan, Côte d\'Ivoire',
  phone: '+225 27 20 12 34 56',
  email: 'contact@lepalmier.ci',
  description: 'Restaurant traditionnel ivoirien proposant une cuisine authentique dans un cadre chaleureux et convivial.',
  openingHours: '11h00 - 23h00',
  capacity: 80,
  logo: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
};

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  // Initial state
  menuItems: sampleMenu,
  currentOrder: [],
  currentTable: '',
  orders: mockOrders,
  managers: mockManagers,
  profile: mockProfile,
  todayRevenue: 0,
  monthRevenue: 0,
  totalOrders: 0,

  // Actions
  setCurrentTable: (tableId) => set({ currentTable: tableId }),

  addToOrder: (item, quantity, customizations) => {
    set((state) => {
      const existingItemIndex = state.currentOrder.findIndex(
        orderItem =>
          orderItem.id === item.id &&
          JSON.stringify(orderItem.customizations.sort()) === JSON.stringify(customizations.sort())
      );

      if (existingItemIndex >= 0) {
        const updatedOrder = [...state.currentOrder];
        updatedOrder[existingItemIndex].quantity += quantity;
        return { currentOrder: updatedOrder };
      } else {
        return {
          currentOrder: [
            ...state.currentOrder,
            {
              ...item,
              quantity,
              customizations,
              tableId: state.currentTable
            }
          ]
        };
      }
    });
  },

  removeFromOrder: (itemId) => {
    set((state) => ({
      currentOrder: state.currentOrder.filter((_, index) => index.toString() !== itemId)
    }));
  },

  clearOrder: () => set({ currentOrder: [] }),

  submitOrder: (paymentMethod) => {
    const state = get();
    if (state.currentOrder.length === 0 || !state.currentTable) return;

    const newOrder: Order = {
      id: Date.now().toString(),
      tableId: state.currentTable,
      items: state.currentOrder,
      total: state.currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      paymentMethod,
      createdAt: new Date(),
      customerName: `Client Table ${state.currentTable.replace('table-', '').toUpperCase()}`
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      currentOrder: [],
      totalOrders: state.totalOrders + 1
    }));

    // Update revenue
    get().updateRevenue();
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    }));
  },

  markAsPaid: (orderId) => {
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === orderId
          ? { ...order, status: 'paid' as const, paidAt: new Date() }
          : order
      )
    }));
    
    // Update revenue after payment
    get().updateRevenue();
  },

  // Computed value getters
  getTodayRevenue: () => {
    const state = get();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return state.orders
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime() && order.status === 'paid';
      })
      .reduce((sum, order) => sum + order.total, 0);
  },

  getMonthRevenue: () => {
    const state = get();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return state.orders
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === currentMonth && 
               orderDate.getFullYear() === currentYear && 
               order.status === 'paid';
      })
      .reduce((sum, order) => sum + order.total, 0);
  },

  getTotalOrders: () => {
    return get().orders.length;
  },

  // Helper method to update computed values
  updateRevenue: () => {
    const state = get();
    set({
      todayRevenue: state.getTodayRevenue(),
      monthRevenue: state.getMonthRevenue(),
      totalOrders: state.getTotalOrders()
    });
  }
}));

// Initialize computed values
useRestaurantStore.getState().updateRevenue();