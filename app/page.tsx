"use client"

import { useState, useEffect } from "react"
import { TodoList } from "@/components/todo-list"
import { TodoInput } from "@/components/todo-input"
import { FilterButtons } from "@/components/filter-buttons"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"

export interface Todo {
  id: number
  title: string
  completed: boolean
  created_at: string
}

export type FilterType = "all" | "completed" | "incomplete"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/todos")
      if (!response.ok) {
        throw new Error("Failed to fetch todos")
      }
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Create new todo
  const createTodo = async (title: string) => {
    try {
      setError(null)
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create todo")
      }

      const newTodo = await response.json()
      setTodos((prev) => [...prev, newTodo])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo")
    }
  }

  // Update todo
  const updateTodo = async (id: number, updates: Partial<Pick<Todo, "title" | "completed">>) => {
    try {
      setError(null)
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update todo")
      }

      const updatedTodo = await response.json()
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo")
    }
  }

  // Delete todo
  const deleteTodo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this todo?")) {
      return
    }

    try {
      setError(null)
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete todo")
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo")
    }
  }

  // Filter todos based on completion status
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "incomplete") return !todo.completed
    return true
  })

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Todo App</h1>

          <TodoInput onCreateTodo={createTodo} />

          {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            todoCount={{
              all: todos.length,
              completed: todos.filter((t) => t.completed).length,
              incomplete: todos.filter((t) => !t.completed).length,
            }}
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <TodoList todos={filteredTodos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} />
          )}

          {!loading && filteredTodos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {filter === "all"
                ? "No todos yet. Create your first todo above!"
                : filter === "completed"
                  ? "No completed todos."
                  : "No incomplete todos."}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
