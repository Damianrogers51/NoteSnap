'use client';

import { ChangeEvent, useState } from "react";

export default function Form({
  onSubmit,
}: {
  onSubmit: (image: Blob) => void;
}) {
  const [image, setImage] = useState<Blob | null>(null);

  async function onImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    
    if (!file) return;
    const blob = new Blob([file], { type: file.type });
    setImage(blob);
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();

      if (!image) return;
      onSubmit(image);
    }}>
      <input 
        type="file" 
        name="image"
        accept="image/*"
        onChange={onImageUpload}
      />
      <button type="submit">Upload Image</button>
    </form>
  );
}