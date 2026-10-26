export interface Seller {
  name: string;
  city: string;
  verified: boolean;
  rating: number;
  responseTime: string;
  avatarText?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  salesCount: number;
  seller: Seller;
  description: string;
  specifications: Record<string, string>;
  stock: number;
  images: string[];
  tags: string[];
  variants?: ProductVariant[];
  reviews: Review[];
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique cart line id
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  district: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface CourierOption {
  id: string;
  name: string;
  service: string;
  price: number;
  estimatedDays: string;
}

export type PaymentType = 'qris' | 'bank_transfer' | 'ewallet' | 'cod';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentType;
  description: string;
  accountNumber?: string;
}

export type OrderStatus = 'Menunggu Pembayaran' | 'Diproses Penjual' | 'Dalam Pengiriman' | 'Pesanan Selesai';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  courier: CourierOption;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  trackingNumber: string;
  estimatedDeliveryDate: string;
}

export interface Voucher {
  code: string;
  title: string;
  discountAmount?: number;
  discountPercent?: number;
  minPurchase: number;
  maxDiscount?: number;
  description: string;
}
