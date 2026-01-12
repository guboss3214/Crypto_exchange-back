# High-Performance Crypto Orderbook Aggregator

A specialized middleware service designed to aggregate real-time data from the **WhiteBIT API**.  
It solves common issues with **API rate limiting** and provides **low-latency data access** for the frontend through an internal caching layer.

---

## Overview

This service acts as an intermediary between the frontend and the WhiteBIT API, efficiently managing request frequency while delivering fast and reliable order book data.

---

## Key Technical Features

### Multi-Market Polling

A background service that concurrently fetches and updates order book data for multiple trading pairs:

- `WBT / USDT`
- `BTC / USDT`
- `ETH / USDT`

---

### In-Memory Caching

Implements a robust in-memory caching layer (`orderbookCache`) that:

- Stores the latest order book snapshots
- Enables near-zero latency data retrieval
- Prevents excessive external API calls

---

### Request Shielding

Acts as a buffer for the WhiteBIT API by:

- Performing synchronized fetches every **5 seconds**
- Serving unlimited frontend clients without increasing API load
- Eliminating the risk of hitting API rate limits

---

### Resilient Error Handling

Advanced error-handling mechanisms ensure service stability:

- Graceful handling of **422 (Unprocessable Entity)** errors
- Automatic recovery from **429 (Rate Limit Exceeded)** responses
- Stable operation during periods of high market volatility

---

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **HTTP Client:** Axios (with custom interceptors)

## Future Roadmap & Planned Improvements

To further enhance the performance and scalability of this aggregator, the following features are planned for future releases:

### 1. WebSocket Integration

Transition from HTTP Polling to **WebSockets (Pusher/Socket.io)** for real-time data streaming. This will:

- Reduce data latency from seconds to milliseconds.
- Enable instant updates for the Matching Engine.

### 2. Persistent Storage with PostgreSQL

Integrate a relational database to move beyond `localStorage`.

- Store long-term order history and user trade statistics.
- Implement a more robust "Order Lifecycle" management (Cancel/Fill/Partial Fill).

### 3. Redis-based Distributed Cache

Migrate the in-memory cache to **Redis**.

- Allow horizontal scaling of the backend service (multiple instances sharing the same cache).
- Ensure data persistence even if the Node.js process restarts.

### 4. Advanced Matching Logic

Extend the matching engine to support:

- **Stop-Loss / Take-Profit** orders.
- **Partial Fills**: enabling orders to be filled across multiple price levels in the order book.
- **Historical K-Line API**: building a custom endpoint to serve historical candle data for custom timeframes.

### 5. Authentication & Security

- Implement **JWT-based authentication** for secure order placement.
- Add API Request Signing to mimic real exchange security protocols.
