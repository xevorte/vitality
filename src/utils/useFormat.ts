export const formatMoney = (value: string) => {
    const num = Number(value);

    if (isNaN(num)) return value;
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(0)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;

    return num.toString();
  };

  export const formatRupiah = (amount: number) => {
    if (amount === undefined || amount === null) return '';
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };