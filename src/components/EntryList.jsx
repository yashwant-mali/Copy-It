export default function EntryList({ items, onCopy, onEdit, onDelete }) {
  return (
    <div className="item-grid">
      {items.map((item) => (
        <article key={item.id} className="item-card">
          <div className="item-header">
            <div>
              <h3>{item.title}</h3>
              <span className="badge">
                {item.type === "link" ? "Link" : "Text"}
              </span>
            </div>
            <span className="timestamp">
              {new Date(item.updatedAt).toLocaleString()}
            </span>
          </div>

          {item.type === "link" && item.link ? (
            <a
              className="item-link"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              {item.link}
            </a>
          ) : null}

          <div className="item-content">
            {item.content ? (
              <pre>{item.content}</pre>
            ) : (
              <em>No additional content</em>
            )}
          </div>

          <div className="item-actions">
            <button onClick={() => onCopy(item)}>Copy</button>
            <button onClick={() => onEdit(item)}>Edit</button>
            <button className="danger" onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
