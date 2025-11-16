import {
  Box,
  Container,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CryptoCard } from './components/cryptoCard';
import { Loading } from './components/loading';
import { cryptos, SYMBOLS } from './config/constants';
import type { CryptoConfig, SymbolType } from './interfaces/CryptoConfig';
import { useAppController } from './useAppController';
import { formatPrice } from './utils/formatPrice';

const CryptoDashboard = () => {
  const { selectedSymbol, setSelectedSymbol, loading, prices, priceChanges, staticHistoricalData, isMobile, realtimeData } = useAppController()
  const getCryptoConfig = (symbol: SymbolType): CryptoConfig => {
    const configs: Record<SymbolType, CryptoConfig> = cryptos
    return configs[symbol];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth={false} disableGutters sx={{ bgcolor: 'transparent', px: 4 }}>
        <Box mb={4}>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Typography variant={isMobile ? 'h4' : 'h3'} fontWeight="bold" color="text.primary">
              Crypto Dashboard
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Acompanhe preços em tempo real e nos ultimos 30 dias das principais criptomoedas
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {SYMBOLS.map((symbol) => {
            const config = getCryptoConfig(symbol);
            const change = priceChanges[symbol];

            return (
              <CryptoCard
                symbol={symbol}
                key={symbol}
                price={prices[symbol]}
                config={config}
                change={priceChanges[symbol]}
                isPositive={change >= 0}
                selectedSymbol={selectedSymbol}
                setSelectedSymbol={setSelectedSymbol}
                isMobile={isMobile}
                staticHistoricalData={staticHistoricalData}
              />
            );
          })}
        </Grid>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'white', border: '1px solid #e0e0e0' }}>
          <Box mb={3}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Gráfico de Evolução - {getCryptoConfig(selectedSymbol).name}
            </Typography>
          </Box>

          <Box sx={{
            width: '100%', height: 400, minHeight: 400, '& *': {
              outline: 'none !important',
              boxShadow: 'none !important'
            }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={realtimeData[selectedSymbol] || []}>
                <defs>
                  <linearGradient id="mainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getCryptoConfig(selectedSymbol).color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={getCryptoConfig(selectedSymbol).color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="time"
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                  domain={['auto', 'auto']}
                  tickFormatter={(value: number) => formatPrice(value)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: `2px solid ${getCryptoConfig(selectedSymbol).color}`,
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [formatPrice(value), 'Preço']}
                  labelStyle={{ color: '#666' }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={getCryptoConfig(selectedSymbol).color}
                  strokeWidth={3}
                  fill="url(#mainGradient)"
                  dot={false}
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CryptoDashboard;