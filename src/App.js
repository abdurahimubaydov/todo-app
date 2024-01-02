import { Routes, Route, Link } from "react-router-dom";
import "./style.css";
import Home from "./pages/home";
import Create from "./pages/create";
import EditTodo from "./pages/edit-todo";
import TodoDetail from "./pages/todo-detail";

export default function App() {
  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <Link to={"/"} className="h1">
            Todo
          </Link>
          <Link to={"/create"}>
            <button>create new one</button>
          </Link>
        </header>
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/todos/edit/:id" element={<EditTodo />} />
            <Route path="/todos/:id" element={<TodoDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
