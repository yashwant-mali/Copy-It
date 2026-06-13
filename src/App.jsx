import { useState } from "react";
import PageNav from "./components/PageNav";
import CopyPage from "./pages/CopyPage";
import TodoPage from "./pages/TodoPage";

function App() {
  const [currentPage, setCurrentPage] = useState("copy");

  return (
    <div className="app-shell">
      <PageNav currentPage={currentPage} onChange={setCurrentPage} />
      {currentPage === "copy" ? <CopyPage /> : <TodoPage />}
    </div>
  );
}

export default App;
