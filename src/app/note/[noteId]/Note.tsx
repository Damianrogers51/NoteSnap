'use client';

import { useState } from "react";
import { useQRCode } from 'next-qrcode';
import { useCompanion } from "@/app/hooks/useCompanion";
import { DynamicEditor } from "./Editor/DynamicEditor";

export interface Attachment {
  url: string;
  name: string;
}

export default function Note({ id }: { id: string }) {
  const [image] = useCompanion(
    () => `ws://${window.location.host}/api/ws?noteId=${id}`,
  );
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false)

  const { SVG } = useQRCode();
  const QRCode = (
    <SVG
      text={'https://github.com/bunlong/next-qrcode'}
      options={{
        margin: 2,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  )

  return (
    <div className="flex justify-center w-screen h-screen overflow-y-auto px-12 py-24 border-red-500">
      <button onClick={() => setIsQRCodeOpen(!isQRCodeOpen)}> Open QR Code </button>

      { isQRCodeOpen && QRCode }

      <div className="w-full max-w-5xl">
        <DynamicEditor image={image} />
      </div>
    </div>
  );
}