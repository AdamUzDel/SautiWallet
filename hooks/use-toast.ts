"use client"

import { toast as sonnerToast, type ToastT } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function useToast() {
  const toast = ({ title, description, variant = "default", duration = 5000, action }: ToastProps) => {
    const options: ToastT = {
      duration,
      className: variant === "destructive"
        ? "bg-destructive text-destructive-foreground"
        : variant === "success"
          ? "bg-green-500 text-white"
          : undefined,
      id: ""
    }

    if (action) {
      options.action = {
        label: action.label,
        onClick: action.onClick,
      }
    }

    return sonnerToast(title, {
      description,
      ...options,
    })
  }

  return {
    toast,
    dismiss: sonnerToast.dismiss,
    error: (message: string) => sonnerToast.error(message),
    success: (message: string) => sonnerToast.success(message),
  }
}
