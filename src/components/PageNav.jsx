export default function PageNav({ currentPage, onChange }) {
  return (
    <div className="nav-bar">
      <button
        className={currentPage === "copy" ? "nav-button active" : "nav-button"}
        onClick={() => onChange("copy")}
      >
        Copy Hub
      </button>
      <button
        className={currentPage === "todo" ? "nav-button active" : "nav-button"}
        onClick={() => onChange("todo")}
      >
        Todo List
      </button>
    </div>
  );
}
