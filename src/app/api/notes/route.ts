import { createClient } from '@/lib/supabase/server'
import {  NextResponse } from 'next/server'
import { generateDisplayId } from '@/lib/utils'

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
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
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
      .insert({ display_id: generateDisplayId() })
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
