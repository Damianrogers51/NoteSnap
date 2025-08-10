'use client';

import { useState, useEffect, useCallback } from "react";
import { useSocket } from "./useSocket";

export function useCompanion(url: () => string) {
  const socket = useSocket(url);

  const [mostRecentImage, setMostRecentImage] = useState<Blob | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    socket?.addEventListener('message', (event) => {
      setMostRecentImage(event.data);
    });

    return () => controller.abort()
  }, [socket])

  const sendImage = useCallback(
    (image: Blob) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) return;
      socket.send(image)
    },
    [socket]
  )

  return [mostRecentImage, sendImage] as const
}