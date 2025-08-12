'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRestaurantStore } from '@/lib/store';
import { Plus, Minus, ShoppingCart, Smartphone, Banknote, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function TablePage() {
  const { tableId } = useParams<{ tableId: string }>();

  const {
    menuItems,
    currentOrder,
    setCurrentTable,
    addToOrder,
    removeFromOrder,
    clearOrder,
    submitOrder
  } = useRestaurantStore();

  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showCart, setShowCart] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    if (tableId) {
      setCurrentTable(tableId);
    }
  }, [tableId, setCurrentTable]);

  const categories = ['Tous', ...Array.from(new Set(menuItems.map(item => item.category)))];
  const filteredItems = selectedCategory === 'Tous' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const totalAmount = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = currentOrder.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: any, customization: string = '') => {
    addToOrder(item, 1, customization ? [customization] : []);
  };

  const handleSubmitOrder = (paymentMethod: 'momo' | 'cash') => {
    submitOrder(paymentMethod);
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      setShowCart(false);
    }, 3000);
  };

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">Commande Envoyée!</h1>
          <p className="text-green-600 text-lg">Votre commande est en cours de préparation</p>
          <p className="text-sm text-green-500 mt-2">Table: {tableId?.toUpperCase()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-bg text-white p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Menu Restaurant</h1>
            <p className="text-orange-100">Table: {tableId?.toUpperCase()}</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                {totalItems}
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />
              <CardContent className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <Badge variant={item.available ? "default" : "secondary"}>
                    {item.price} FCFA
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                
                {item.customizations && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.customizations.map((custom) => (
                      <button
                        key={custom}
                        onClick={() => handleAddToCart(item, custom)}
                        className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                      >
                        + {custom}
                      </button>
                    ))}
                  </div>
                )}
                
                <Button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.available}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Votre Commande
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {currentOrder.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Votre panier est vide</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {currentOrder.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.customizations.length > 0 && (
                            <p className="text-sm text-gray-500">
                              {item.customizations.join(', ')}
                            </p>
                          )}
                          <p className="text-sm text-orange-600">{item.price} FCFA</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => addToOrder(item, 1, item.customizations)}
                            className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center text-xl font-bold mb-6">
                    <span>Total:</span>
                    <span>{totalAmount} FCFA</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleSubmitOrder('momo')}
                      className="w-full bg-green-500 hover:bg-green-600 h-12"
                    >
                      <Smartphone className="w-5 h-5 mr-2" />
                      Payer par Mobile Money
                    </Button>
                    
                    <Button
                      onClick={() => handleSubmitOrder('cash')}
                      variant="outline"
                      className="w-full h-12 border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                      <Banknote className="w-5 h-5 mr-2" />
                      Payer en Espèces
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </div>
        </div>
      )}
    </div>
  );
}
