'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WebSocketContextType {
  isConnected: boolean;
  trackingUpdates: Record<string, any>;
  sendMessage: (message: any) => void;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  error: string | null;
}

const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  trackingUpdates: {},
  sendMessage: () => {},
  connectionStatus: 'disconnected',
  error: null,
});

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [trackingUpdates, setTrackingUpdates] = useState<Record<string, any>>({});
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only connect in browser environment
    if (typeof window === 'undefined') return;

    // Skip WebSocket in development if disabled
    if (process.env.NEXT_PUBLIC_USE_WEBSOCKET === 'false') {
      console.log('WebSocket disabled via environment variable');
      return;
    }

    const connectWebSocket = () => {
      try {
        setConnectionStatus('connecting');
        setError(null);

        // For development, try multiple endpoints
        let wsUrl: string;
        
        if (process.env.NODE_ENV === 'development') {
          // Try different WebSocket endpoints in development
          const endpoints = [
            'ws://localhost:3000/api/ws',
            'ws://localhost:3000',
            'ws://127.0.0.1:3000/api/ws',
          ];
          
          wsUrl = endpoints[0]; // Start with first endpoint
          console.log('Attempting WebSocket connection to:', wsUrl);
        } else {
          // Production WebSocket URL
          const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
          wsUrl = process.env.NEXT_PUBLIC_WS_URL || `${protocol}//${window.location.host}`;
        }

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('✅ WebSocket Connected to:', wsUrl);
          setIsConnected(true);
          setConnectionStatus('connected');
          setError(null);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('📨 WebSocket Message:', data);
            
            if (data.type === 'tracking_update') {
              setTrackingUpdates(prev => ({
                ...prev,
                [data.trackingNumber]: {
                  ...data.update,
                  receivedAt: new Date().toISOString()
                }
              }));
            } else if (data.type === 'ping') {
              // Respond to ping with pong
              ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
            }
            
          } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
          }
        };

        ws.onerror = (errorEvent) => {
          console.error('❌ WebSocket Error Event:', errorEvent);
          
          // Try to get more error info
          setError('WebSocket connection error. Check console for details.');
          setConnectionStatus('error');
          setIsConnected(false);
          
          // Log the WebSocket readyState
          console.log('WebSocket readyState:', ws.readyState);
          console.log('WebSocket URL attempted:', wsUrl);
        };

        ws.onclose = (event) => {
          console.log('🔌 WebSocket Disconnected:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          });
          
          setConnectionStatus('disconnected');
          setIsConnected(false);
          
          // Attempt reconnection for unexpected closures (not clean closures)
          if (!event.wasClean && event.code !== 1000) {
            const timeout = 3000; // 3 seconds
            console.log(`Reconnecting in ${timeout}ms...`);
            
            setTimeout(() => {
              console.log('Attempting reconnection...');
              connectWebSocket();
            }, timeout);
          }
        };

        setSocket(ws);
      } catch (error) {
        console.error('❌ Failed to create WebSocket:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setConnectionStatus('error');
      }
    };

    // Add delay before connecting to ensure page is loaded
    const timeoutId = setTimeout(connectWebSocket, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (socket) {
        console.log('Cleaning up WebSocket connection');
        socket.close(1000, 'Component unmounting');
      }
    };
  }, []); // Empty dependency array - only run once on mount

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
      console.log('📤 Sent WebSocket message:', message);
    } else {
      console.warn('⚠️ WebSocket not connected. ReadyState:', socket?.readyState);
      setError('Cannot send message: WebSocket not connected');
    }
  };

  return (
    <WebSocketContext.Provider value={{ 
      isConnected, 
      trackingUpdates, 
      sendMessage,
      connectionStatus,
      error 
    }}>
      {children}
      
      {/* Connection status indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium shadow-lg ${
          connectionStatus === 'connected' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800' 
            : connectionStatus === 'connecting'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
            : connectionStatus === 'error'
            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' 
            : connectionStatus === 'connecting' ? 'bg-blue-500 animate-pulse'
            : connectionStatus === 'error' ? 'bg-red-500'
            : 'bg-yellow-500'
          }`}></div>
          {connectionStatus === 'connected' && 'Live'}
          {connectionStatus === 'connecting' && 'Connecting...'}
          {connectionStatus === 'error' && 'Connection Error'}
          {connectionStatus === 'disconnected' && 'Disconnected'}
        </div>
      </div>
    </WebSocketContext.Provider>
  );
}