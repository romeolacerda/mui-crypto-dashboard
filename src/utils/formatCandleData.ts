import type { PriceData } from "../interfaces/PriceData";

export const formatCandleData = (
  candle: any[],
  formatTime: (timestamp: number) => string
): PriceData => ({
  time: formatTime(candle[0]),
  price: parseFloat(candle[4]), 
  timestamp: candle[0]
});
