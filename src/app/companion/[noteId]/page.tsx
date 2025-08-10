import Companion from "./Companion";

export default function CompanionPage({ params }: { params: { noteId: string } }) {
  return (
    <Companion id={params.noteId} />
  );
}