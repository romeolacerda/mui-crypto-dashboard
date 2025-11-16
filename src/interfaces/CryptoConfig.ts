import type { SYMBOLS } from "../config/constants";
import type { PriceData } from "./PriceData";

export interface CryptoConfig {
  name: string;
  short: string;
  color: string;
  gradient: string[];
  bgGradient: string;
}

export interface PriceState {
  [key: string]: number;
}

export interface HistoricalDataState {
  [key: string]: PriceData[];
}

export type SymbolType = typeof SYMBOLS[number];