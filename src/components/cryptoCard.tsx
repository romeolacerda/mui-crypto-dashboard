import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import type { CryptoConfig, HistoricalDataState, SymbolType } from "../interfaces/CryptoConfig";
import { formatPrice } from "../utils/formatPrice";
import { CardChart } from "./cardChart";

interface CryptoCardProps {
  symbol: SymbolType;
  price: number;
  config: CryptoConfig;
  change: number;
  isPositive: boolean;
  selectedSymbol: SymbolType;
  setSelectedSymbol: (symbol: SymbolType) => void;
  isMobile: boolean;
  staticHistoricalData: HistoricalDataState;
}

export const CryptoCard = ({
  symbol,
  price,
  config,
  change,
  isPositive,
  selectedSymbol,
  setSelectedSymbol,
  isMobile,
  staticHistoricalData
}: CryptoCardProps) => {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={symbol}>
      <Card
        sx={{
          background: config.bgGradient,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: selectedSymbol === symbol ? '2px solid' : '2px solid transparent',
          borderColor: selectedSymbol === symbol ? config.color : 'transparent',
          position: 'relative',
          overflow: 'visible'
        }}
        onClick={() => setSelectedSymbol(symbol)}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${config.gradient[0]} 0%, ${config.gradient[1]} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: 2
              }}
            >
              {config.short[0]}
            </Box>
            <Chip
            label={`${isPositive ? '+' : ''}${change?.toFixed(1) ?? '0.0'}%`}
              size="small"
              sx={{
                bgcolor: isPositive ? 'success.main' : 'error.main',
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          </Box>

          <Typography variant="h6" fontWeight="600" gutterBottom color="text.primary">
            {config.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
            {config.short}/USDT
          </Typography>

          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" color="text.primary" mb={2}>
            {formatPrice(price)}
          </Typography>

          <CardChart data={staticHistoricalData[symbol]} color={config.color} />
        </CardContent>
      </Card>
    </Grid>
  );
};