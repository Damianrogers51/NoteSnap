import Companion from "./Companion";

export default async function CompanionPage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;

  return (
    <Companion id={noteId} />
  );
}