export default function TodoList({
  items,
  onToggle,
  onEdit,
  onDelete,
  onCopy,
}) {
  return (
    <div className="item-grid">
      {items.map((task) => (
        <article key={task.id} className="item-card todo-card">
          <div className="item-header">
            <div>
              <h3>{task.title}</h3>
              <span
                className={`badge ${task.completed ? "badge-completed" : ""}`}
              >
                {task.completed ? "Done" : "Pending"}
              </span>
            </div>
            <span className="timestamp">
              {new Date(task.updatedAt).toLocaleString()}
            </span>
          </div>

          <div className="item-content">
            {task.details ? <pre>{task.details}</pre> : <em>No notes added</em>}
          </div>

          <div className="item-actions">
            <button onClick={() => onToggle(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => onCopy(task)}>Copy</button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button className="danger" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
