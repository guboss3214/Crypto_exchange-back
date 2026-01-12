import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

import orderbookRoutes from '../src/routes/orderbook.routes'
import { startOrderbookPolling } from './services/orderbook.service'

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

const PORT = process.env.PORT

app.use(express.json())

app.use('/api', orderbookRoutes)

startOrderbookPolling()

app.listen(PORT, () => {
  console.log(`Server started...`)
})
