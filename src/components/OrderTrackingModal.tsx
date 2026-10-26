import React from 'react';
import { X, Package, Truck, Copy } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { formatRupiah } from '../utils/formatters';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onAdvanceOrderStatus: (orderId: string) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  onAdvanceOrderStatus
}) => {
  if (!isOpen) return null;

  const [copiedResiId, setCopiedResiId] = React.useState<string | null>(null);

  const copyResi = (id: string, resi: string) => {
    navigator.clipboard?.writeText(resi);
    setCopiedResiId(id);
    setTimeout(() => setCopiedResiId(null), 2000);
  };

  const getStatusStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'Menunggu Pembayaran': return 0;
      case 'Diproses Penjual': return 1;
      case 'Dalam Pengiriman': return 2;
      case 'Pesanan Selesai': return 3;
      default: return 1;
    }
  };

  const STATUS_STEPS = [
    'Pesanan Diterima',
    'Diproses Perajin',
    'Dalam Pengiriman',
    'Pesanan Selesai'
  ];

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
              <h2 className="font-bold text-stone-900 text-base sm:text-lg font-display">Pelacak Pesanan Pasar Kreatif Nusantara</h2>
              <span className="text-xs text-amber-900 font-medium">
                {orders.length} riwayat transaksi aktif
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto border border-amber-200">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-stone-900 text-base">Belum Ada Pesanan Aktif</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Saat Anda melakukan pemesanan produk kriya nusantara, riwayat transaksi dan nomor resi pengiriman dapat dipantau di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const currentStepIdx = getStatusStepIndex(order.status);
                return (
                  <div key={order.id} className="border border-amber-900/15 rounded-2xl overflow-hidden bg-[#faf7f2]">
                    
                    {/* Order Meta Header */}
                    <div className="p-4 bg-white border-b border-amber-900/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-mono font-bold text-red-950 text-sm">
                          {order.orderNumber}
                        </div>
                        <div className="text-stone-500 text-[11px]">
                          Tanggal: {order.createdAt} · {order.paymentMethod.name}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-900 font-semibold rounded-md text-[11px] border border-amber-300">
                          {order.status}
                        </span>
                        
                        {order.status !== 'Pesanan Selesai' && (
                          <button
                            onClick={() => onAdvanceOrderStatus(order.id)}
                            className="px-2.5 py-1 bg-red-900 hover:bg-red-950 text-white rounded-md text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Simulasikan langkah status pengiriman"
                          >
                            Update Status ➔
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Stepper Progress Bar */}
                    <div className="p-4 sm:p-6 bg-white border-b border-amber-900/10">
                      <div className="grid grid-cols-4 gap-2 relative">
                        {STATUS_STEPS.map((stepName, idx) => {
                          const isDone = idx <= currentStepIdx;
                          const isCurrent = idx === currentStepIdx;
                          return (
                            <div key={stepName} className="flex flex-col items-center text-center">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                                isDone 
                                  ? 'bg-red-900 text-amber-200' 
                                  : 'bg-stone-200 text-stone-500'
                              } ${isCurrent ? 'ring-2 ring-red-900 ring-offset-2' : ''}`}>
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span className={`text-[10px] sm:text-xs leading-tight ${
                                isCurrent ? 'font-bold text-red-950' : isDone ? 'text-stone-700' : 'text-stone-400'
                              }`}>
                                {stepName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Logistics detail */}
                    <div className="p-4 text-xs space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-stone-700">
                          <Truck className="w-4 h-4 text-red-900" />
                          <span className="font-semibold">{order.courier.name}</span>
                          <span className="text-stone-500">({order.courier.service})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-stone-500">Resi:</span>
                          <span className="font-mono font-bold text-stone-900">{order.trackingNumber}</span>
                          <button
                            onClick={() => copyResi(order.id, order.trackingNumber)}
                            className="text-stone-500 hover:text-stone-900 cursor-pointer p-0.5"
                            title="Salin nomor resi"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          {copiedResiId === order.id && <span className="text-[10px] text-emerald-600">Tersalin!</span>}
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="divide-y divide-stone-200/60 pt-2 border-t border-stone-200/60">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-2 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-stone-900 line-clamp-1">{item.product.name}</div>
                                <div className="text-[11px] text-stone-500">{item.quantity} barang · {formatRupiah(item.product.price)}</div>
                              </div>
                            </div>
                            <span className="font-bold text-red-950 font-mono-numbers">
                              {formatRupiah(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-amber-900/10 flex justify-between font-bold text-stone-900 text-sm">
                        <span>Total Belanja</span>
                        <span className="font-mono-numbers text-red-950">{formatRupiah(order.total)}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
