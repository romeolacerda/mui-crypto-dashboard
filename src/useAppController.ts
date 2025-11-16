import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { HistoricalDataState, PriceState, SymbolType } from "./interfaces/CryptoConfig";
import type { PriceData } from "./interfaces/PriceData";
import { SYMBOLS } from "./config/constants";
import { fetchAllHistoricalData } from "./services/binanceKlines";

const WEBSOCKET_BINANCE_URL = import.meta.env.VITE_WEBSOCKET_BINANCE_URL;

export function useAppController(){
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolType>('BTCUSDT');
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<PriceState>({});
  const [priceChanges, setPriceChanges] = useState<PriceState>({});
  
  const [staticHistoricalData, setStaticHistoricalData] = useState<HistoricalDataState>({});
  
  const [realtimeData, setRealtimeData] = useState<HistoricalDataState>({});
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const binanceWebSocketRef = useRef<WebSocket | null>(null);
  const previousPricesRef = useRef<PriceState>({});
  
  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const { staticData, realtimeData } = await fetchAllHistoricalData(SYMBOLS);
        
        setStaticHistoricalData(staticData);
        setRealtimeData(realtimeData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading historical data:', error);
        setLoading(false);
      }
    };

    loadHistoricalData();
  }, []);
  
  useEffect(() => {
    if (loading) return;

    const streams = SYMBOLS.map(s => `${s.toLowerCase()}@miniTicker`).join('/');

    const binanceWebSocket = new WebSocket(`${WEBSOCKET_BINANCE_URL}${streams}`);

    binanceWebSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const symbol: string = data.s;
      const currentPrice: number = parseFloat(data.c);
      const openPrice: number = parseFloat(data.o);

      setPrices(prev => {
        previousPricesRef.current[symbol] = prev[symbol] || currentPrice;
        return { ...prev, [symbol]: currentPrice };
      });

      if (openPrice > 0) {
        const change = ((currentPrice - openPrice) / openPrice) * 100;
        setPriceChanges(prev => ({ ...prev, [symbol]: change }));
      }

      setRealtimeData(prev => {
        if (!prev[symbol]) return prev;

        const newData = [...prev[symbol]];
        const now = new Date();

        const newPoint: PriceData = {
          time: now.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          price: currentPrice,
          timestamp: now.getTime()
        };

        newData.push(newPoint);

        if (newData.length > 100) {
          newData.shift();
        }

        return { ...prev, [symbol]: newData };
      });
    };

    binanceWebSocketRef.current = binanceWebSocket;

    return () => {
      if (binanceWebSocketRef.current) {
        binanceWebSocketRef.current.close();
      }
    };
  }, [loading]);

  return {
    selectedSymbol,
    setSelectedSymbol,
    loading,
    prices, 
    priceChanges,
    staticHistoricalData,
    isMobile,
    realtimeData
  };
}