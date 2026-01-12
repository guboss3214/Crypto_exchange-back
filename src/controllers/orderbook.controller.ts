import { Request, Response } from 'express'
import { getAllOrderbook, getOrderbook } from '../services/orderbook.service'

export const getOrderbookData = (req: Request, res: Response) => {
  const market = req.query.market as string | undefined

  if (!market) {
    return res.status(400).json({
      message: 'Market parameter is required',
    })
  }

  if (market === 'ALL') {
    const allData = getAllOrderbook()
    return res.status(200).json(allData)
  }

  const data = getOrderbook(market)

  if (!data) {
    return res.status(503).json({
      message: 'Orderbook not ready yet',
    })
  }

  res.status(200).json(data)
}
