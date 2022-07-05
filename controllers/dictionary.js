const COINS = [
  {label: 'Tether', value: 'USDT'},
  {label: 'USD Coin', value: 'USDC'},
  {label: 'BUSD', value: 'BUSD'},
  {label: 'Bitcoin', value: 'BTC'},
  {label: 'Ethereum', value: 'ETH'},
  {label: 'Ripple', value: 'XRP'},
  {label: 'Polkadot', value: 'DOT'},
  {label: 'Cardano', value: 'ADA'},
  {label: 'Litecoin', value: 'LTC'},
  {label: 'Tron', value: 'TRX'},
  {label: 'Bitcoin Cash', value: 'BCH'},
  {label: 'Binance Coin', value: 'BNB'},
  {label: 'Stellar', value: 'XLM'},
];

const NETWORKS = [
  {label: 'Ethereum (ERC20)', value: 'ERC20', link: ['USDT', 'USDC', 'BTC', 'ETH', 'BNB']},
  {label: 'Bitcoin', value: 'BTC', link: ['BTC']},
  {label: 'BNB Chain (BEP20)', value: 'BEP20', link: ['USDT', 'USDC', 'BUSD', 'BTC', 'ETH', 'XRP', 'DOT', 'LTC', 'ADA', 'BCH']},
  {label: 'Polygon (MATIC)', value: 'MATIC', link: ['USDT', 'BTC', 'ETH']},
  {label: 'Arbitrum One', value: 'ARBITRUM', link: ['USDT', 'BTC', 'ETH']},
  {label: 'Tron (TRC20)', value: 'TRC20', link: ['USDT', 'USDC', 'TRX']},
  {label: 'AVAX C-Chain (AVAX-C)', value: 'AVAXC', link: ['USDT', 'USDC']},
  {label: 'Fantom (FTM)', value: 'FTM', link: ['USDT', 'USDC', 'ETH']},
  {label: 'Ripple', value: 'XRP', link: ['XRP']},
  {label: 'Polkadot', value: 'DOT', link: ['DOT']},
  {label: 'Litecoin', value: 'LTC', link: ['LTC']},
  {label: 'Bitcoin Cash', value: 'BCH', link: ['BCH']},
  {label: 'Stellar', value: 'XLM', link: ['XLM']},
  {label: 'Cardano', value: 'ADA', link: ['ADA']},
];

module.exports = {
  COINS,
  NETWORKS,
}