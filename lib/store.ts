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

interface RestaurantStore {
  // Menu items
  menuItems: MenuItem[];
  
  // Current order (client side)
  currentOrder: OrderItem[];
  currentTable: string;
  
  // All orders (admin side)
  orders: Order[];
  
  // Stats
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
    image:img2,
    available: true,
    customizations: ['Bien cuites', 'Moyennement cuites']
  },
   {
    id: '7',
    name: 'Bolognaise fromage',
    description: 'Bolognaise avec du fromage fondu',
    price: 800,
    category: 'Plats principaux',
    image:img7,
    available: true,
    customizations: ['Sans fromages', 'Bien pimenté','Sans piment']
  }, {
    id: '8',
    name: 'Sauce Légume',
    description: 'Sauce Légume tchayo & akassa',
    price: 3000,
    category: 'Plats principaux',
    image:img8,
    available: true,
    customizations: ['Moins dhuile', 'Sans peau de vache',"Sans poisson","Avec huile rouge"]
  }, {
    id: '9',
    name: 'Sauce gombo',
    description: 'Gombo 4 pièces',
    price: 3000,
    category: 'Plats principaux',
    image:img9,
    available: true,
        customizations: ['Moins dhuile', 'Sans peau de vache',"Sans poisson","Avec huile rouge","Sans gambas"]

  }, 
  {
    id: '10',
    name: 'Sauce riz',
    description: 'Riz sauce tomate',
    price: 2000,
    category: 'Plats principaux',
    image:img10,
    available: true,
    customizations: ['Poisson', 'Fromage',"Oeuf","Saucisse","Sans piment"]
  }, 
  {
    id: '11',
    name: 'Chawarma viande',
    description: 'Charwama algérienne +viande',
    price: 1500,
    category: 'Fast-food',
    image:img11,
    available: true,
    customizations: ['Poulet', 'Boeuf',"Piment","Sans piment"]
  },
   {
    id: '12',
    name: 'Burger',
    description: 'Burger deux fromages',
    price: 2500,
    category: 'Fast-food',
    image:img12,
    available: true,
    customizations: ['Poulet', 'Boeuf',"Piment","Sans piment","Cheddar","Frite","Sans frite"]

  },

     {
    id: '13',
    name: 'Nouilles',
    description: 'Spaghetti viande',
    price: 2500,
    category: 'Plats principaux',
    image:img13,
    available: true,
    customizations: ['Poulet', 'Boeuf',"Piment","Sans piment",]

  },
 {
    id: '14',
    name: 'Pilon',
    description: 'Pilon de poulet braisé',
    price: 2000,
    category: 'Accompagnements',
    image:img14,
    available: true,
    customizations: ['Bien cuites', 'Moyennement cuites',"Piment","Sans piment"]
  },

   {
    id: '15',
    name: 'Jus mangue',
    description: 'Jus de mangue 0.5cl',
    price: 2000,
    category: 'Boissons',
    image:img15,
    available: true,
   customizations: ['Bien sucré', 'Sans sucre']
  }, {
    id: '16',
    name: 'Jus pastèque',
    description: 'Jus de pastèque 0.5cl',
    price: 2000,
    category: 'Boissons',
    image:img16,
    available: true,
   customizations: ['Bien sucré', 'Sans sucre']
  }, 
  {
    id: '17',
    name: 'Jus ananas',
    description: 'Jus ananas 0.5cl',
    price: 2000,
    category: 'Boissons',
    image:img17,
    available: true,
    customizations: ['Bien sucré', 'Sans sucre']
  },
   {
    id: '18',
    name: 'Jus gingembre',
    description: 'Jus gingembre 0.5cl',
    price: 2000,
    category: 'Boissons',
    image:img18,
    available: true,
    customizations: ['Bien sucré', 'Sans sucre']
  },
  

];

// Sample orders for demo
const sampleOrders: Order[] = [
  {
    id: '1',
    tableId: 'table-1',
    items: [
      { ...sampleMenu[0], quantity: 2, customizations: ['Épices piquantes'], tableId: 'table-1' },
      { ...sampleMenu[3], quantity: 1, customizations: ['Avec gingembre'], tableId: 'table-1' }
    ],
    total: 5500,
    status: 'preparing',
    paymentMethod: 'momo',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    customerName: 'Client Table 1'
  },
  {
    id: '2',
    tableId: 'table-3',
    items: [
      { ...sampleMenu[1], quantity: 1, customizations: ['Avec viande'], tableId: 'table-3' },
      { ...sampleMenu[4], quantity: 2, customizations: [], tableId: 'table-3' }
    ],
    total: 2600,
    status: 'ready',
    paymentMethod: 'cash',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    customerName: 'Client Table 3'
  }
];

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  menuItems: sampleMenu,
  currentOrder: [],
  currentTable: '',
  orders: sampleOrders,
  todayRevenue: 45000,
  monthRevenue: 850000,
  totalOrders: 156,
  
  setCurrentTable: (tableId) => set({ currentTable: tableId }),
  
  addToOrder: (item, quantity, customizations) => {
    set((state) => {
      const existingItemIndex = state.currentOrder.findIndex(
        orderItem => orderItem.id === item.id && 
        JSON.stringify(orderItem.customizations) === JSON.stringify(customizations)
      );
      
      if (existingItemIndex >= 0) {
        const updatedOrder = [...state.currentOrder];
        updatedOrder[existingItemIndex].quantity += quantity;
        return { currentOrder: updatedOrder };
      } else {
        return {
          currentOrder: [...state.currentOrder, {
            ...item,
            quantity,
            customizations,
            tableId: state.currentTable
          }]
        };
      }
    });
  },
  
  removeFromOrder: (itemId) => {
    set((state) => ({
      currentOrder: state.currentOrder.filter(item => item.id !== itemId)
    }));
  },
  
  clearOrder: () => set({ currentOrder: [] }),
  
  submitOrder: (paymentMethod) => {
    const state = get();
    const newOrder: Order = {
      id: Date.now().toString(),
      tableId: state.currentTable,
      items: state.currentOrder,
      total: state.currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      paymentMethod,
      createdAt: new Date(),
      customerName: `Client Table ${state.currentTable.split('-')[1]}`
    };
    
    set((state) => ({
      orders: [newOrder, ...state.orders],
      currentOrder: [],
      totalOrders: state.totalOrders + 1
    }));
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
  }
}));