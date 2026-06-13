export default function TodoForm({
  form,
  isEditing,
  onChange,
  onSubmit,
  onReset,
}) {
  return (
    <form onSubmit={onSubmit} className="entry-form">
      <label>
        Task name
        <input
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
          placeholder="Example: Send meeting agenda"
        />
      </label>

      <label>
        Notes
        <textarea
          value={form.details}
          onChange={(event) => onChange("details", event.target.value)}
          placeholder="Optional details for the task"
          rows="6"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {isEditing ? "Update task" : "Save task"}
        </button>
        <button type="button" className="secondary-button" onClick={onReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
