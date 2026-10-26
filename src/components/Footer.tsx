import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Sparkles } from 'lucide-react';

interface FooterProps {
  onScrollToCategory: (cat: string) => void;
  onOpenSellerModal: () => void;
  onOpenOrders: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToCategory,
  onOpenSellerModal,
  onOpenOrders
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/20 relative overflow-hidden">
      
      {/* Decorative top pattern line */}
      <div className="h-1 bg-gradient-to-r from-red-900 via-amber-500 to-red-900" />

      {/* Trust & Guarantee Strip */}
      <div className="border-b border-stone-800/80 bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white text-sm font-semibold">100% Karya Asli Nusantara</h4>
                <p className="text-xs text-stone-400 mt-0.5">Dikurasi langsung dari sanggar seni, pengrajin, dan UMKM resmi Indonesia.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white text-sm font-semibold">Bebas Ongkir Seluruh Negeri</h4>
                <p className="text-xs text-stone-400 mt-0.5">Pengiriman aman dari Sabang sampai Merauke dengan kurir tepercaya.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white text-sm font-semibold">Jaminan Garansi 14 Hari</h4>
                <p className="text-xs text-stone-400 mt-0.5">Pengembalian mudah jika produk mengalami cacat produksi atau kerusakan kirim.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Headphones className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white text-sm font-semibold">Layanan Pelanggan Ramah</h4>
                <p className="text-xs text-stone-400 mt-0.5">Dukungan transaksi setiap hari untuk memastikan belanja nyaman.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/logo_ecommerce_pasar_kreatif_nusantara_transparan_62b33fce.png"
                alt="Logo Pasar Kreatif Nusantara"
                className="h-14 w-auto object-contain bg-white/5 p-1 rounded-xl border border-white/10"
              />
              <div>
                <div className="text-lg font-bold text-white tracking-tight font-display">
                  Pasar Kreatif Nusantara
                </div>
                <div className="text-[11px] text-amber-400 uppercase tracking-wider font-semibold">
                  E-Commerce UMKM & Kriya Indonesia
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Platform e-commerce resmi yang mempertemukan keunggulan karya perajin kriya nusantara, kopi dataran tinggi, tenun etnik kontemporer, dan inovasi kreatif dengan penikmat produk lokal di seluruh Indonesia.
            </p>
            <div className="text-xs text-stone-500 pt-1">
              Gedung Pasar Kreatif Nusantara, Jl. Jend. Sudirman Kav. 28, Jakarta Pusat
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Kategori Pilihan</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onScrollToCategory('Audio & Elektronik')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Audio & Elektronik
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToCategory('Kopi & Kuliner Lokal')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Kopi & Kuliner Nusantara
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToCategory('Pakaian & Mode')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Batik & Busana Tenun
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToCategory('Rumah & Gaya Hidup')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Keramik Kasongan & Kriya Kayu
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Layanan Ekosistem</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenOrders} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Lacak Resi Pengiriman
                </button>
              </li>
              <li>
                <button onClick={onOpenSellerModal} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Daftar Sebagai Mitra Toko Perajin
                </button>
              </li>
              <li>
                <span className="text-stone-400">Metode Pembayaran: QRIS, BCA, Mandiri, COD</span>
              </li>
              <li>
                <span className="text-stone-400">Dukungan Logistik: SiCepat, JNE YES, GoSend Instant</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Pasar Kreatif Nusantara. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1.5 text-amber-400/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bangga Buatan Indonesia · Karya Asli Nusantara</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
