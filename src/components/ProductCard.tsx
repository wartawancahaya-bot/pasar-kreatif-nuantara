import React from 'react';
import { Star, MapPin, Plus, Heart } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-white border border-stone-200 hover:border-amber-300 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-amber-950/5 hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-red-50 text-red-700 border border-red-200 shadow-xs'
              : 'bg-white/85 text-stone-600 hover:text-red-900 hover:bg-white border border-stone-200/60 shadow-xs'
          }`}
          title={isWishlisted ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Nusantara Heritage Discount Tag */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-900 text-amber-200 text-[11px] font-bold px-2 py-0.5 rounded-md tracking-wider font-mono-numbers border border-amber-500/30 shadow-xs">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Card Content Stage */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3 bg-white">
        
        <div className="space-y-1.5">
          {/* Unboxed Metadata: Category & Location */}
          <div className="flex items-center gap-1.5 text-xs text-amber-900/80 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 truncate text-stone-500 font-normal">
              <MapPin className="w-3 h-3 shrink-0 text-amber-700" />
              {product.seller.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-red-950 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Rating and Social Proof */}
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <div className="flex items-center gap-1 text-amber-700 font-semibold font-mono-numbers">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-stone-500 font-mono-numbers">
            {product.reviewCount} ulasan
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-stone-500 font-mono-numbers">
            {product.salesCount}+ terjual
          </span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-red-950 font-mono-numbers">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono-numbers">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-950 bg-amber-50 hover:bg-red-900 hover:text-white rounded-xl transition-all cursor-pointer shrink-0 border border-amber-200 hover:border-red-900 active:scale-95"
            title="Tambah ke Keranjang"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Beli</span>
          </button>
        </div>

      </div>
    </div>
  );
};
