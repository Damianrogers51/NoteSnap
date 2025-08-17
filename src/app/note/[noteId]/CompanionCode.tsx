'use client'

import { useQRCode } from "next-qrcode";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import { QrCode } from "lucide-react";

export default function CompanionCode({ displayId }: { displayId: string }) {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL!;

  const { SVG } = useQRCode();
  const QRCode = (
    <SVG
      text={`${baseUrl}/companion/${displayId}`}
      options={{
        margin: 2,
        width: 300,
        color: {
          dark: '#3f3f3f',
          light: '#f5f5f5',
        },
      }}
    />
  )
  
  return (
    <Dialog>
      <DialogTrigger className="outline-none">
        <div className="flex items-center text-foreground/60 px-3 py-1 space-x-1 border-[.5px] border-neutral-200 shadow-xs backdrop-blur-sm hover:bg-neutral-100 hover:text-foreground transition-all rounded-lg cursor-pointer">
          <QrCode className="w-4 h-4 stroke-[2.5px]" />
          <div className="text-lg font-semibold">
            {displayId}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="outline-none">
        <DialogTitle className="sr-only"> Companion Code </DialogTitle>

        <div className="max-w-xl flex flex-col items-center justify-center py-4 space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-neutral-300 text-neutral-500 font-bold rounded-lg px-2 py-1">
              {displayId}
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold"> Companion Code </div>
              <div className="opacity-60"> Scan the QR code to open the companion page for this note </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="border-[.5px] border-neutral-300 rounded-xl overflow-hidden">
              {QRCode}
            </div>

            <div className="w-full h-px bg-neutral-200 flex items-center justify-center">
              <div className="bg-background text-[11px] text-neutral-400/80 px-1 font-medium"> OR </div>
            </div>

            <Link href={`/companion/${displayId}`} target="_blank" className="w-full text-center bg-foreground text-background font-semibold px-4 py-2 rounded-lg hover:opacity-[.97] transition">
              Open Companion Link
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}