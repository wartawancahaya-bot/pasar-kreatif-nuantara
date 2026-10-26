import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';
import { CartItem, Voucher } from '../types';
import { formatRupiah } from '../utils/formatters';
import { VOUCHERS } from '../data/mockProducts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  appliedVoucher: Voucher | null;
  onApplyVoucher: (voucher: Voucher | null) => void;
  onProceedToCheckout: () => void;
  onExploreMore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  appliedVoucher,
  onApplyVoucher,
  onProceedToCheckout,
  onExploreMore
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [voucherError, setVoucherError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Free shipping threshold: 100,000 IDR
  const freeShippingThreshold = 100000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Calculate discount
  let discountAmount = 0;
  if (appliedVoucher) {
    if (subtotal >= appliedVoucher.minPurchase) {
      if (appliedVoucher.discountAmount) {
        discountAmount = appliedVoucher.discountAmount;
      } else if (appliedVoucher.discountPercent) {
        const calculated = (subtotal * appliedVoucher.discountPercent) / 100;
        discountAmount = appliedVoucher.maxDiscount ? Math.min(calculated, appliedVoucher.maxDiscount) : calculated;
      }
    }
  }

  const handleApplyCustomCode = () => {
    setVoucherError('');
    const found = VOUCHERS.find(v => v.code.toUpperCase() === inputCode.trim().toUpperCase());
    if (!found) {
      setVoucherError('Kode kupon tidak valid');
      return;
    }
    if (subtotal < found.minPurchase) {
      setVoucherError(`Minimal belanja ${formatRupiah(found.minPurchase)} untuk kupon ini`);
      return;
    }
    onApplyVoucher(found);
    setInputCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header with Nusantara Styling */}
        <div className="p-4 sm:p-5 border-b border-amber-900/10 flex items-center justify-between bg-amber-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-900 text-amber-200 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-base">Keranjang Pesanan</h2>
              <div className="text-[11px] text-amber-900">Pasar Kreatif Nusantara</div>
            </div>
            <span className="ml-2 text-xs bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md font-mono-numbers font-semibold border border-amber-300/50">
              {items.length} item
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup Keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter with Gold Gradient */}
        <div className="p-4 bg-gradient-to-r from-amber-50/70 to-orange-50/50 border-b border-amber-900/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-stone-700">
              <Truck className="w-4 h-4 text-red-900" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-semibold">Selamat! Anda berhak Bebas Ongkir se-Indonesia</span>
              ) : (
                <span>Tambah {formatRupiah(remainingForFreeShipping)} lagi untuk Bebas Ongkir</span>
              )}
            </span>
            <span className="font-semibold text-amber-900 font-mono-numbers">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-600 to-red-800 h-full transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-stone-900 text-base">Keranjang Anda masih kosong</h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Temukan produk kerajinan tangan, tenun, seduhan kopi, dan karya kreator nusantara sekarang.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExploreMore();
                }}
                className="px-5 py-2.5 bg-red-900 hover:bg-red-950 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Mulai Belanja Karya Nusantara
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-700 transition-colors p-1 cursor-pointer"
                        title="Hapus barang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                      <div className="text-[11px] text-amber-900/80 font-medium">
                        {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                      </div>
                    )}

                    <div className="text-xs font-bold text-red-950 font-mono-numbers">
                      {formatRupiah(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:bg-stone-200/60 rounded cursor-pointer"
                        title="Kurangi"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-stone-900 font-mono-numbers">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="p-1 text-stone-600 hover:bg-stone-200/60 rounded cursor-pointer disabled:opacity-30"
                        title="Tambah"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-stone-900 font-mono-numbers">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher and Checkout Section if has items */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-amber-900/10 bg-[#faf7f2] space-y-4">
            
            {/* Voucher Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-stone-700">
                <span className="flex items-center gap-1.5 text-amber-900 font-semibold">
                  <Tag className="w-3.5 h-3.5 text-red-800" />
                  Kupon Promo Nusantara
                </span>
                {appliedVoucher && (
                  <button
                    onClick={() => onApplyVoucher(null)}
                    className="text-red-700 hover:underline cursor-pointer text-[11px]"
                  >
                    Batalkan
                  </button>
                )}
              </div>

              {appliedVoucher ? (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs flex items-center justify-between text-amber-950">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">{appliedVoucher.code}</span>
                    <span className="text-stone-600">- {appliedVoucher.title}</span>
                  </div>
                  <span className="font-bold text-red-900 font-mono-numbers">-{formatRupiah(discountAmount)}</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: DISKON30"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-1.5 text-xs border border-amber-300/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900 bg-white"
                    />
                    <button
                      onClick={handleApplyCustomCode}
                      className="px-3.5 py-1.5 bg-red-900 text-white rounded-xl text-xs font-semibold hover:bg-red-950 transition-colors cursor-pointer"
                    >
                      Terapkan
                    </button>
                  </div>
                  {voucherError && (
                    <p className="text-[11px] text-red-700">{voucherError}</p>
                  )}
                  {/* Quick voucher triggers */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {VOUCHERS.map((v) => (
                      <button
                        key={v.code}
                        onClick={() => {
                          if (subtotal >= v.minPurchase) {
                            onApplyVoucher(v);
                            setVoucherError('');
                          } else {
                            setVoucherError(`Minimal belanja ${formatRupiah(v.minPurchase)} untuk ${v.code}`);
                          }
                        }}
                        className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-md text-[10px] font-mono font-medium transition-colors cursor-pointer border border-amber-300/50"
                      >
                        {v.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 pt-2 border-t border-amber-900/10 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Total Harga Produk</span>
                <span className="font-mono-numbers text-stone-900">{formatRupiah(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-800 font-semibold">
                  <span>Diskon Promo Nusantara</span>
                  <span className="font-mono-numbers">-{formatRupiah(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-amber-900/10">
                <span>Total Pembayaran</span>
                <span className="font-mono-numbers text-base text-red-950 font-bold">{formatRupiah(Math.max(0, subtotal - discountAmount))}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 text-white font-semibold rounded-xl transition-all shadow-md shadow-red-950/20 cursor-pointer text-sm active:scale-[0.99] border border-red-700/50"
            >
              <span>Lanjut ke Checkout Pesanan</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
