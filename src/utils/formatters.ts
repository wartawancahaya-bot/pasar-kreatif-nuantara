export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount).replace(/\s+/g, ' ');
}

export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `NSR-${dateStr}-${randomSuffix}`;
}

export function generateTrackingNumber(): string {
  const prefix = 'EXP';
  const randomNum = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}${randomNum}ID`;
}
