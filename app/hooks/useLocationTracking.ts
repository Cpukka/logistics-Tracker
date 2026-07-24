'use client'

import { useEffect, useCallback } from 'react'
import { useWebSocket } from '../components/providers/WebSocketProvider'

export function useLocationTracking(driverId?: string) {
  const { sendMessage, isConnected, connectionStatus } = useWebSocket()

  const sendLocationUpdate = useCallback((location: {
    lat: number
    lng: number
    address?: string
    speed?: number
    bearing?: number
  }) => {
    if (driverId && isConnected) {
      sendMessage({
        type: 'location_update',
        data: {
          driverId,
          location,
          timestamp: new Date().toISOString()
        }
      })
    }
  }, [driverId, isConnected, sendMessage])

  const startLiveTracking = useCallback(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        sendLocationUpdate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          speed: position.coords.speed || undefined,
          bearing: position.coords.heading || undefined,
        })
      },
      (error) => {
        console.error('Geolocation error:', error)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [sendLocationUpdate])

  return {
    sendLocationUpdate,
    startLiveTracking,
    isConnected,
    connectionStatus,
  }
}