import React, { useState } from 'react';
import { 
  X, Star, MapPin, ShieldCheck, CheckCircle2, Truck, 
  Minus, Plus, ShoppingBag, Heart, Share2, Store, Clock
} from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedVariants?: Record<string, string>) => void;
  onBuyNow: (product: Product, quantity: number, selectedVariants?: Record<string, string>) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach(v => {
        if (v.options.length > 0) {
          initial[v.name] = v.options[0];
        }
      });
    }
    return initial;
  });
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [copiedShare, setCopiedShare] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Dismiss bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-stone-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
            <span className="font-semibold">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-400">SKU-{product.id}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Salin Tautan Produk"
            >
              <Share2 className="w-4 h-4 text-amber-800" />
              <span>{copiedShare ? 'Tersalin!' : 'Bagikan'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup Detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Gallery Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-red-900 text-amber-200 text-xs font-bold px-2.5 py-1 rounded-md font-mono-numbers border border-amber-500/30">
                  Hemat {discountPercent}%
                </div>
              )}
            </div>

            {/* Seller Info Card */}
            <div className="p-4 rounded-xl border border-amber-900/15 bg-amber-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 to-amber-950 text-amber-200 font-bold flex items-center justify-center text-xs shadow-xs">
                    {product.seller.avatarText || 'PK'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-stone-900 text-sm">{product.seller.name}</h4>
                      {product.seller.verified && (
                        <span title="Toko Resmi Terverifikasi" className="inline-flex">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-500">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      <span>{product.seller.city}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-stone-900 flex items-center justify-end gap-1 font-mono-numbers">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>{product.seller.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    <span>Respon {product.seller.responseTime}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between text-xs text-stone-600">
                <span className="flex items-center gap-1 text-red-950 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Karya Asli Terverifikasi
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  Bebas Ongkir
                </span>
              </div>
            </div>
          </div>

          {/* Purchase Module Column */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Header / Titles */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <div className="flex items-center gap-1 text-amber-700 font-semibold font-mono-numbers">
                  <Star className="w-4 h-4 fill-current text-amber-500" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span aria-hidden="true">·</span>
                <span className="font-mono-numbers">{product.reviewCount} Ulasan</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-numbers">{product.salesCount}+ Terjual</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug font-display">
                {product.name}
              </h2>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-stone-50 to-amber-50/50 border border-amber-900/10 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-red-950 font-mono-numbers">
                {formatRupiah(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through font-mono-numbers">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.map((variant) => (
              <div key={variant.name} className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Pilihan {variant.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((opt) => {
                    const isSelected = selectedVariants[variant.name] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: opt })}
                        className={`px-3.5 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-950 text-amber-200 border-red-950 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity Stepper & Stock */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Jumlah Pesanan
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-stone-900 font-mono-numbers">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="p-2.5 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-stone-500">
                  Stok Tersedia: <span className="font-semibold text-amber-950 font-mono-numbers">{product.stock} unit</span>
                </div>
              </div>
            </div>

            {/* Total Subtotal Preview */}
            <div className="flex items-center justify-between text-sm pt-2 border-t border-stone-100">
              <span className="text-stone-600">Subtotal ({quantity} barang):</span>
              <span className="text-lg font-bold text-red-950 font-mono-numbers">
                {formatRupiah(product.price * quantity)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'border-stone-300 text-stone-700 hover:bg-amber-50/50 hover:border-amber-300'
                }`}
                title="Favorit"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onAddToCart(product, quantity, selectedVariants);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-white border-2 border-red-900 text-red-900 font-semibold rounded-xl hover:bg-red-50 transition-colors cursor-pointer text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>+ Keranjang</span>
              </button>

              <button
                onClick={() => {
                  onBuyNow(product, quantity, selectedVariants);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 text-white font-semibold rounded-xl transition-all shadow-md shadow-red-900/20 cursor-pointer text-sm active:scale-98 border border-red-700/50"
              >
                <span>Beli Sekarang</span>
              </button>
            </div>

          </div>

        </div>

        {/* Tabbed Section */}
        <div className="border-t border-stone-200 px-6 sm:px-8 py-6 bg-stone-50/50">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'desc'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-red-900 hover:bg-amber-50'
              }`}
            >
              Deskripsi Produk
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-red-900 hover:bg-amber-50'
              }`}
            >
              Spesifikasi Lengkap
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-red-900 hover:bg-amber-50'
              }`}
            >
              Ulasan Pembeli ({product.reviews.length})
            </button>
          </div>

          {activeTab === 'desc' && (
            <div className="prose text-stone-700 text-sm leading-relaxed max-w-none">
              <p>{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-amber-900/70 font-medium">
                {product.tags.map((tag, i) => (
                  <span key={tag}>
                    #{tag}{i < product.tags.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100 text-sm">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs sm:text-sm">
                  <span className="font-semibold text-stone-500 sm:col-span-1">{key}</span>
                  <span className="text-stone-800 sm:col-span-2 mt-0.5 sm:mt-0 font-medium">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-semibold text-xs flex items-center justify-center">
                        {rev.author[0]}
                      </div>
                      <span className="font-semibold text-stone-900 text-xs sm:text-sm">{rev.author}</span>
                      <span className="text-[11px] text-emerald-700 flex items-center gap-0.5 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Pembeli Terverifikasi
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 font-mono-numbers">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${idx < rev.rating ? 'fill-current' : 'text-stone-300'}`}
                      />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
