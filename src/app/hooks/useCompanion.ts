'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useCompanion(noteId: string) {
  const socket = useRef<Socket>(null)

  const [image, setImage] = useState<Blob>();

  useEffect(() => {
    if (socket.current) return;
    socket.current = io(process.env.NEXT_PUBLIC_WS_URL!, {
      extraHeaders: {
        'note-id': noteId,
      },
    });
    socket.current.on('image', setImage);

    return () => {
      socket.current?.disconnect();
    };
  }, [noteId])

  const sendImage = useCallback(
    (image: Blob) => socket.current?.emit('image', image),
    []
  )

  return [image, sendImage] as const
}