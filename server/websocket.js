const WebSocket = require('ws')
const http = require('http')

const server = http.createServer()
const wss = new WebSocket.Server({ server })

const clients = new Map()

wss.on('connection', (ws) => {
  const clientId = generateId()
  clients.set(clientId, ws)
  
  console.log(`Client connected: ${clientId}`)

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message)
      handleMessage(clientId, data)
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  })

  ws.on('close', () => {
    clients.delete(clientId)
    console.log(`Client disconnected: ${clientId}`)
  })

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to LogiTrack WebSocket server',
    clientId
  }))
})

function handleMessage(clientId, data) {
  switch (data.type) {
    case 'location_update':
      broadcast({
        type: 'location_update',
        driverId: data.driverId,
        location: data.location,
        timestamp: new Date().toISOString()
      })
      break

    case 'status_update':
      broadcast({
        type: 'status_update',
        shipmentId: data.shipmentId,
        status: data.status,
        timestamp: new Date().toISOString()
      })
      break

    case 'ping':
      const client = clients.get(clientId)
      if (client) {
        client.send(JSON.stringify({ type: 'pong' }))
      }
      break
  }
}

function broadcast(message) {
  const jsonMessage = JSON.stringify(message)
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonMessage)
    }
  })
}

function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

const PORT = process.env.WS_PORT || 3001
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`)
})