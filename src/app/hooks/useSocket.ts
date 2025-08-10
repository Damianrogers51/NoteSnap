'use client';

import { useEffect, useRef, useState } from 'react';

export function useSocket(url: () => string) {
  const ref = useRef<WebSocket>(null);
  const target = useRef(url);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (ref.current) return;
    const socket = new WebSocket(target.current());
    ref.current = socket;
    setRerender(true);

    return () => socket.close();
  }, []);

  return ref.current;
}