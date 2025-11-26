import { SYMBOLS } from "../config/constants";
import type { PriceData } from "../interfaces/PriceData";
import { calculatePriceChange } from "../utils/calculatePriceChange";

const WEBSOCKET_BINANCE_URL = "wss://stream.binance.com:9443/ws/"

interface TickerShortData {
    s: string;
    c: string;
    o: string;
}

interface WebSocketHandlers {
    onPriceUpdate: (symbol: string, currentPrice: number) => void;
    onPriceChange: (symbol: string, changePercent: number) => void;
    onRealtimeData: (symbol: string, newPoint: PriceData) => void;
}

export const createStreamUrl = (
): string => {
    const streams = SYMBOLS.map(s => `${s.toLowerCase()}@miniTicker`).join('/');
    return `${WEBSOCKET_BINANCE_URL}${streams}`;
};

export const createRealtimePoint = (price: number): PriceData => {
    const now = new Date();
    return {
        time: now.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        price,
        timestamp: now.getTime()
    };
};

export const handleWebSocketMessage = (
    event: MessageEvent,
    handlers: WebSocketHandlers
): void => {
    const data: TickerShortData = JSON.parse(event.data);

    const symbol = data.s;
    const currentPrice = parseFloat(data.c);
    const openPrice = parseFloat(data.o);

    handlers.onPriceUpdate(symbol, currentPrice);

    const change = calculatePriceChange(currentPrice, openPrice);
    handlers.onPriceChange(symbol, change);

    const newPoint = createRealtimePoint(currentPrice);
    handlers.onRealtimeData(symbol, newPoint);

};