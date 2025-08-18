'use client';
 
import React from 'react';
import { toast as sonnerToast } from 'sonner';
 
interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        icon={toast.icon}
      />
    ),
    {
      position: "top-right"
    }
  );
}
 
function Toast(props: ToastProps) {
  const { title, description, icon } = props;
 
  return (
    <div className="flex bg-background max-w-sm text-xs text-foreground px-4 py-3 border-[.5px] border-neutral-200 border-b-neutral-400/80 rounded-lg shadow-xs"
     style={{
      fontFamily: 'DM Sans, sans-serif',
     }}>
      <div className="flex flex-1 items-center space-y-1">
        <div className="w-full">
          <div className="flex items-center space-x-1">
            {icon}
            <p className="text-foreground font-semibold"> {title} </p>
          </div>

          <p className="text-foreground opacity-60"> {description} </p>
        </div>
      </div>
    </div>
  );
}