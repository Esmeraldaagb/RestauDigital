'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRestaurantStore } from '@/lib/store';
import { Plus, Minus, ShoppingCart, Smartphone, Banknote, Check, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function TablePage() {
  const { tableId } = useParams<{ tableId: string }>();
  const {
    menuItems,
    currentOrder,
    setCurrentTable,
    addToOrder,
    removeFromOrder,
    submitOrder
  } = useRestaurantStore();

  const [selectedCategory, setSelectedCategory] = useState('Tous');
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
    setTimeout(() => setOrderSubmitted(false), 3000);
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
     <div
  className="min-h-screen p-6 relative"
  style={{ backgroundImage: "url('/background-food.jpg')" }}
>
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-10">
      
        <div className="gradient-bg text-white p-4 sticky top-0 z-50 px-10 rounded-xl shadow-lg bg-orange-500/90 backdrop-blur-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Menu Restaurant</h1>
              <p className="text-orange-100">Table: {tableId?.toUpperCase()}</p>
            </div>
            <button
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

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
          <div className="lg:col-span-2 space-y-6">
        
            <div className="flex">
              <input
                type="text"
                placeholder="Que voulez-vous manger ?"
                className="flex-1  p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                Rechercher
              </Button>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 flex items-center justify-between text-white shadow-lg">
              <div>
                <h2 className="text-3xl font-bold">30% Off</h2>
                <p className="text-lg">Fitness Meal</p>
              </div>
              <Image src="/promo1.jpeg" alt="Promo" width={100} height={200} className="w-1/2 h-[200px] rounded-lg object-cover shadow-md" />
            </div>


            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow relative bg-white/90 backdrop-blur-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                    height={300}
                    width={400}
                  />
                  <Button
                    size="icon"
                    className="absolute top-2 right-2 rounded-full bg-white text-red-500 hover:bg-red-100"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <Badge>{item.price} FCFA</Badge>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{item.description}</p>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4">Mon Panier</h2>

            {currentOrder.length === 0 ? (
              <p className="text-center text-gray-500">Votre panier est vide</p>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {currentOrder.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image src={item.image} alt={item.name} width={20} height={20} className="w-12 h-12 rounded object-cover"/>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-orange-600">{item.price} FCFA</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => removeFromOrder(item.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-500"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToOrder(item, 1, item.customizations)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-500"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>{totalAmount} FCFA</span>
                </div>

                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="Code promo"
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                  />
                  <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                    Appliquer
                  </Button>
                </div>

                <Button
                  onClick={() => handleSubmitOrder('momo')}
                  className="w-full bg-green-500 hover:bg-green-600 h-12 mb-2"
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
