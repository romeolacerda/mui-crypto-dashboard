export const calculatePriceChange = (
    currentPrice: number,
    openPrice: number
): number => {
    if (openPrice <= 0) return 0;
    return ((currentPrice - openPrice) / openPrice) * 100;
};