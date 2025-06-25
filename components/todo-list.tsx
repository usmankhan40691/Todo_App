import { TodoItem } from "./todo-item"
import type { Todo } from "@/app/page"

interface TodoListProps {
  todos: Todo[]
  onUpdateTodo: (id: number, updates: Partial<Pick<Todo, "title" | "completed">>) => void
  onDeleteTodo: (id: number) => void
}

export function TodoList({ todos, onUpdateTodo, onDeleteTodo }: TodoListProps) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdateTodo} onDelete={onDeleteTodo} />
      ))}
    </div>
  )
}
