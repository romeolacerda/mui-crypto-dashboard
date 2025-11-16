import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SYMBOLS } from "./config/constants";
import type { HistoricalDataState, PriceState, SymbolType } from "./interfaces/CryptoConfig";
import { fetchAllHistoricalData } from "./services/binanceKlines";
import { createStreamUrl, handleWebSocketMessage } from "./services/binanceWebSocket";

export function useAppController() {
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
      const { staticData, realtimeData } = await fetchAllHistoricalData(SYMBOLS);

      setStaticHistoricalData(staticData);
      setRealtimeData(realtimeData);
      setLoading(false);
    };

    loadHistoricalData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const binanceWebSocket = new WebSocket(createStreamUrl());

    binanceWebSocket.onmessage = (event) => {
      handleWebSocketMessage(event, {
        onPriceUpdate: (symbol, currentPrice) => {
          setPrices(prev => {
            previousPricesRef.current[symbol] = prev[symbol] || currentPrice;
            return { ...prev, [symbol]: currentPrice };
          });
        },
        onPriceChange: (symbol, changePercent) => {
          setPriceChanges(prev => ({ ...prev, [symbol]: changePercent }));
        },
        onRealtimeData: (symbol, newPoint) => {
          setRealtimeData(prev => {
            if (!prev[symbol]) return prev;

            const newData = [...prev[symbol], newPoint];

            if (newData.length > 100) {
              newData.shift();
            }

            return { ...prev, [symbol]: newData };
          });
        }
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