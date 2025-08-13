'use client';

import { useCompanion } from "@/app/hooks/useCompanion";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Upload, Check } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function CompanionForm({ id }: { id: string }) {
  const [image, setImage] = useState<ArrayBuffer | null>(null);
  const [imageSent, setImageSent] = useState(false);

  const [, sendImage] = useCompanion(id);

  function handleAttachImage() {
    if (!image) return;
    sendImage(image);
    setImageSent(true);
    toast({
      title: "Image Sent",
      description: "Your image has been successfully sent",
      icon: <Check className="size-3 text-green-600" />
    })
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as ArrayBuffer);
      setImageSent(false);
    };
    reader.readAsArrayBuffer(file);
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
            className="absolute top-0 left-0 size-full opacity-0 z-20 cursor-pointer"
          />
        </form>

        {image ? (
          <div className="relative size-full bg-[url(/background.jpg)] bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden">
            <Image src={URL.createObjectURL(new Blob([image]))} alt="Uploaded" className="object-contain z-10" fill />
            <div className="absolute top-0 left-0 size-full bg-black/40 backdrop-blur-xl"></div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 size-full flex flex-col items-center justify-center border-[.5px] border-neutral-300 rounded-xl">
            <div className="flex flex-col items-center justify-center space-y-2 opacity-40">
              <Upload className="size-3" />
              <div> Click here to upload </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleAttachImage}
        disabled={!image}
        className={`w-80 text-center border-neutral-300 px-3 py-2 rounded-xl hover:opacity-[.97] transition-all duration-100 flex items-center justify-center space-x-2 ${!image ? 'text-neutral-500 border-[.5px]' : 'bg-foreground text-neutral-300 font-semibold cursor-pointer'}`}>
          {imageSent ? (
            <>
              <Check className="size-4" />
            </>
          ) : (
            <span>Attach Image</span>
          )}
      </button>
    </div>
  );
}