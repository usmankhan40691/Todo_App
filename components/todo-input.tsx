"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TodoInputProps {
  onCreateTodo: (title: string) => void
}

export function TodoInput({ onCreateTodo }: TodoInputProps) {
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTodo = async () => {
    if (!title.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onCreateTodo(title.trim())
      setTitle("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo()
    }
  }

  return (
    <div className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Enter a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
        disabled={isSubmitting}
      />
      <Button onClick={handleAddTodo} disabled={!title.trim() || isSubmitting} className="px-4">
        <Plus className="w-4 h-4 mr-2" />
        Add
      </Button>
    </div>
  )
}
