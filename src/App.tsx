import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, Sparkles, Heart, 
  ShoppingBag, Tag, X, AlertCircle 
} from 'lucide-react';
import { Product, CartItem, Order, Voucher } from './types';
import { INITIAL_PRODUCTS, CATEGORIES, VOUCHERS } from './data/mockProducts';
import { formatRupiah, generateOrderNumber, generateTrackingNumber } from './utils/formatters';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SellerModal } from './components/SellerModal';
import { Footer } from './components/Footer';

export default function App() {
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pkn_products');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pkn_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pkn_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['prod-1', 'prod-3'];
  });

  // Orders state with a realistic initial demo order
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('pkn_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'ord-demo-01',
        orderNumber: 'PKN-261025-8821',
        createdAt: '25 Okt 2026, 11:30',
        items: [
          {
            id: 'demo-cart-01',
            product: INITIAL_PRODUCTS[1],
            quantity: 2,
            selectedVariants: { 'Bentuk': 'Giling Sedang (V60/Aeropress)' }
          }
        ],
        subtotal: 196000,
        discount: 30000,
        shippingFee: 0,
        total: 166000,
        shippingAddress: {
          fullName: 'Rizky Pratama',
          phoneNumber: '081234567890',
          streetAddress: 'Jl. Senopati No. 45',
          district: 'Kebayoran Baru',
          city: 'Jakarta Selatan',
          postalCode: '12190'
        },
        courier: {
          id: 'bebas-ongkir',
          name: 'Kurir Rekomendasi (Bebas Ongkir)',
          service: 'Promo Bebas Ongkir Nusantara',
          price: 0,
          estimatedDays: '3 - 4 Hari'
        },
        paymentMethod: {
          id: 'pay-qris',
          name: 'QRIS Instant Pay',
          type: 'qris',
          description: 'Pembayaran otomatis'
        },
        status: 'Dalam Pengiriman',
        trackingNumber: 'EXP981249112ID',
        estimatedDeliveryDate: 'Besok, 26 Okt 2026'
      }
    ];
  });

  // Voucher state
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Persist storage
  useEffect(() => {
    localStorage.setItem('pkn_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pkn_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('pkn_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('pkn_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, selectedVariants?: Record<string, string>) => {
    const variantKey = selectedVariants ? JSON.stringify(selectedVariants) : '';
    const existingIndex = cartItems.findIndex(
      item => item.product.id === product.id && JSON.stringify(item.selectedVariants || {}) === (variantKey || '{}')
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity = Math.min(product.stock, updated[existingIndex].quantity + quantity);
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        selectedVariants
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`✓ "${product.name}" dimasukkan ke keranjang`);
  };

  const handleBuyNow = (product: Product, quantity = 1, selectedVariants?: Record<string, string>) => {
    handleAddToCart(product, quantity, selectedVariants);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems(cartItems.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== cartItemId));
    showToast('Barang dihapus dari keranjang');
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter(id => id !== product.id));
      showToast(`Dihapus dari daftar favorit`);
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      showToast(`✓ Ditambahkan ke daftar favorit`);
    }
  };

  // Add Product (Seller)
  const handleAddProduct = (newProd: Product) => {
    setProducts([newProd, ...products]);
    showToast(`✓ Produk "${newProd.name}" berhasil dipublikasikan!`);
  };

  // Order Complete
  const handleOrderComplete = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setAppliedVoucher(null);
    setIsCheckoutOpen(false);
    setCompletedOrder(newOrder);
  };

  // Advance simulated order status
  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders(orders.map(ord => {
      if (ord.id === orderId) {
        let nextStatus = ord.status;
        if (ord.status === 'Menunggu Pembayaran') nextStatus = 'Diproses Penjual';
        else if (ord.status === 'Diproses Penjual') nextStatus = 'Dalam Pengiriman';
        else if (ord.status === 'Dalam Pengiriman') nextStatus = 'Pesanan Selesai';
        return { ...ord, status: nextStatus };
      }
      return ord;
    }));
    showToast('Status pesanan berhasil diperbarui!');
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchCategory = selectedCategory === 'Semua Kategori' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.seller.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const cartTotalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col selection:bg-red-900 selection:text-amber-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-950 to-stone-900 text-amber-100 text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl border border-amber-500/30 flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header with Logo & Nusantara Branding */}
      <Header
        cartItemCount={totalCartCount}
        cartTotal={cartTotalAmount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
        onScrollToCatalog={() => {
          document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToPromo={() => {
          document.getElementById('promo')?.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Campaign Section */}
      <Hero
        onExplore={() => {
          document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onApplyVoucher={(code) => {
          const v = VOUCHERS.find(item => item.code === code);
          if (v) {
            setAppliedVoucher(v);
            showToast(`✓ Kupon ${code} diterapkan!`);
            setIsCartOpen(true);
          }
        }}
      />

      {/* Promotional Vouchers Strip with Nusantara Palette */}
      <section id="promo" className="py-6 bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-900 text-amber-200 flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Voucher Belanja Pasar Kreatif Nusantara</h3>
                <p className="text-xs text-amber-900/80">Klaim kupon langsung untuk belanja hemat produk UMKM pilihan.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {VOUCHERS.map((voucher) => (
                <div 
                  key={voucher.code}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-300/80 rounded-xl text-xs hover:border-red-900 transition-colors shadow-2xs"
                >
                  <Tag className="w-3.5 h-3.5 text-red-800" />
                  <span className="font-mono font-bold text-red-950">{voucher.code}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-stone-600 hidden sm:inline">{voucher.title}</span>
                  <button
                    onClick={() => {
                      setAppliedVoucher(voucher);
                      showToast(`✓ Voucher ${voucher.code} tersalin & diterapkan!`);
                    }}
                    className="ml-1 text-red-900 font-bold hover:underline cursor-pointer"
                  >
                    Klaim
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main id="katalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8">
        
        {/* Section Header with Search and Sorting */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-amber-800 flex items-center gap-1.5">
                <span>Kurasi Budaya & Gaya Hidup Modern</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
                Katalog Produk Pasar Kreatif Nusantara
              </h2>
            </div>

            {/* Search Input Bar with Nusantara accents */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-amber-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari headphone, batik indigo, kopi gayo..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-900/30 focus:border-red-900 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Filter Tabs & Sort Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-amber-900/10">
            
            {/* Category Segmented Control */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-red-900 to-red-800 text-amber-200 shadow-md shadow-red-950/15 border border-red-700/60'
                        : 'bg-white text-stone-700 hover:text-red-900 hover:bg-amber-50/60 border border-stone-200/90'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end lg:self-auto shrink-0 text-xs">
              <span className="text-stone-600 flex items-center gap-1 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-800" />
                Urutkan:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-amber-900/20 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-900 cursor-pointer shadow-2xs"
              >
                <option value="featured">Rekomendasi Terkurasi</option>
                <option value="price-asc">Harga: Termurah ke Termahal</option>
                <option value="price-desc">Harga: Termahal ke Termurah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto border border-amber-200">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-stone-900 text-base">Tidak ada produk yang cocok</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Tidak menemukan produk dengan kata kunci &quot;{searchQuery}&quot; pada kategori {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua Kategori');
              }}
              className="px-4 py-2 bg-red-900 text-white rounded-xl text-xs font-semibold hover:bg-red-950 transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
                onAddToCart={(p, e) => {
                  e.stopPropagation();
                  handleAddToCart(p, 1);
                }}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

      </main>

      {/* Wishlist Modal / Drawer */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-amber-900/10 flex items-center justify-between bg-amber-50/40">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-700 fill-current" />
                <h2 className="font-bold text-stone-900 text-base sm:text-lg font-display">Daftar Favorit</h2>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-mono-numbers font-semibold">
                  {wishlistProducts.length} item
                </span>
              </div>
              <button
                onClick={() => setIsWishlistModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
              {wishlistProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <Heart className="w-10 h-10 text-stone-300" />
                  <div className="font-semibold text-stone-900 text-sm">Belum ada barang favorit</div>
                  <p className="text-xs text-stone-500">Klik ikon hati pada produk untuk menyimpannya di sini.</p>
                </div>
              ) : (
                wishlistProducts.map((p) => (
                  <div key={p.id} className="py-3 flex gap-3 items-center justify-between">
                    <div 
                      onClick={() => {
                        setIsWishlistModalOpen(false);
                        setSelectedProduct(p);
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{p.name}</h4>
                        <div className="text-xs font-bold text-red-950 font-mono-numbers">{formatRupiah(p.price)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleAddToCart(p, 1);
                        }}
                        className="p-2 bg-red-900 text-white rounded-xl text-xs hover:bg-red-950 transition-colors cursor-pointer"
                        title="Beli"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(p)}
                        className="p-2 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={setAppliedVoucher}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreMore={() => {
          document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedVoucher={appliedVoucher}
        onOrderComplete={handleOrderComplete}
      />

      {/* Order Success Invoice Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onViewAllOrders={() => {
          setCompletedOrder(null);
          setIsOrdersOpen(true);
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onAdvanceOrderStatus={handleAdvanceOrderStatus}
      />

      {/* Seller Register & Product Listing Modal */}
      <SellerModal
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Domain-authentic Footer */}
      <Footer
        onScrollToCategory={(cat) => {
          setSelectedCategory(cat);
          document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

    </div>
  );
}
