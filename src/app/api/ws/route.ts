const rooms = new Map<string, Set<import('ws').WebSocket>>();

export function SOCKET(
  client: import('ws').WebSocket,
  request: import('node:http').IncomingMessage,
  _server: import('ws').WebSocketServer,
) {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const noteId = url.searchParams.get('noteId');
  if (!noteId) {
    // TODO: Update error handling
    client.close(1008, 'noteId is required');
    return;
  }
  
  if (!rooms.has(noteId)) {
    rooms.set(noteId, new Set());
  }
  rooms.get(noteId)!.add(client);
  const room = rooms.get(noteId)!;

  client.on('message', (message) => {
    for (const other of room) {
      if (client !== other && other.readyState === other.OPEN) {
        other.send(message);
      }
    }
  });

  return () => {
    room.delete(client);
    if (room.size === 0) {
      rooms.delete(noteId);
    }
  };
}