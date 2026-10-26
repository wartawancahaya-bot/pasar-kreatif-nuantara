import { Product, CourierOption, PaymentMethod, Voucher } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_marketplace_lifestyle_1792992827719.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Headphone Nirkabel Audio Aeterna Pro Hi-Res',
    category: 'Audio & Elektronik',
    price: 1450000,
    originalPrice: 1890000,
    rating: 4.9,
    reviewCount: 342,
    salesCount: 1250,
    seller: {
      name: 'Aeterna Audio Official',
      city: 'Jakarta Selatan',
      verified: true,
      rating: 4.9,
      responseTime: '± 5 menit',
      avatarText: 'AA'
    },
    description: 'Headphone nirkabel kelas studio dengan peredam bising aktif (ANC) hibrida, driver neodymium 40mm beresolusi tinggi, dan daya tahan baterai hingga 45 jam pemutaran kontinyu. Menggunakan bantalan busa memori dengan lapisan kulit berpori yang sangat nyaman dipakai seharian.',
    specifications: {
      'Konektivitas': 'Bluetooth 5.3 & AUX 3.5mm',
      'Daya Tahan Baterai': 'Hingga 45 Jam (ANC On: 35 Jam)',
      'Rentang Frekuensi': '10Hz - 40.000Hz (Hi-Res Certified)',
      'Port Pengisian': 'USB Type-C Fast Charging (10 menit untuk 4 jam)',
      'Garansi': '12 Bulan Resmi Distributor Indonesia'
    },
    stock: 28,
    images: [
      '/src/assets/images/product_audio_headphones_1792992829351.jpg'
    ],
    tags: ['Hi-Res Audio', 'ANC Hybrid', 'Official Store'],
    variants: [
      {
        name: 'Warna',
        options: ['Matte Obsidian Black', 'Brushed Titanium Gray']
      }
    ],
    featured: true,
    reviews: [
      {
        id: 'rev-101',
        author: 'Bambang S.',
        rating: 5,
        date: '24 Okt 2026',
        comment: 'Kualitas suara sangat jernih, staging luas dan bass terkontrol rapi. ANC-nya efektif memblok suara bising kantor. Sangat sebanding dengan harganya!',
        helpfulCount: 29
      },
      {
        id: 'rev-102',
        author: 'Dina Pratiwi',
        rating: 5,
        date: '19 Okt 2026',
        comment: 'Pengiriman kilat, kemasan dobel bubble wrap tebal. Desain mewahnya kelihatan saat dipakai, bahan metal brush premium.',
        helpfulCount: 14
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Kopi Arabika Single Origin Gayo Washed 250g',
    category: 'Kopi & Kuliner Lokal',
    price: 98000,
    originalPrice: 120000,
    rating: 4.8,
    reviewCount: 512,
    salesCount: 3820,
    seller: {
      name: 'The Daily Grind Roastery',
      city: 'Bandung',
      verified: true,
      rating: 4.9,
      responseTime: '± 10 menit',
      avatarText: 'DG'
    },
    description: 'Biji kopi arabika pilihan dari dataran tinggi Aceh Gayo pada ketinggian 1.500 mdpl. Diproses secara fully-washed dengan profil pemanggangan light-medium roast untuk mempertahankan aroma floral, sentuhan manis brown sugar, serta kesegaran sitrus yang bersih di lidah.',
    specifications: {
      'Origin': 'Takengon, Aceh Tengah, Indonesia',
      'Varietas': 'Ateng Super & Tim-Tim',
      'Elevasi': '1.450 - 1.600 mdpl',
      'Proses': 'Fully Washed Double Fermentation',
      'Tasting Notes': 'Peach Blossom, Cane Sugar, Clean Citrus',
      'Tanggal Roasting': 'Maksimal 7 hari sebelum pengiriman'
    },
    stock: 65,
    images: [
      '/src/assets/images/product_specialty_coffee_1792992829581.jpg'
    ],
    tags: ['Specialty Coffee', 'Fresh Roasted', 'Single Origin'],
    variants: [
      {
        name: 'Bentuk',
        options: ['Biji Utuh (Whole Bean)', 'Giling Halus (Espresso)', 'Giling Sedang (V60/Aeropress)', 'Giling Kasar (Cold Brew/French Press)']
      }
    ],
    featured: true,
    reviews: [
      {
        id: 'rev-201',
        author: 'Rian Fahreza',
        rating: 5,
        date: '21 Okt 2026',
        comment: 'Aroma saat diseduh V60 semerbak banget! Aftertaste manisnya bertahan lama, tidak pahit menusuk.',
        helpfulCount: 38
      },
      {
        id: 'rev-202',
        author: 'Siti Rahmawati',
        rating: 5,
        date: '15 Okt 2026',
        comment: 'Roasting date masih segar 4 hari lalu. Tiap pagi wajib bikin kopi ini, langganan tetap!',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Kemeja Tenun & Batik Indigo Modern Linen Pure Cotton',
    category: 'Pakaian & Mode',
    price: 385000,
    originalPrice: 450000,
    rating: 4.9,
    reviewCount: 184,
    salesCount: 890,
    seller: {
      name: 'Nala Studio Wear',
      city: 'Yogyakarta',
      verified: true,
      rating: 4.8,
      responseTime: '± 15 menit',
      avatarText: 'NS'
    },
    description: 'Kemeja pria dan uniseks santai dengan sentuhan motif geometris khas nusantara bernuansa indigo alami. Ditenun dari perpaduan rami linen murni dan katun organik bertekstur sejuk, potongan loose fit santai yang anggun untuk bekerja maupun hangout akhir pekan.',
    specifications: {
      'Material': '70% Pure Linen, 30% Organic Cotton',
      'Pewarnaan': 'Natural Indigo Dye Wash',
      'Kancing': 'Cangkang Kerang Kelapa Alami',
      'Fitting': 'Relaxed Modern Silhouette',
      'Instruksi Perawatan': 'Cuci manual air dingin, jangan gunakan pemutih'
    },
    stock: 42,
    images: [
      '/src/assets/images/product_modern_batik_shirt_1792992830209.jpg'
    ],
    tags: ['Handmade Textile', 'Slow Fashion', 'Sustainable'],
    variants: [
      {
        name: 'Ukuran',
        options: ['S (Chest 104cm)', 'M (Chest 108cm)', 'L (Chest 114cm)', 'XL (Chest 120cm)']
      }
    ],
    featured: true,
    reviews: [
      {
        id: 'rev-301',
        author: 'Farhan Maulana',
        rating: 5,
        date: '22 Okt 2026',
        comment: 'Bahannya jatuh banget dan adem waktu dipakai di cuaca panas. Warnanya persis foto, sangat elegan.',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Set Teko Keramik Stoneware Kasongan Handmade',
    category: 'Rumah & Gaya Hidup',
    price: 275000,
    originalPrice: 320000,
    rating: 4.9,
    reviewCount: 96,
    salesCount: 430,
    seller: {
      name: 'Gerabah Kasongan Atelier',
      city: 'Bantul, DIY',
      verified: true,
      rating: 4.9,
      responseTime: '± 8 menit',
      avatarText: 'GK'
    },
    description: 'Set perlengkapan minum teh dan tisane tradisional yang dibakar pada suhu 1.250°C. Terdiri dari teko stoneware berpegangan anyaman rotan alami serta 2 cangkir keramik tanah liat bertekstur matte alami. Aman untuk minuman panas dan microwave.',
    specifications: {
      'Isi Set': '1 Teko (650ml) + 2 Cangkir Keramik (150ml) + 1 Nampan Kayu',
      'Bahan': 'High-Fire Stoneware & Rotan Alami',
      'Finishing': 'Matte Glaze Food Grade (BPA Free)',
      'Ketahanan': 'Tahan suhu hingga 200°C'
    },
    stock: 19,
    images: [
      '/src/assets/images/product_ceramic_teapot_set_1792992829399.jpg'
    ],
    tags: ['Artisan Craft', 'Food Grade', 'Handcrafted'],
    variants: [
      {
        name: 'Varian Warna',
        options: ['Terracotta Sandstone', 'Charcoal Stone Ash']
      }
    ],
    featured: true,
    reviews: [
      {
        id: 'rev-401',
        author: 'Anisa Kusuma',
        rating: 5,
        date: '18 Okt 2026',
        comment: 'Kemasannya kayu dan tebal sekali, tiba dengan mulus tanpa ada retak sedikitpun. Estetik ditaruh di meja tamu!',
        helpfulCount: 16
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Smart Watch Pelacak Kebugaran Titik Nol Amoled',
    category: 'Audio & Elektronik',
    price: 689000,
    originalPrice: 850000,
    rating: 4.7,
    reviewCount: 420,
    salesCount: 1900,
    seller: {
      name: 'Titik Nol Gadget',
      city: 'Jakarta Barat',
      verified: true,
      rating: 4.8,
      responseTime: '± 12 menit',
      avatarText: 'TN'
    },
    description: 'Jam tangan pintar dengan layar sentuh AMOLED 1.43 inci, pemantau detak jantung 24/7, saturasi oksigen darah (SpO2), pemantau tidur, serta 110+ mode olahraga outdoor dan indoor. Tahan air 5 ATM cocok untuk renang.',
    specifications: {
      'Layar': '1.43 inch AMOLED 466x466 Always-On',
      'Ketahanan Air': '5 ATM (Hingga kedalaman 50 meter)',
      'Baterai': '400mAh (Standby 14 hari, pemakaian aktif 7 hari)',
      'Kompatibilitas': 'Android 7.0+ & iOS 12.0+'
    },
    stock: 35,
    images: [
      '/src/assets/images/product_audio_headphones_1792992829351.jpg'
    ],
    tags: ['Waterproof 5ATM', 'AMOLED Screen', 'Garansi Resmi'],
    variants: [
      {
        name: 'Strap',
        options: ['Silicone Black', 'Woven Forest Green']
      }
    ],
    featured: false,
    reviews: [
      {
        id: 'rev-501',
        author: 'Hendro Wijaya',
        rating: 5,
        date: '16 Okt 2026',
        comment: 'Layar cerah banget meski di bawah sinar matahari langsung. Baterai tahan semingguan lebih.',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Tas Ransel Kulit Nabati Garut Heritage Travel Pack',
    category: 'Pakaian & Mode',
    price: 890000,
    originalPrice: 1150000,
    rating: 4.9,
    reviewCount: 78,
    salesCount: 260,
    seller: {
      name: 'Garut Leather Atelier',
      city: 'Garut, Jawa Barat',
      verified: true,
      rating: 4.9,
      responseTime: '± 20 menit',
      avatarText: 'GL'
    },
    description: 'Dibuat dari 100% kulit sapi asli olahan samak nabati Garut yang awet puluhan tahun dan semakin indah seiring berjalannya waktu (patina alami). Dilengkapi kompartemen laptop 15.6 inci dengan bantalan empuk dan resleting YKK antik.',
    specifications: {
      'Material': 'Full Grain Vegetable Tanned Leather',
      'Hardware': 'Antique Solid Brass & YKK Metal Zipper',
      'Kapasitas': '22 Liter (Muat Laptop 15.6 inch)',
      'Dimensi': '42cm x 30cm x 14cm'
    },
    stock: 14,
    images: [
      '/src/assets/images/product_modern_batik_shirt_1792992830209.jpg'
    ],
    tags: ['Genuine Leather', 'Handmade Garut', 'Lifetime Durability'],
    variants: [
      {
        name: 'Warna Kulit',
        options: ['Vintage Cognac Brown', 'Midnight Charcoal']
      }
    ],
    featured: false,
    reviews: [
      {
        id: 'rev-601',
        author: 'Agus Setiawan',
        rating: 5,
        date: '10 Okt 2026',
        comment: 'Wangi kulit aslinya mantap, jahitan super rapi. Terasa kokoh dan berat khas kulit sapi berkualitas tinggi.',
        helpfulCount: 24
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Madu Hutan Liar Murni Sumbawa Asli 500ml',
    category: 'Kopi & Kuliner Lokal',
    price: 135000,
    originalPrice: 160000,
    rating: 4.9,
    reviewCount: 310,
    salesCount: 1540,
    seller: {
      name: 'Rembulan Alam Nusantara',
      city: 'Mataram, NTB',
      verified: true,
      rating: 4.9,
      responseTime: '± 5 menit',
      avatarText: 'RA'
    },
    description: 'Madu hutan murni yang dipanen langsung dari sarang lebah raksasa (Apis dorsata) di belantara hutan Sumbawa. Tanpa proses pasteurisasi, tanpa pengawet atau gula tambahan, menjaga keaslian enzim diastase dan antioksidan alami.',
    specifications: {
      'Spesies Lebah': 'Apis Dorsata (Lebah Hutan Liar)',
      'Kemasan': 'Botol Kaca Gelap Kedap Udara 500ml',
      'Kadar Air': '18% - 19% (Alami Kental)',
      'Sertifikasi': 'Halal MUI & Uji Laboratorium Kemurnian'
    },
    stock: 50,
    images: [
      '/src/assets/images/product_specialty_coffee_1792992829581.jpg'
    ],
    tags: ['Raw Honey', 'Hutan Liar', 'Murni 100%'],
    featured: false,
    reviews: [
      {
        id: 'rev-701',
        author: 'Nurul Hidayati',
        rating: 5,
        date: '12 Okt 2026',
        comment: 'Rasa manisnya lembut dengan sedikit nuansa asam khas madu hutan liar. Sangat bagus untuk daya tahan tubuh keluarga.',
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'Lampu Meja Kayu Jati Minimalis Skandinavia',
    category: 'Rumah & Gaya Hidup',
    price: 340000,
    originalPrice: 410000,
    rating: 4.8,
    reviewCount: 88,
    salesCount: 360,
    seller: {
      name: 'Jepara Woodcraft Lab',
      city: 'Jepara',
      verified: true,
      rating: 4.9,
      responseTime: '± 10 menit',
      avatarText: 'JW'
    },
    description: 'Lampu baca dan tidur dengan rangka kayu jati solid berkualitas ekspor asal Jepara. Dibalut kap kapur linen bertekstur hangat yang memancarkan cahaya lembut teduh di ruangan. Dilengkapi saklar putar peredup (dimmer).',
    specifications: {
      'Bahan Rangka': 'Solid Teak Wood (Kayu Jati)',
      'Fitting Lampu': 'E27 (Termasuk Bohlam LED Warm White 7W)',
      'Panjang Kabel': '1.8 meter berlapis jalinan kain (braided)',
      'Fitur': 'Rotary Dimmer Switch'
    },
    stock: 22,
    images: [
      '/src/assets/images/product_ceramic_teapot_set_1792992829399.jpg'
    ],
    tags: ['Solid Teak', 'Dimmable Warm', 'Jepara Export'],
    featured: false,
    reviews: [
      {
        id: 'rev-801',
        author: 'Gilang Prasetya',
        rating: 5,
        date: '08 Okt 2026',
        comment: 'Finishing kayunya halus banget, serat jati kelihatan mewah. Cahaya redupnya nyaman sekali untuk tidur.',
        helpfulCount: 15
      }
    ]
  }
];

export const CATEGORIES = [
  'Semua Kategori',
  'Audio & Elektronik',
  'Kopi & Kuliner Lokal',
  'Pakaian & Mode',
  'Rumah & Gaya Hidup'
] as const;

export const COURIER_OPTIONS: CourierOption[] = [
  {
    id: 'sicepat-reg',
    name: 'SiCepat Reguler',
    service: 'Standar 2-3 Hari',
    price: 18000,
    estimatedDays: '2 - 3 Hari'
  },
  {
    id: 'jne-yes',
    name: 'JNE Express (YES)',
    service: 'Besok Sampai (Next Day)',
    price: 32000,
    estimatedDays: '1 Hari (Besok Sampai)'
  },
  {
    id: 'gosend-instant',
    name: 'GoSend / Grab Instant',
    service: 'Pengiriman Cepat (Jabodetabek / Kota Sama)',
    price: 45000,
    estimatedDays: 'Hari Ini (3 - 5 Jam)'
  },
  {
    id: 'bebas-ongkir',
    name: 'Kurir Rekomendasi (Bebas Ongkir)',
    service: 'Promo Gratis Ongkos Kirim',
    price: 0,
    estimatedDays: '3 - 4 Hari'
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pay-qris',
    name: 'QRIS (Semua Bank & Dompet Digital)',
    type: 'qris',
    description: 'Pindai instan pakai BCA, Mandiri, BRI, GoPay, OVO, ShopeePay, DANA'
  },
  {
    id: 'pay-bca',
    name: 'BCA Virtual Account',
    type: 'bank_transfer',
    description: 'Verifikasi instan otomatis 24 jam tanpa perlu bukti transfer',
    accountNumber: '8274 0812 3991 2291'
  },
  {
    id: 'pay-mandiri',
    name: 'Mandiri Virtual Account',
    type: 'bank_transfer',
    description: 'Transfer via Livin by Mandiri atau ATM',
    accountNumber: '8910 2311 9082 1102'
  },
  {
    id: 'pay-ewallet',
    name: 'GoPay / OVO Instant Pay',
    type: 'ewallet',
    description: 'Konfirmasi langsung dari smartphone Anda'
  },
  {
    id: 'pay-cod',
    name: 'COD (Bayar di Tempat)',
    type: 'cod',
    description: 'Bayar tunai ke kurir saat barang sampai di alamat Anda'
  }
];

export const VOUCHERS: Voucher[] = [
  {
    code: 'DISKON30',
    title: 'Diskon Spesial Nusantara 30%',
    discountPercent: 30,
    maxDiscount: 75000,
    minPurchase: 150000,
    description: 'Potongan 30% hingga Rp 75.000 untuk minimal belanja Rp 150.000'
  },
  {
    code: 'HEMAT50K',
    title: 'Potongan Langsung Rp 50.000',
    discountAmount: 50000,
    minPurchase: 300000,
    description: 'Potongan flat Rp 50.000 untuk pembelian di atas Rp 300.000'
  },
  {
    code: 'GRATISONGKIR',
    title: 'Bebas Ongkir Se-Indonesia',
    discountAmount: 25000,
    minPurchase: 100000,
    description: 'Potongan ongkir hingga Rp 25.000 ke seluruh nusantara'
  }
];
