import { Note } from "@/app/note/[noteId]/Note";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/notes/[noteId]
 *
 * Get a note by its ID.
 *
 * @returns Note
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ noteId: string }> }) {
  try {
    const { noteId } = await params;
    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .single()
    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/notes/[noteId]
 *
 * Update a note by its ID.
 *
 * @request { content?: string, title?: string }
 * @returns Note
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ noteId: string }> }) {
  try {
    const { noteId } = await params;
    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
    }
    
    const body = await request.json() as { content?: unknown; title?: string }
    const { content, title } = body
    
    const updateData: Partial<Note> = {
      updated_at: new Date().toISOString(),
    }
    
    if (content) {
      updateData.content = typeof content === 'string' ? content : JSON.stringify(content)
    }
    
    if (title) {
      updateData.title = title
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('notes')
      .update(updateData)
      .eq('id', noteId)
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to save note' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/notes/[noteId]
 *
 * Delete a note by its ID.
 *
 * @returns Note
 */
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ noteId: string }> }) {
  try {
    const { noteId } = await params;
    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)
      .select()
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}