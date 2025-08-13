'use client'

import { useQRCode } from "next-qrcode";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CompanionCode({ noteId }: { noteId: string }) {
  const { SVG } = useQRCode();
  const QRCode = (
    <SVG
      text={`${process.env.NEXT_PUBLIC_BASE_URL!}/companion/${noteId}`}
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
      <DialogTrigger>
        <div className="flex items-center space-x-2">
          <div className="text-neutral-300 text-3xl font-semibold hover:text-neutral-400 transition cursor-pointer">
            {noteId.slice(0, 8).toUpperCase()}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center py-4 space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-neutral-300 text-neutral-500 font-semibold rounded-lg px-2 py-1">
              {noteId.slice(0, 8).toUpperCase()}
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="text-3xl font-bold"> Companion Code </div>
              <div className="opacity-60"> Scan the QR code to open the companion page for this note </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="border-[.5px] border-neutral-300 rounded-xl overflow-hidden">
              {QRCode}
            </div>

            <button className="w-full bg-foreground text-background font-semibold px-4 py-2 rounded-lg">
              Copy Link
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}