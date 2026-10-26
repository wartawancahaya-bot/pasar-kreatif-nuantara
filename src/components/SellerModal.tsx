import React, { useState } from 'react';
import { X, Store, Check, Plus } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/mockProducts';

interface SellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

export const SellerModal: React.FC<SellerModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[1],
    price: '',
    originalPrice: '',
    stock: '25',
    sellerName: 'Sanggar Kriya Nusantara',
    sellerCity: 'Yogyakarta',
    description: '',
    material: 'Serat Alam & Pewarna Alami',
    warranty: 'Garansi Keaslian 100%'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const priceNum = parseInt(formData.price.replace(/\D/g, ''), 10) || 100000;
    const origPriceNum = formData.originalPrice 
      ? parseInt(formData.originalPrice.replace(/\D/g, ''), 10) 
      : Math.round(priceNum * 1.2);

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: priceNum,
      originalPrice: origPriceNum,
      rating: 5.0,
      reviewCount: 1,
      salesCount: 0,
      seller: {
        name: formData.sellerName || 'Mitra Pasar Kreatif',
        city: formData.sellerCity || 'Yogyakarta',
        verified: true,
        rating: 5.0,
        responseTime: '± 5 menit',
        avatarText: (formData.sellerName || 'PK').slice(0, 2).toUpperCase()
      },
      description: formData.description || 'Karya kriya eksklusif perajin nusantara dengan standar material alami bermutu tinggi.',
      specifications: {
        'Material Utama': formData.material || 'Material Alami Pilihan',
        'Garansi': formData.warranty || 'Jaminan Orisinalitas',
        'Asal Daerah': formData.sellerCity || 'Indonesia'
      },
      stock: parseInt(formData.stock, 10) || 20,
      images: [
        '/src/assets/images/hero_marketplace_lifestyle_1792992827719.jpg'
      ],
      tags: ['Karya Kreatif', 'UMKM Nusantara', 'Produk Autentik'],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: 'Kurator Seni Nusantara',
          rating: 5,
          date: 'Hari ini',
          comment: 'Produk telah lolos kurasi mutu kerajinan Pasar Kreatif Nusantara.',
          helpfulCount: 8
        }
      ]
    };

    onAddProduct(newProduct);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
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
              <h2 className="font-bold text-stone-900 text-base sm:text-lg font-display">Mulai Berjualan di Pasar Kreatif Nusantara</h2>
              <p className="text-xs text-amber-900 font-medium">Buka etalase produk UMKM dan karya kriya Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">Produk Karya Berhasil Dipublikasikan!</h3>
            <p className="text-xs text-stone-600">
              Karya Anda kini langsung aktif di etalase resmi Pasar Kreatif Nusantara dan siap dibeli.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
            <p className="text-xs text-stone-600 leading-relaxed">
              Daftarkan produk lokal buatan Anda langsung ke etalase nasional dengan verifikasi instan.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Nama Produk Kreatif</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Tenun Ikat Pewarna Alam Alor"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900 bg-white"
                  >
                    {CATEGORIES.filter(c => c !== 'Semua Kategori').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="350000"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Stok Awal</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Kota Asal Pengiriman</label>
                  <input
                    type="text"
                    value={formData.sellerCity}
                    onChange={(e) => setFormData({ ...formData, sellerCity: e.target.value })}
                    placeholder="Yogyakarta"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Nama Sanggar / Toko Anda</label>
                <input
                  type="text"
                  value={formData.sellerName}
                  onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                  placeholder="Sanggar Kriya Nusantara"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Deskripsi Produk & Cerita Pembuatan</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ceritakan proses pembuatan, filosofi motif, atau keunggulan karya Anda..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-900"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-semibold rounded-xl hover:bg-stone-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-red-950/20 cursor-pointer border border-red-700/50"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Publikasikan ke Etalase Nusantara</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
