import React from 'react';
import { CheckCircle2, Package, Truck, Copy, QrCode } from 'lucide-react';
import { Order } from '../types';
import { formatRupiah } from '../utils/formatters';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onViewAllOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewAllOrders
}) => {
  if (!order) return null;

  const [copiedResi, setCopiedResi] = React.useState(false);

  const copyTracking = () => {
    navigator.clipboard?.writeText(order.trackingNumber);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Banner */}
        <div className="text-center space-y-3">
          <img 
            src="/assets/aistudio/logo_ecommerce_pasar_kreatif_nusantara_transparan_62b33fce.png"
            alt="Logo Pasar Kreatif Nusantara"
            className="h-16 w-auto mx-auto object-contain drop-shadow-xs"
          />
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 font-display">Pesanan Berhasil Dikonfirmasi!</h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Terima kasih! Pesanan <span className="font-semibold text-red-950 font-mono">{order.orderNumber}</span> sedang disiapkan oleh mitra perajin Pasar Kreatif Nusantara.
          </p>
        </div>

        {/* QRIS Simulated Code if QRIS */}
        {order.paymentMethod.type === 'qris' && (
          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-900/10 text-center space-y-3">
            <div className="text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5">
              <QrCode className="w-4 h-4 text-red-900" />
              <span>Kode QRIS Resmi Transaksi</span>
            </div>
            
            {/* Synthetic SVG QR Code preview */}
            <div className="w-36 h-36 bg-white border border-stone-300 rounded-lg p-2 mx-auto flex items-center justify-center shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900">
                <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="14" y="14" width="10" height="10" fill="currentColor" />
                <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="76" y="14" width="10" height="10" fill="currentColor" />
                <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="14" y="76" width="10" height="10" fill="currentColor" />
                <rect x="42" y="10" width="8" height="8" fill="currentColor" />
                <rect x="52" y="24" width="6" height="6" fill="currentColor" />
                <rect x="42" y="42" width="16" height="16" fill="currentColor" />
                <rect x="70" y="50" width="10" height="10" fill="currentColor" />
                <rect x="85" y="75" width="8" height="8" fill="currentColor" />
                <rect x="50" y="70" width="10" height="10" fill="currentColor" />
              </svg>
            </div>
            <div className="text-[11px] text-stone-500">
              Total Tagihan: <span className="font-bold text-red-950 font-mono-numbers">{formatRupiah(order.total)}</span>
              <div className="text-emerald-700 font-medium mt-0.5">Status: Pembayaran Terverifikasi Otomatis</div>
            </div>
          </div>
        )}

        {/* Tracking & Logistics Summary */}
        <div className="p-4 rounded-xl border border-amber-900/10 bg-[#faf7f2] space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-amber-900/10">
            <span className="text-stone-700 flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-red-900" />
              <span>Ekspedisi: {order.courier.name}</span>
            </span>
            <span className="font-medium text-amber-950">Estimasi: {order.estimatedDeliveryDate}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500">Nomor Resi:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-stone-900">{order.trackingNumber}</span>
              <button
                onClick={copyTracking}
                className="text-stone-600 hover:text-stone-900 p-1 rounded hover:bg-stone-200 transition-colors cursor-pointer"
                title="Salin No Resi"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {copiedResi && <div className="text-right text-[11px] text-emerald-600">Nomor resi tersalin ke clipboard!</div>}

          <div className="flex items-start justify-between gap-3 pt-2 border-t border-amber-900/10">
            <span className="text-stone-500 shrink-0">Alamat Kirim:</span>
            <span className="text-right text-stone-800 font-medium leading-relaxed">
              {order.shippingAddress.fullName} · {order.shippingAddress.streetAddress}, {order.shippingAddress.city} {order.shippingAddress.postalCode}
            </span>
          </div>
        </div>

        {/* Ordered Items Preview */}
        <div className="space-y-2 text-xs">
          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-red-900" />
            <span>Rincian Barang Dipesan</span>
          </div>

          <div className="divide-y divide-stone-100 max-h-40 overflow-y-auto">
            {order.items.map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900 line-clamp-1">{item.product.name}</div>
                    <div className="text-stone-500 text-[11px]">Qty: {item.quantity}x</div>
                  </div>
                </div>
                <div className="font-bold text-red-950 font-mono-numbers">
                  {formatRupiah(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-amber-900/10 flex justify-between font-bold text-sm text-stone-900">
            <span>Total Tagihan</span>
            <span className="font-mono-numbers text-red-950">{formatRupiah(order.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onViewAllOrders();
            }}
            className="flex-1 py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center border border-amber-300/50"
          >
            Buka Pelacak Pesanan
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-red-950/20 cursor-pointer text-center border border-red-700/50"
          >
            Lanjut Berbelanja
          </button>
        </div>

      </div>
    </div>
  );
};
