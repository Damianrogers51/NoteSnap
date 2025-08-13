import { createClient } from "@/utils/supabase/server";
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

    const body = await request.json()
    const updateData: any = {
      id: noteId,
      updated_at: new Date().toISOString()
    }

    if (body.content !== undefined) {
      updateData.content = typeof body.content === 'string' ? body.content : JSON.stringify(body.content)
    }
    if (body.title !== undefined) {
      updateData.title = body.title
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('notes')
      .upsert(updateData)
      .select()
      .single()
    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Failed to save note' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
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
      return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
    }

    console.log(data)

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}