'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import toast from 'react-hot-toast'

export function useWebSocket(url: string) {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const connect = useCallback(() => {
    if (!socketRef.current) {
      socketRef.current = io(url, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      })

      socketRef.current.on('connect', () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        toast.success('Connected to real-time updates', {
          icon: '🟢',
          duration: 2000,
        })
      })

      socketRef.current.on('disconnect', () => {
        console.log('WebSocket disconnected')
        setIsConnected(false)
        toast.error('Disconnected from real-time updates', {
          icon: '🔴',
          duration: 3000,
        })
      })

      socketRef.current.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error)
        toast.error('Connection error. Retrying...', {
          icon: '⚠️',
        })
      })

      socketRef.current.on('location_update', (data) => {
        console.log('Location update received:', data)
      })

      socketRef.current.on('status_change', (data) => {
        console.log('Status change received:', data)
        toast.success(`Shipment ${data.shipmentId} status updated to ${data.status}`, {
          icon: '📦',
        })
      })
    }
  }, [url])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [])

  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback)
    }
  }, [])

  const unsubscribe = useCallback((event: string, callback?: (data: any) => void) => {
    if (socketRef.current) {
      if (callback) {
        socketRef.current.off(event, callback)
      } else {
        socketRef.current.off(event)
      }
    }
  }, [])

  const emit = useCallback((event: string, data: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data)
    }
  }, [])

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    socket: socketRef.current,
    subscribe,
    unsubscribe,
    emit,
    isConnected,
  }
}