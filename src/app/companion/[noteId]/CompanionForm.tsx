'use client';

import { useCompanion } from "@/app/hooks/useCompanion";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function CompanionForm({ id }: { id: string }) {
  const [image, setImage] = useState<Blob | null>(null);

  const [, sendImage] = useCompanion(id);

  function handleAttachImage() {
    if (!image) return;
    sendImage(image);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const blob = new Blob([file], { type: file.type });
    setImage(blob);
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`relative flex flex-col items-center aspect-[3/4] w-80 bg-neutral-100 rounded-xl cursor-pointer`}>
        <form>
          <input 
            type="file" 
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute top-0 left-0 size-full opacity-0 z-20"
          />
        </form>

        {image ? (
          <div className="relative size-full bg-[url(/background.jpg)] bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden">
            <Image src={URL.createObjectURL(image)} alt="Uploaded" className="object-contain z-10" fill />
            <div className="absolute top-0 left-0 size-full bg-black/40 backdrop-blur-xl"></div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 size-full flex flex-col items-center justify-center border-[.5px] border-neutral-300 rounded-xl space-y-2">
            <div className="opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>

            <div className="opacity-40"> Click here to upload </div>
          </div>
        )}
      </div>

      <button
        onClick={handleAttachImage}
        disabled={!image}
        className={`w-80 text-center border-neutral-300 px-3 py-2 rounded-xl hover:opacity-[.97] transition-all duration-100 ${!image ? 'text-neutral-500 border-[.5px]' : 'bg-foreground text-neutral-300 font-semibold cursor-pointer'}`}>
          Attach Image
      </button>
    </div>
  );
}