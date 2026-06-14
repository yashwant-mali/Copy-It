import { useState } from "react";

function IconCopy() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M16 1H4a2 2 0 0 0-2 2v12"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="8"
        y="5"
        width="13"
        height="13"
        rx="2"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M3 21v-3a4 4 0 0 1 4-4h3"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.7 7.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L9 10.1V13h2.9l6.8-5.7z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDelete() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
    >
      <polyline
        points="3 6 5 6 21 6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11v6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11v6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={`chevron ${open ? "rotated" : ""}`}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
    >
      <polyline
        points="6 9 12 15 18 9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EntryList({ items, onCopy, onEdit, onDelete }) {
  const [openIds, setOpenIds] = useState(new Set());

  const toggle = (id) => {
    setOpenIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  return (
    <div className="item-grid">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <article
            key={item.id}
            className={`item-card ${isOpen ? "open" : "collapsed"}`}
          >
            <div
              className="item-header clickable"
              onClick={() => toggle(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggle(item.id)}
            >
              <div className="header-left">
                <h3>{item.title}</h3>
                <span className="badge">
                  {item.type === "link" ? "Link" : "Text"}
                </span>
              </div>
              <div className="header-right">
                <span className="timestamp">
                  {new Date(item.updatedAt).toLocaleString()}
                </span>
                <Chevron open={isOpen} />
              </div>
            </div>

            {isOpen && item.type === "link" && item.link ? (
              <a
                className="item-link"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                {item.link}
              </a>
            ) : null}

            {isOpen ? (
              <div className="item-content">
                {item.content ? (
                  <pre>{item.content}</pre>
                ) : (
                  <em>No additional content</em>
                )}
              </div>
            ) : null}

            {isOpen ? (
              <div className="item-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(item);
                  }}
                  title="Copy"
                >
                  <IconCopy />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item);
                  }}
                  title="Edit"
                >
                  <IconEdit />
                </button>
                <button
                  className="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  title="Delete"
                >
                  <IconDelete />
                </button>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
