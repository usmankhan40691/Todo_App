import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// In a real Django app, this would be your database
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

let nextId = 3

// GET /api/todos/ - List all todos
export async function GET() {
  try {
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
  }
}

// POST /api/todos/ - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title } = body

    // Validation
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required and must be a non-empty string" }, { status: 400 })
    }

    if (title.length > 200) {
      return NextResponse.json({ error: "Title must be 200 characters or less" }, { status: 400 })
    }

    const newTodo = {
      id: nextId++,
      title: title.trim(),
      completed: false,
      created_at: new Date().toISOString(),
    }

    todos.push(newTodo)

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
  }
}
