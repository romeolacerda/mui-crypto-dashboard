import type { SymbolType } from "../interfaces/CryptoConfig";
import type { PriceData } from "../interfaces/PriceData";
import { formatCandleData } from "../utils/formatCandleData";
import { hourTimeFormatter } from "../utils/hourTimeFormatter";
import { monthTimeFormatter } from "../utils/monthTimeFormatter";

const API_URL = import.meta.env.VITE_API_BINANCE_URL;

interface KlineResponse {
  symbol: SymbolType;
  data: PriceData[];
}

interface KlineProps {
  symbol: SymbolType,
  interval: string,
  limit: number,
  timeFormatter: (timestamp: number) => string
}

const fetchKlines = async ({ interval, limit, symbol, timeFormatter }: KlineProps): Promise<KlineResponse> => {
  const response = await fetch(
    `${API_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  );

  const data = await response.json();

  const formattedData: PriceData[] = data.map((candle: any[]) =>
    formatCandleData(candle, timeFormatter)
  );

  return { symbol, data: formattedData };
};

const fetchDailyData = async (
  symbols: readonly SymbolType[]
): Promise<Record<SymbolType, PriceData[]>> => {

  const promises = symbols.map(symbol =>
    fetchKlines({ symbol, interval: '1d', limit: 30, timeFormatter: monthTimeFormatter })
  );

  const results = await Promise.all(promises);

  return results.reduce((acc, { symbol, data }) => {
    acc[symbol] = data;
    return acc;
  }, {} as Record<SymbolType, PriceData[]>);
};

const fetchHourlyData = async (
  symbols: readonly SymbolType[]
): Promise<Record<SymbolType, PriceData[]>> => {

  const promises = symbols.map(symbol =>
    fetchKlines({
      symbol,
      interval: '1h',
      limit: 24,
      timeFormatter: hourTimeFormatter
    })
  );

  const results = await Promise.all(promises);

  return results.reduce((acc, { symbol, data }) => {
    acc[symbol] = data;
    return acc;
  }, {} as Record<SymbolType, PriceData[]>);
};

export const fetchAllHistoricalData = async (symbols: readonly SymbolType[]) => {
  const [dailyData, hourlyData] = await Promise.all([
    fetchDailyData(symbols),
    fetchHourlyData(symbols)
  ]);

  return {
    staticData: dailyData,
    realtimeData: hourlyData
  };
};