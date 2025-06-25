import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      <span className="ml-2 text-gray-500">Loading todos...</span>
    </div>
  )
}
