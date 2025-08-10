import Note from "./Note";

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;

  return (
    <Note id={noteId} />
  );
}