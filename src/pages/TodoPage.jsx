import { useEffect, useMemo, useState } from "react";
import Topbar from "../components/Topbar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import useLocalStorage from "../hooks/useLocalStorage";

const TODO_STORAGE_KEY = "copyit-todos";
const defaultTodo = { id: null, title: "", details: "", completed: false };

export default function TodoPage() {
  const [tasks, setTasks] = useLocalStorage(TODO_STORAGE_KEY, []);
  const [form, setForm] = useState(defaultTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState("");

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => b.updatedAt - a.updatedAt),
    [tasks],
  );

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(timeout);
  }, [toast]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(defaultTodo);
    setIsEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      setToast("Give your task a title before saving");
      return;
    }

    const payload = {
      ...form,
      title: trimmedTitle,
      updatedAt: Date.now(),
    };

    if (isEditing && form.id) {
      setTasks((prev) =>
        prev.map((task) => (task.id === form.id ? payload : task)),
      );
      setToast("Task updated");
    } else {
      setTasks((prev) => [{ ...payload, id: Date.now().toString() }, ...prev]);
      setToast("Task saved");
    }

    resetForm();
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: Date.now() }
          : task,
      ),
    );
  };

  const handleEdit = (task) => {
    setForm(task);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (isEditing && form.id === id) resetForm();
    setToast("Task deleted");
  };

  const handleCopy = async (task) => {
    try {
      const textToCopy = `${task.title}${task.details ? "\n\n" + task.details : ""}`;
      await navigator.clipboard.writeText(textToCopy);
      setToast("Task copied to clipboard");
    } catch {
      setToast("Unable to copy");
    }
  };

  return (
    <div className="page-content">
      <main className="content-layout">
        <section className="form-panel">
          <div className="panel-header">
            <h2>{isEditing ? "Edit task" : "Add new task"}</h2>
            <p>
              Save tasks that stay available across page reloads, right in your
              browser.
            </p>
          </div>

          <TodoForm
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />
        </section>

        <section className="list-panel">
          <div className="panel-header">
            <h2>Todo list</h2>
            <p>
              {tasks.length} task{tasks.length === 1 ? "" : "s"} stored locally
            </p>
          </div>

          {sortedTasks.length === 0 ? (
            <div className="empty-state">
              <p>
                No tasks yet. Add your first todo and keep it saved locally.
              </p>
            </div>
          ) : (
            <TodoList
              items={sortedTasks}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCopy={handleCopy}
            />
          )}
        </section>
      </main>

      <Topbar
        title="Todo list manager"
        description="Keep an independent todo list inside the same app. Tasks save locally in your browser."
        highlights={["Local persistence", "Edit tasks", "Quick copy"]}
      />

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
