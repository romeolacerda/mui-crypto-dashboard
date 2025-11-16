export const formatPrice = (price: number | undefined): string => {
  if (!price) return 'US$ 0,00';

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 4 : 2
  });
};
