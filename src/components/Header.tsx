import React from 'react';
import { ShoppingBag, Heart, Package, Store, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenSellerModal: () => void;
  onScrollToCatalog: () => void;
  onScrollToPromo: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenSellerModal,
  onScrollToCatalog,
  onScrollToPromo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      {/* Top micro ribbon with Nusantara flair */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-amber-100 text-[11px] py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Katalog Kreatif & Seni Nusantara Resmi · Belanja Langsung dari Perajin & UMKM Indonesia</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Brand Zone with user uploaded official logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <img 
              src="/assets/aistudio/logo_ecommerce_pasar_kreatif_nusantara_transparan_62b33fce.png"
              alt="Logo Pasar Kreatif Nusantara"
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-xs"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-red-950 font-display leading-tight">
                Pasar Kreatif Nusantara
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">
                E-Commerce Karya Indonesia
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button 
              onClick={onScrollToCatalog} 
              className="hover:text-red-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
            >
              Katalog Kreatif
            </button>
            <button 
              onClick={onScrollToPromo} 
              className="hover:text-red-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
            >
              Voucher & Promo
            </button>
            <button 
              onClick={onOpenOrders} 
              className="flex items-center gap-1.5 hover:text-red-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
            >
              <Package className="w-4 h-4 text-amber-800" />
              <span>Lacak Pesanan</span>
            </button>
            <button 
              onClick={onOpenSellerModal} 
              className="flex items-center gap-1.5 hover:text-red-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
            >
              <Store className="w-4 h-4 text-amber-800" />
              <span>Mulai Berjualan</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Wishlist with Nusantara Palette */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-stone-600 hover:text-red-900 hover:bg-amber-50/70 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-amber-200"
              title="Daftar Favorit"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono-numbers">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 rounded-xl transition-all shadow-sm shadow-red-950/20 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] border border-red-700/50"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Keranjang</span>
              <span className="ml-0.5 px-2 py-0.5 bg-red-950/60 text-amber-200 text-xs font-bold rounded-md font-mono-numbers border border-amber-500/20">
                {cartItemCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
