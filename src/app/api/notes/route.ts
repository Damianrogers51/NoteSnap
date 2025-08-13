import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/notes
 *
 * Get all notes.
 *
 * @returns Notes[]
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('notes').select('*')
    if (error) {
      return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/notes
 *
 * Create a new note.
 *
 * @returns Note
 */
export async function POST() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('notes')
      .insert({})
      .select()
      .single()
    if (error) {
      return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
