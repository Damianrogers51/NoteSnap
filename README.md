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

#### 3. **Editor System**
- **BlockNote Integration**: Rich text editor with block-based editing
- **Auto-save**: Real-time saving as you type
- **Image Support**: Drag, drop, and paste image functionality

### Data Flow

1. **Note Creation**: Users create notes through the home page
2. **Real-time Editing**: Changes are saved automatically via API calls to Supabase
3. **Companion Sharing**: Generate companion links for image sharing
4. **Image Attachment**: Images sent via companion links appear in real-time through WebSocket
5. **Persistence**: All note data is stored in Supabase PostgreSQL database

### WebSocket Server Details

The WebSocket server is a separate Node.js application that handles real-time image sharing:

#### Server Setup
```javascript
const { Server } = require('socket.io');
const io = new Server(8080, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
```

#### Room-based Communication
- **Room Creation**: Each note's `display_id` becomes a Socket.IO room
- **Client Isolation**: Clients only receive messages for their specific note
- **Scalability**: Multiple notes can operate simultaneously without interference

#### Message Flow
1. **Connection**: Client connects with `note-id` in headers
2. **Room Assignment**: Server automatically assigns client to note-specific room
3. **Image Broadcasting**: Companion sends image, server broadcasts to room
4. **Real-time Update**: Note client receives image and updates UI immediately

### API Endpoints

- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[noteId]` - Fetch a specific note
- `PUT /api/notes/[noteId]` - Update a note
- `DELETE /api/notes/[noteId]` - Delete a note

### Real-time Features

The application uses Socket.IO for real-time communication with a dedicated WebSocket server:

#### WebSocket Server Architecture
- **Separate Node.js Server**: Runs independently on port 8080 (configurable via `NEXT_PUBLIC_WS_URL`)
- **One-way Communication**: Companion clients send images, note clients receive and display them
- **Room-based Isolation**: Each note has its own Socket.IO room based on the `display_id`

#### Socket.IO Room Implementation
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

**Companion Client**
```typescript
// Companion clients send images to the same room
const socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
  extraHeaders: {
    'note-id': noteId, // Joins the same room as note client
  },
});

// Send image data
socket.emit('image', imageArrayBuffer);
```

**Key Features**
- **Room Management**: Automatic room assignment based on `display_id` in connection headers
- **One-way Communication**: Companion clients send, note clients receive
- **Real-time Updates**: Images appear instantly in the note editor
- **Connection Handling**: Automatic reconnection and cleanup

#### Data Flow for Image Sharing
1. **Companion Device**: Captures/selects image
2. **WebSocket Connection**: Establishes connection with note-specific room
3. **Image Transmission**: Sends image data to WebSocket server
4. **Room Broadcasting**: Server broadcasts to all clients in the same note room
5. **Note Client**: Receives image and updates the editor in real-time

#### Connection Management
- **Automatic Reconnection**: Socket.IO handles connection drops and reconnects
- **Room Persistence**: Clients automatically rejoin their assigned rooms on reconnect
- **Error Handling**: Graceful fallback when WebSocket server is unavailable
