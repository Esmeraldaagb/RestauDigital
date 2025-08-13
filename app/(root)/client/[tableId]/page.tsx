'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRestaurantStore } from '@/lib/store';
import { Plus, Minus, ShoppingCart, Smartphone, Banknote, Check, Heart, Search, X, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showMomoModal, setShowMomoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    if (tableId) {
      setCurrentTable(tableId);
    }
  }, [tableId, setCurrentTable]);

  const categories = ['Tous', ...Array.from(new Set(menuItems.map(item => item.category)))];
  
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalAmount = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = currentOrder.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: any, customization: string = '') => {
    addToOrder(item, 1, customization ? [customization] : []);
  };

  const handleMomoPayment = async () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowMomoModal(false);
      submitOrder('momo');
      setShowSuccessModal(true);
      setPhoneNumber('');
    }, 2000);
  };

  const handleCashPayment = () => {
    submitOrder('cash');
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-bold">Menu Restaurant</h1>
              <p className="text-orange-100 text-sm md:text-base">Table: {tableId?.toUpperCase()}</p>
            </div>
            <button
              onClick={() => setCartVisible(!cartVisible)}
              className="relative bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 lg:hidden"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-bounce">
                  {totalItems}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <div className="flex animate-slide-up">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Que voulez-vous manger ?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-r-none border-r-0 focus:ring-orange-500"
                />
              </div>
              <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600 h-12 px-6">
                Rechercher
              </Button>
            </div>

            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg animate-fade-in hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold animate-pulse">30% Off</h2>
                  <p className="text-lg md:text-xl">Fitness Meal</p>
                  <Button className="mt-3 bg-white text-orange-500 hover:bg-orange-50">
                    Commander maintenant
                  </Button>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard className="w-16 h-16" />
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 animate-slide-up">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 md:h-48 object-cover"
                      height={300}
                      width={400}
                    />
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 rounded-full bg-white/90 text-red-500 hover:bg-red-100 hover:scale-110 transition-all duration-300"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Badge className="absolute top-2 left-2 bg-black">
                      {item.price} FCFA
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                      className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 animate-slide-left">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Mon Panier ({totalItems})
              </h2>

              {currentOrder.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {currentOrder.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-fade-in">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={50} 
                          height={50} 
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-orange-600 text-sm">{item.price} FCFA</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromOrder(index.toString())}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => addToOrder(item, 1, item.customizations)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-bold text-xl mb-6 p-3 bg-orange-50 rounded-lg">
                    <span>Total:</span>
                    <span className="text-orange-600">{totalAmount.toLocaleString()} FCFA</span>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowMomoModal(true)}
                      className="w-full bg-green-500 hover:bg-green-600 h-12 transition-all duration-300 hover:scale-105"
                    >
                      <Smartphone className="w-5 h-5 mr-2" />
                      Payer par Mobile Money
                    </Button>
                    <Button
                      onClick={handleCashPayment}
                      variant="outline"
                      className="w-full h-12 border-orange-500 text-orange-500 hover:bg-orange-50 transition-all duration-300 hover:scale-105"
                    >
                      <Banknote className="w-5 h-5 mr-2" />
                      Payer en Espèces
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Modal */}
      <Dialog open={cartVisible} onOpenChange={setCartVisible}>
        <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-md border border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Mon Panier ({totalItems})
            </DialogTitle>
          </DialogHeader>
          
          {currentOrder.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Votre panier est vide</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {currentOrder.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={50} 
                      height={50} 
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-orange-600 text-sm">{item.price} FCFA</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromOrder(index.toString())}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => addToOrder(item, 1, item.customizations)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-500"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-xl mb-6 p-3 bg-orange-50 rounded-lg">
                <span>Total:</span>
                <span className="text-orange-600">{totalAmount.toLocaleString()} FCFA</span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setCartVisible(false);
                    setShowMomoModal(true);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 h-12"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Payer par Mobile Money
                </Button>
                <Button
                  onClick={() => {
                    setCartVisible(false);
                    handleCashPayment();
                  }}
                  variant="outline"
                  className="w-full h-12 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  <Banknote className="w-5 h-5 mr-2" />
                  Payer en Espèces
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile Money Payment Modal */}
      <Dialog open={showMomoModal} onOpenChange={setShowMomoModal}>
        <DialogContent className="max-w-md mx-auto bg-white/95 backdrop-blur-md border border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <Smartphone className="w-6 h-6 mr-2" />
              Paiement Mobile Money
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Récapitulatif de la commande</h3>
              <p className="text-sm text-gray-600">Table: {tableId?.toUpperCase()}</p>
              <p className="text-sm text-gray-600">{totalItems} article(s)</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                Total: {totalAmount.toLocaleString()} FCFA
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ex: 07 12 34 56 78"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleMomoPayment}
                  disabled={isProcessing}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Confirmer
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setShowMomoModal(false)}
                  variant="outline"
                  disabled={isProcessing}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md mx-auto text-center bg-white/95 backdrop-blur-md border border-white/20">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Commande Confirmée!</h2>
              <p className="text-gray-600 mb-4">
                Table {tableId?.toUpperCase()}, votre commande de {totalItems} article(s) 
                au montant de <span className="font-bold text-green-600">{totalAmount.toLocaleString()} FCFA</span> 
                a été enregistrée avec succès.
              </p>
              <p className="text-sm text-gray-500">
                Votre commande est en cours de préparation. Merci de patienter.
              </p>
            </div>

            <Button
              onClick={closeSuccessModal}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Parfait!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-slide-left {
          animation: slide-left 0.8s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}