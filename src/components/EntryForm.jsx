export default function EntryForm({
  form,
  isEditing,
  onChange,
  onSubmit,
  onReset,
}) {
  return (
    <form onSubmit={onSubmit} className="entry-form">
      <label>
        Title
        <input
          value={form.title}
          onChange={(event) => onChange("title", event.target.value)}
          placeholder="Example: Meeting note or Invoice link"
        />
      </label>

      <label>
        Type
        <select
          value={form.type}
          onChange={(event) => onChange("type", event.target.value)}
        >
          <option value="text">Text / Email / Note</option>
          <option value="link">Link</option>
        </select>
      </label>

      {form.type === "link" ? (
        <label>
          Link URL
          <input
            value={form.link}
            onChange={(event) => onChange("link", event.target.value)}
            placeholder="https://example.com"
          />
        </label>
      ) : null}

      <label>
        Content
        <textarea
          value={form.content}
          onChange={(event) => onChange("content", event.target.value)}
          placeholder="Write email, formatted text, multiline note, or any content here"
          rows="8"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {isEditing ? "Update item" : "Save item"}
        </button>
        <button type="button" className="secondary-button" onClick={onReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
