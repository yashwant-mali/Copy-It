import { useEffect, useMemo, useState } from "react";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import Topbar from "../components/Topbar";
import useLocalStorage from "../hooks/useLocalStorage";

const STORAGE_KEY = "copyit-items";
const defaultForm = {
  id: null,
  title: "",
  type: "text",
  link: "",
  content: "",
  color: "blue",
};

export default function CopyPage() {
  const [items, setItems] = useLocalStorage(STORAGE_KEY, []);
  const [form, setForm] = useState(defaultForm);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState("");

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.updatedAt - a.updatedAt),
    [items],
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
    setForm(defaultForm);
    setIsEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      setToast("Give it a title before saving");
      return;
    }

    const payload = {
      ...form,
      title: trimmedTitle,
      color: form.color || "blue",
      updatedAt: Date.now(),
    };

    if (isEditing && form.id) {
      setItems((prev) =>
        prev.map((item) => (item.id === form.id ? payload : item)),
      );
      setToast("Updated successfully");
    } else {
      setItems((prev) => [{ ...payload, id: Date.now().toString() }, ...prev]);
      setToast("Added to your list");
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (isEditing && form.id === id) resetForm();
    setToast("Deleted successfully");
  };

  const handleCopy = async (item) => {
    try {
      const textToCopy =
        item.type === "link"
          ? item.link || item.content
          : item.content || item.link;
      await navigator.clipboard.writeText(textToCopy);
      setToast("Copied to clipboard");
    } catch {
      setToast("Unable to copy");
    }
  };

  return (
    <div className="page-content">
      <main className="content-layout">
        <section className="form-panel">
          <div className="panel-header">
            <h2>{isEditing ? "Edit saved entry" : "Add new entry"}</h2>
            <p>
              Keep your link, email content, or multiline note exactly as it
              should appear.
            </p>
          </div>

          <EntryForm
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />
        </section>

        <section className="list-panel">
          <div className="panel-header">
            <h2>Saved entries</h2>
            <p>
              {items.length} item{items.length === 1 ? "" : "s"} saved locally
            </p>
          </div>

          {sortedItems.length === 0 ? (
            <div className="empty-state">
              <p>
                No saved items yet. Start by adding a link or formatted text.
              </p>
            </div>
          ) : (
            <EntryList
              items={sortedItems}
              onCopy={handleCopy}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>

      <Topbar
        title="Save links and formatted text"
        description="Add links, emails, notes, or formatted content with full spacing preserved."
        highlights={[
          "Front-end storage",
          "Preserves formatting",
          "Fast copy action",
        ]}
      />

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
