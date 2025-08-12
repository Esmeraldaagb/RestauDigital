'use client';

import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
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
    category: 'Plats Principaux',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    available: true,
    customizations: ['Épices douces', 'Épices piquantes', 'Sans piment']
  },
  {
    id: '2',
    name: 'Riz Jollof',
    description: 'Riz parfumé aux tomates et épices, avec viande ou poisson',
    price: 2000,
    category: 'Plats Principaux',
    image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg',
    available: true,
    customizations: ['Avec viande', 'Avec poisson', 'Végétarien']
  },
  {
    id: '3',
    name: 'Attiéké Poisson',
    description: 'Attiéké traditionnel avec poisson grillé et sauce tomate',
    price: 2200,
    category: 'Plats Principaux',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    available: true,
    customizations: ['Poisson entier', 'Filets', 'Sauce à part']
  },
  {
    id: '4',
    name: 'Jus de Bissap',
    description: 'Jus naturel de fleurs d\'hibiscus, rafraîchissant',
    price: 500,
    category: 'Boissons',
    image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg',
    available: true,
    customizations: ['Avec gingembre', 'Sans sucre', 'Très sucré']
  },
  {
    id: '5',
    name: 'Eau Minérale',
    description: 'Eau minérale fraîche 1.5L',
    price: 300,
    category: 'Boissons',
    image: 'https://images.pexels.com/photos/1557979/pexels-photo-1557979.jpeg',
    available: true
  },
  {
    id: '6',
    name: 'Banane Plantain',
    description: 'Bananes plantains frites, croustillantes',
    price: 800,
    category: 'Accompagnements',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
    available: true,
    customizations: ['Bien cuites', 'Moyennement cuites']
  }
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