import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (same as in route.ts)
// This would be shared through a database in a real Django app
const todos = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Build a todo app",
    completed: true,
    created_at: new Date().toISOString(),
  },
]

// GET /api/todos/<id>/ - Retrieve a specific todo
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 })
    }

    const todo = todos.find((t) => t.id === id)

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 })
  }
}

// PUT /api/todos/<id>/ - Update a todo
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 })
    }

    const todoIndex = todos.findIndex((t) => t.id === id)

    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    const body = await request.json()
    const { title, completed } = body

    // Validation
    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return NextResponse.json({ error: "Title must be a non-empty string" }, { status: 400 })
      }
      if (title.length > 200) {
        return NextResponse.json({ error: "Title must be 200 characters or less" }, { status: 400 })
      }
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return NextResponse.json({ error: "Completed must be a boolean" }, { status: 400 })
    }

    // Update todo
    const updatedTodo = {
      ...todos[todoIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(completed !== undefined && { completed }),
    }

    todos[todoIndex] = updatedTodo

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
  }
}

// DELETE /api/todos/<id>/ - Delete a todo
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 })
    }

    const todoIndex = todos.findIndex((t) => t.id === id)

    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    todos.splice(todoIndex, 1)

    return NextResponse.json({ message: "Todo deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 })
  }
}
