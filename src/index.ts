import uWS from 'uWebSockets.js'
import { PORT, MAX_SOCKET_BACKPRESSURE_BYTES } from './constants'

import {
  handleMessage,
  handleDrain,
  handleUpgrade,
  handleOpen,
  handleClose
} from './websockets'

async function start() {
  const app = uWS.App()

  app.get('/*', (res, req) => {
    res.end('hello world')
  })

  // ==== WEBSOCKETS V0 ==== //
  app.ws('/:node_ip', {
    // OPTIONS
    compression: uWS.DEDICATED_COMPRESSOR_3KB,
    maxPayloadLength: 16 * 1024 * 1024,
    maxBackpressure: MAX_SOCKET_BACKPRESSURE_BYTES,
    idleTimeout: 60,

    // HANDLERS
    upgrade: handleUpgrade,
    open: handleOpen,
    message: handleMessage,
    drain: handleDrain,
    close: handleClose
  })

  app.listen('localhost', PORT, () =>
    console.log(`server listening on port ${PORT}`)
  )
}

start()
