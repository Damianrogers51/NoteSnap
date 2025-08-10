import Note from "./Note";

export default function NotePage({ params }: { params: { noteId: string } }) {
  return (
    <Note id={params.noteId} />
  );
}