'use client';

import { useCompanion } from "@/app/hooks/useCompanion";
import Form from "./Form";

export default function Companion({ id }: { id: string }) {
  const [image, sendImage] = useCompanion(
    () => `ws://${window.location.host}/api/ws?noteId=${id}`,
  );

  return (
    <div>
      <h1> Companion </h1>
      <p> Note ID: {id} </p>
      <p> Image: {image ? 'true' : 'false'} </p>

      <Form onSubmit={sendImage} />
    </div>
  );
}