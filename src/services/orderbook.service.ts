import axios from 'axios'

interface OrderbookCache {
  [key: string]: any
}

let cachedOrderbook: OrderbookCache = {}

export const CURRENCY = [
  'WBT_USDT',
  'BTC_USDT',
  'ETH_USDT',
  'SOL_USDT',
  'XRP_USDT',
  'ADA_USDT',
  'AVAX_USDT',
  'DOT_USDT',
  'DOGE_USDT',
  'SHIB_USDT',
]

export const startOrderbookPolling = () => {
  setInterval(async () => {
    for (const curr of CURRENCY) {
      try {
        const url = `https://whitebit.com/api/v4/public/orderbook/${curr}?limit=50&level=2`
        const { data } = await axios.get(url)

        cachedOrderbook[curr] = {
          ...data,
          updatedAt: new Date().toISOString(),
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`Error fetching ${curr}: `, error.message)
        } else {
          console.log(`Error fetching ${curr}: `, error)
        }
      }
    }
  }, 5000)
}

export const getOrderbook = (curr: string) => cachedOrderbook[curr] || null
export const getAllOrderbook = () => cachedOrderbook
