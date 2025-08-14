# NoteSnap

A modern note-taking application built with Next.js that allows you to create, edit, and collaborate on notes with real-time image attachments via companion links.

## Features

- **Rich Text Editor**: Powered by BlockNote for a modern writing experience
- **Real-time Collaboration**: Share companion links to attach images directly to notes
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Instant Saving**: Auto-saves your notes as you type
- **Image Attachments**: Drag and drop or paste images directly into your notes
- **Clean Interface**: Minimalist design focused on content creation

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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_WS_URL=your_websocket_server_url
```

4. Set up your Supabase database:
   - Create a new Supabase project
   - Create a `notes` table with the following schema:
   ```sql
   CREATE TABLE notes (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     display_id TEXT UNIQUE NOT NULL,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Architecture

### Project Structure

```
notesnap/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── notes/         # Note CRUD operations
│   │   ├── companion/         # Companion link pages
│   │   ├── home/              # Home page components
│   │   ├── note/              # Note editing pages
│   │   └── hooks/             # Custom React hooks
│   ├── components/            # Reusable UI components
│   │   └── ui/               # shadcn/ui components
│   └── lib/                   # Utility functions
│       └── supabase/         # Supabase client configuration
├── data/                      # Local data storage
└── public/                    # Static assets
```

### Key Components

#### 1. **Note Management**
- **`/` (Home)**: Displays all notes with previews
- **`/note/[noteId]`**: Individual note editing page
- **API Routes**: Handle CRUD operations for notes

#### 2. **Companion System**
- **`/companion/[noteId]`**: Companion link page for image sharing
- **Real-time Updates**: Uses Socket.IO for live image transmission
- **QR Code Generation**: Easy sharing via QR codes

#### 3. **Editor System**
- **BlockNote Integration**: Rich text editor with block-based editing
- **Auto-save**: Real-time saving as you type
- **Image Support**: Drag, drop, and paste image functionality

### Data Flow

1. **Note Creation**: Users create notes through the home page
2. **Real-time Editing**: Changes are saved automatically via API calls
3. **Companion Sharing**: Generate companion links for image sharing
4. **Image Attachment**: Images sent via companion links appear in real-time
5. **Persistence**: All data is stored in Supabase PostgreSQL database

### API Endpoints

- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[noteId]` - Fetch a specific note
- `PUT /api/notes/[noteId]` - Update a note
- `DELETE /api/notes/[noteId]` - Delete a note

### Real-time Features

The application uses Socket.IO for real-time communication:
- **Image Sharing**: Instant image transmission from companion devices
- **Live Updates**: Real-time synchronization between devices
- **Connection Management**: Automatic reconnection and error handling
