# NoteSnap

A modern note-taking application built with Next.js that allows you to create, edit, and collaborate on notes with real-time image attachments via companion links.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Socket.IO for live image sharing
- **Editor**: BlockNote for rich text editing


## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project

### Environment Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd notesnap
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=https://fhggqijhweqfgzayfbdl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZ2dxaWpod2VxZmd6YXlmYmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NzIyNTcsImV4cCI6MjA3MDQ0ODI1N30.arMG9RUGTNQ97fgOTMibDwyxftcomySuASRW9NsrGYY
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Architecture

### Overview
NoteSnap's architecture consists of three primary components: a frontend client for user interface and display, a backend server for API handling and database operations, and a dedicated WebSocket server enabling real-time communication between clients.

This repository is used for 

### Project File Structure

```
notesnap/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── notes/         # Note CRUD operations
│   │   ├── companion/         # Companion link pages
│   │   ├── home/              # Home page components
│   │   ├── note/              # Note editing pages
│   │   └── hooks/             # Custom React hooks
│   ├── components/            
│   │   └── ui/               # shadcn/ui components
│   └── lib/                  # Utility functions
│       └── supabase/         # Supabase client configuration
```

#### 1. **Note Management**
- **`/` (Home)**: Displays all notes with previews
- **`/note/[noteId]`**: Individual note editing page
- **API Routes**: Handle CRUD operations for notes

#### 2. **Companion System**
- **`/companion/[displayId]`**: Companion link page for image sharing
- **Real-time Updates**: Uses Socket.IO for live image transmission
- **QR Code Generation**: Easy sharing via QR codes

### API Endpoints

- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[noteId]` - Fetch a specific note
- `POST /api/notes/[noteId]` - Update a note
- `DELETE /api/notes/[noteId]` - Delete a note

### WebSocket Server

As mentioned earlier, NoteSnap employs a dedicated Node.js WebSocket server for real-time communication.

The application uses Socket.IO for real-time communication with a dedicated WebSocket server:

#### WebSocket Server Features
- **Separate Node.js Server**: Runs independently on port 8080 (configurable via `NEXT_PUBLIC_WS_URL`)
- **One-way Communication**: Companion clients send images, note clients receive and display them
- **Room-based Isolation**: Each note has its own Socket.IO room based on the `display_id`

#### Room-based Communication

Socket.io also simplifies targeting broadcastion through "rooms" which allows us to focus broadcasting of image events to specific connection subsets. This ensures images are delivered only to their designated notes rather than being broadcast to all clients connected to the WebSocket server.

To implement room-based communication, we use each note's ```display_id``` field—a unique 5-character string—to instantiate rooms. This approach serves dual purposes: enabling targeted WebSocket communication and providing users with a short, shareable identifier for quick access to a note's companion link.

Psuedocode for this implementation can be found below:

```javascript
// WebSocket server pseudo-code
io.on('connection', (socket) => {
  // Extract note ID from headers
  const noteId = socket.handshake.headers['note-id'];
  
  // Join room based on note ID
  socket.join(noteId);
  
  // Listen for image messages from companion clients
  socket.on('image', (imageData) => {
    // Broadcast image to all clients in the same room (note)
    socket.to(noteId).emit('image', imageData);
  });
});
```

#### Client-Side Implementation

**Note Client (useCompanion Hook)**
```typescript
// src/app/hooks/useCompanion.ts
export function useCompanion(noteId: string) {
  const socket = useRef<Socket | null>(null);
  const [image, setImage] = useState<ArrayBuffer>();

  useEffect(() => {
    // Connect to WebSocket with note ID in headers
    socket.current = io(process.env.NEXT_PUBLIC_WS_URL!, {
      extraHeaders: {
        'note-id': noteId, // This determines the room
      },
    });
    
    // Listen for incoming images
    socket.current.on('image', setImage);
    
    return () => socket.current?.disconnect();
  }, [noteId]);

  return [image, sendImage] as const;
}
```

#### Connection Management
- **Automatic Reconnection**: Socket.IO handles connection drops and reconnects
- **Room Persistence**: Clients automatically rejoin their assigned rooms on reconnect
- **Error Handling**: Graceful fallback when WebSocket server is unavailable
