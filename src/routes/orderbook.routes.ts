import { Router } from 'express'
import { getOrderbookData } from '../controllers/orderbook.controller'

const router = Router()

router.get('/orderbook', getOrderbookData)

export default router
