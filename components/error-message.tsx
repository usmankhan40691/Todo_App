"use client"

import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  onDismiss: () => void
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-3 p-4 mb-4 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
      <span className="text-red-700 text-sm flex-1">{message}</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={onDismiss}
        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}
