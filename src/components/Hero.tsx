import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockProducts';

interface HeroProps {
  onExplore: () => void;
  onApplyVoucher: (code: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onApplyVoucher }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f3] via-[#f7f2ea] to-[#faf7f2] border-b border-amber-900/10">
      
      {/* Decorative subtle Nusantara cultural glow in background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-800/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-100/70 border border-amber-300/60 text-amber-950 text-xs font-semibold tracking-wide">
              <Award className="w-4 h-4 text-amber-700" />
              <span>Etalase Resmi Karya & Produk Kreatif UMKM Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.16] font-display">
              Pesona kriya autentik & inovasi modern di <span className="text-red-900 underline decoration-amber-500/60 decoration-wavy decoration-2">Pasar Kreatif Nusantara</span>.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 max-w-xl leading-relaxed">
              Jembatan belanja langsung dari tangan perajin, barista kopi dataran tinggi, desainer tenun kontemporer, dan kreator teknologi lokal dengan jaminan orisinalitas 100%.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-950 hover:to-red-900 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-red-900/20 cursor-pointer whitespace-nowrap active:scale-[0.98] border border-red-700/50"
              >
                <span>Jelajahi Koleksi Nusantara</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={() => onApplyVoucher('DISKON30')}
                className="flex items-center gap-2 px-5 py-3.5 bg-white border border-amber-300 text-amber-950 rounded-xl text-sm font-semibold hover:bg-amber-50/70 hover:border-amber-400 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Klaim Kupon Nusantara 30%</span>
              </button>
            </div>

            {/* Micro proof bar */}
            <div className="pt-4 border-t border-amber-900/10 flex flex-wrap items-center gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-900" />
                <span>100% Autentik Terverifikasi</span>
              </div>
              <span aria-hidden="true" className="text-amber-800/30">·</span>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-red-900" />
                <span>Bebas Ongkir Sabang - Merauke</span>
              </div>
              <span aria-hidden="true" className="text-amber-800/30">·</span>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-red-900" />
                <span>Jaminan Garansi 14 Hari</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with Ornate Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 border-2 border-amber-900/15 shadow-xl shadow-amber-950/10 aspect-[4/3] lg:aspect-[16/11] group">
              <img
                src={HERO_IMAGE}
                alt="Kurasi kriya seni dan seduhan nusantara"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/85 via-red-950/25 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
                    Koleksi Kurasi Pilihan
                  </div>
                  <div className="text-lg font-bold font-display text-white">
                    Peralatan Seduh Tradisi & Keramik Kasongan
                  </div>
                  <div className="text-xs text-stone-200">
                    Perpaduan tanah liat lokal berkualitas tinggi dengan estetika masa kini
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
