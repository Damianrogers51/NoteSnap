'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useCompanion(noteId: string) {
  const socket = useRef<Socket | null>(null)

  const [image, setImage] = useState<ArrayBuffer>();

  useEffect(() => {
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
    }

    socket.current = io(process.env.NEXT_PUBLIC_WS_URL!, {
      extraHeaders: {
        'note-id': noteId,
      },
    });
    socket.current.on('image', setImage);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [noteId])

  const sendImage = useCallback(
    (image: ArrayBuffer) => socket.current?.emit('image', image),
    []
  )

  return [image, sendImage] as const
}