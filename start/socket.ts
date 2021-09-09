import Ws from 'App/Services/WebSocket/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.emit('message', "Socket Connected")
})
