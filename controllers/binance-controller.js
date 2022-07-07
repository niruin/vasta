const axios = require('axios');
const {COINS} = require('./dictionary');

const url = 'https://api.binance.com/api/v3';

class BinanceController {
  async getTicker(req, res) {
    try {
      const results = await axios.get(url + '/ticker/24hr?symbols=' + JSON.stringify(SYMBOLS));

      const data = results.data.map(item => ({
        symbol: item.symbol,
        priceChangePercent:  item.priceChangePercent,
        highPrice: item.highPrice,
        lowPrice:  item.lowPrice,
      }))

      res.json({success: 1, tickers: data});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to get tickers'});
    }
  }

  async getDepthBySymbol(req, res) {
    const {symbol, limit = 50} = req.body;
    try {
      const results = await axios.get(url + `/depth?symbol=${symbol}&limit=${limit}`);

      res.json({success: 1, depth: results.data});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to get order books'});
    }
  }

  async getTradesBySymbol(req, res) {
    const {symbol, limit = 50} = req.body;
    try {
      const results = await axios.get(url + `/trades?symbol=${symbol}&limit=${limit}`);

      const data = results.data.map(item => ({
        id: item.id,
        price: item.price,
        qty: item.qty,
        time: item.time,
        isBuyerMaker: item.isBuyerMaker,
      }))
      res.json({success: 1, trades: data});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to get trades'});
    }
  }

  async getSymbolInfo(req, res) {
    try {
      const symbol = req.query.symbol;
      const results = await axios.get(url + `/exchangeInfo?symbol=${symbol}`);

      const data = {
        symbol: results.data.symbols[0].symbol,
        baseAsset: results.data.symbols[0].baseAsset,
        quoteAsset: results.data.symbols[0].quoteAsset,
      }
      res.json({success: 1, symbolInfo: data});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to get trades'});
    }
  }
}

module.exports = new BinanceController();

// функция для отбора всех доступных активов бинанс по текущим монетам(dicionary/COINS)
// tickers - данные из /api/v3/ticker/24hr
function filterTickersByArrCoins(tickers) {
  const coinsArr = COINS.map(item => item.value);
  const allCombinations = [];

  for (let i = 0; i < coinsArr.length; i++) {
    for (let j = 0; j < coinsArr.length; j++) {
      allCombinations.push(`${coinsArr[i]}${coinsArr[j]}`);
    }
  }

  const allSymbolFromBinance = tickers.map(item => item.symbol);
  const validTicker = allSymbolFromBinance.filter(item => allCombinations.includes(item));
  console.log(validTicker);
}

const SYMBOLS = [
  'ETHBTC', 'LTCBTC', 'BNBBTC', 'BNBETH',
  'BTCUSDT', 'ETHUSDT', 'TRXBTC', 'TRXETH',
  'XRPBTC', 'XRPETH', 'BNBUSDT', 'ADABTC',
  'ADAETH', 'XLMBTC', 'XLMETH', 'XLMBNB',
  'LTCETH', 'LTCUSDT', 'LTCBNB', 'ADAUSDT',
  'ADABNB', 'XRPUSDT', 'XRPBNB', 'XLMUSDT',
  'TRXBNB', 'TRXUSDT', 'USDCBNB', 'BNBUSDC',
  'BTCUSDC', 'ETHUSDC', 'XRPUSDC', 'XLMUSDC',
  'USDCUSDT', 'TRXXRP', 'LTCUSDC', 'TRXUSDC',
  'ADAUSDC', 'BNBBUSD', 'BTCBUSD', 'BUSDUSDT',
  'XRPBUSD', 'ETHBUSD', 'LTCBUSD', 'TRXBUSD',
  'XLMBUSD', 'ADABUSD', 'BCHBNB', 'BCHBTC',
  'BCHUSDT', 'BCHUSDC', 'BCHBUSD', 'DOTBNB',
  'DOTBTC', 'DOTBUSD', 'DOTUSDT', 'USDCBUSD',
  'DOTETH',
];

