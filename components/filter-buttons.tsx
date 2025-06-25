"use client"

import { Button } from "@/components/ui/button"
import type { FilterType } from "@/app/page"

interface FilterButtonsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  todoCount: {
    all: number
    completed: number
    incomplete: number
  }
}

export function FilterButtons({ currentFilter, onFilterChange, todoCount }: FilterButtonsProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "All", count: todoCount.all },
    { key: "incomplete", label: "Active", count: todoCount.incomplete },
    { key: "completed", label: "Completed", count: todoCount.completed },
  ]

  return (
    <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={currentFilter === key ? "default" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(key)}
          className="flex-1 text-sm"
        >
          {label} ({count})
        </Button>
      ))}
    </div>
  )
}
