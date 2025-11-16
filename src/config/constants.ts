export const cryptos = {
    'BTCUSDT': {
        name: 'Bitcoin',
        short: 'BTC',
        color: '#F7931A',
        gradient: ['#FFA726', '#FB8C00'],
        bgGradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)'
    },
    'ETHUSDT': {
        name: 'Ethereum',
        short: 'ETH',
        color: '#627EEA',
        gradient: ['#7C4DFF', '#536DFE'],
        bgGradient: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)'
    },
    'BNBUSDT': {
        name: 'Binance Coin',
        short: 'BNB',
        color: '#F3BA2F',
        gradient: ['#FFD54F', '#FBC02D'],
        bgGradient: 'linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 100%)'
    },
    'DOGEUSDT': {
        name: 'Dogecoin',
        short: 'DOGE',
        color: '#C2A633',
        gradient: ['#FF7043', '#F4511E'],
        bgGradient: 'linear-gradient(135deg, #FBE9E7 0%, #FFCCBC 100%)'
    }
};

export const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'DOGEUSDT'] as const;