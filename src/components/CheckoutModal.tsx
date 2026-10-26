import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, MapPin, Truck, CreditCard, 
  ArrowLeft, ArrowRight, QrCode, Building, Wallet, Banknote 
} from 'lucide-react';
import { CartItem, ShippingAddress, CourierOption, PaymentMethod, Voucher, Order } from '../types';
import { formatRupiah, generateOrderNumber, generateTrackingNumber } from '../utils/formatters';
import { COURIER_OPTIONS, PAYMENT_METHODS } from '../data/mockProducts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedVoucher: Voucher | null;
  onOrderComplete: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedVoucher,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (appliedVoucher && subtotal >= appliedVoucher.minPurchase) {
    if (appliedVoucher.discountAmount) {
      discountAmount = appliedVoucher.discountAmount;
    } else if (appliedVoucher.discountPercent) {
      const calculated = (subtotal * appliedVoucher.discountPercent) / 100;
      discountAmount = appliedVoucher.maxDiscount ? Math.min(calculated, appliedVoucher.maxDiscount) : calculated;
    }
  }

  // Address state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Rizky Pratama',
    phoneNumber: '081234567890',
    streetAddress: 'Jl. Senopati No. 45, Kebayoran Baru',
    district: 'Kebayoran Baru',
    city: 'Jakarta Selatan',
    postalCode: '12190',
    notes: 'Pagar warna hitam, titip di pos sekuriti jika tidak ada orang'
  });

  // Courier state
  const isEligibleFreeShipping = subtotal >= 100000;
  const availableCouriers = isEligibleFreeShipping 
    ? COURIER_OPTIONS 
    : COURIER_OPTIONS.filter(c => c.id !== 'bebas-ongkir');

  const [selectedCourier, setSelectedCourier] = useState<CourierOption>(
    isEligibleFreeShipping ? COURIER_OPTIONS[3] : COURIER_OPTIONS[0]
  );

  // Payment method state
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = selectedCourier.price;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleFinishOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generateOrderNumber(),
        createdAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingFee,
        total: grandTotal,
        shippingAddress: address,
        courier: selectedCourier,
        paymentMethod: selectedPayment,
        status: 'Diproses Penjual',
        trackingNumber: generateTrackingNumber(),
        estimatedDeliveryDate: selectedCourier.estimatedDays
      };

      setIsSubmitting(false);
      onOrderComplete(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-amber-900/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/aistudio/logo_ecommerce_pasar_kreatif_nusantara_transparan_62b33fce.png"
              alt="Logo"
              className="h-9 w-auto object-contain"
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-display">Checkout Pesanan Kreatif Nusantara</h2>
              <div className="text-xs text-amber-900 font-medium">
                {step === 'details' ? 'Langkah 1: Alamat Kirim & Ekspedisi' : 'Langkah 2: Metode Pembayaran Terverifikasi'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {step === 'details' ? (
            <div className="space-y-6">
              
              {/* Shipping Address Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <MapPin className="w-4 h-4 text-red-900" />
                  <span>Alamat Pengiriman Penerima</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                      placeholder="Contoh: Budi Santoso"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Nomor Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      value={address.phoneNumber}
                      onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                      placeholder="0812xxxxxxxx"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Alamat Jalan & Nomor Rumah</label>
                    <input
                      type="text"
                      value={address.streetAddress}
                      onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                      placeholder="Nama jalan, nomor rumah, RT/RW"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Kecamatan & Kota</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                      placeholder="Kecamatan, Kota/Kabupaten"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Kode Pos</label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                      placeholder="12345"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Catatan Tambahan untuk Kurir (Opsional)</label>
                    <input
                      type="text"
                      value={address.notes || ''}
                      onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                      placeholder="Patokan rumah, petunjuk khusus pengantaran"
                    />
                  </div>
                </div>
              </div>

              {/* Courier Selection */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                    <Truck className="w-4 h-4 text-red-900" />
                    <span>Pilihan Layanan Ekspedisi Nusantara</span>
                  </div>
                  {isEligibleFreeShipping && (
                    <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-300">
                      Bebas Ongkir Aktif
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {availableCouriers.map((courier) => {
                    const isSelected = selectedCourier.id === courier.id;
                    return (
                      <div
                        key={courier.id}
                        onClick={() => setSelectedCourier(courier)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-red-900 bg-amber-50/50 ring-1 ring-red-900'
                            : 'border-stone-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-red-900 bg-red-900' : 'border-stone-300'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-stone-900">{courier.name}</div>
                            <div className="text-[11px] text-stone-500">{courier.service} · Estimasi {courier.estimatedDays}</div>
                          </div>
                        </div>

                        <div className="text-xs sm:text-sm font-bold text-red-950 font-mono-numbers">
                          {courier.price === 0 ? (
                            <span className="text-emerald-700 font-semibold">GRATIS</span>
                          ) : (
                            formatRupiah(courier.price)
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button: Proceed to Payment */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                <div className="text-xs text-stone-500">
                  Total Estimasi: <span className="font-bold text-red-950 text-sm font-mono-numbers">{formatRupiah(grandTotal)}</span>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-red-950/20 cursor-pointer border border-red-700/50"
                >
                  <span>Lanjut ke Pembayaran</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>

            </div>
          ) : (
            /* Step 2: Payment Method Selection */
            <div className="space-y-6">
              <button
                onClick={() => setStep('details')}
                className="flex items-center gap-1.5 text-xs text-amber-950 hover:text-red-900 font-medium cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Alamat & Kurir</span>
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <CreditCard className="w-4 h-4 text-red-900" />
                  <span>Pilih Metode Pembayaran Aman</span>
                </div>

                <div className="space-y-2.5">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedPayment.id === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                          isSelected
                            ? 'border-red-900 bg-amber-50/50 ring-1 ring-red-900'
                            : 'border-stone-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-red-900 bg-red-900' : 'border-stone-300'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>

                          <div className="space-y-0.5">
                            <div className="text-xs sm:text-sm font-semibold text-stone-900 flex items-center gap-2">
                              {method.type === 'qris' && <QrCode className="w-4 h-4 text-red-900" />}
                              {method.type === 'bank_transfer' && <Building className="w-4 h-4 text-red-900" />}
                              {method.type === 'ewallet' && <Wallet className="w-4 h-4 text-red-900" />}
                              {method.type === 'cod' && <Banknote className="w-4 h-4 text-red-900" />}
                              <span>{method.name}</span>
                            </div>
                            <div className="text-[11px] text-stone-500">{method.description}</div>
                            {method.accountNumber && isSelected && (
                              <div className="mt-2 text-xs p-2 bg-amber-100/60 rounded border border-amber-300 font-mono font-medium text-amber-950">
                                Nomor Rekening / VA: {method.accountNumber}
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-xs font-semibold text-amber-950 px-2 py-0.5 rounded bg-amber-200/80 border border-amber-300">
                            Terpilih
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Breakdown Summary Box */}
              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-900/10 space-y-2 text-xs">
                <div className="font-semibold text-stone-900 text-sm pb-1 border-b border-amber-900/10 font-display">
                  Rincian Tagihan Pembayaran
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Total Harga ({items.length} jenis barang)</span>
                  <span className="font-mono-numbers text-stone-900">{formatRupiah(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-800 font-semibold">
                    <span>Diskon Kupon ({appliedVoucher?.code})</span>
                    <span className="font-mono-numbers">-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Ongkos Kirim ({selectedCourier.name})</span>
                  <span className="font-mono-numbers text-stone-900">
                    {shippingFee === 0 ? 'GRATIS' : formatRupiah(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-amber-900/10">
                  <span>Total Tagihan Akhir</span>
                  <span className="font-mono-numbers text-base text-red-950">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-600">
                <ShieldCheck className="w-4 h-4 text-red-900" />
                <span>Transaksi dilindungi oleh Garansi Aman 100% Pasar Kreatif Nusantara.</span>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleFinishOrder}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-red-950/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 border border-red-700/50"
              >
                {isSubmitting ? (
                  <span>Menyiapkan Pesanan Nusantara...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>Konfirmasi & Buat Pesanan Sekarang</span>
                  </>
                )}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
