import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false)

  const getTodos = async () => {
    setLoadingPage(true)
    await axios.get("https://todo-list-wkti.onrender.com/todos")
      .then((res) => {
        setTodos(res.data)
        setLoadingPage(false)
      })
      .catch((err) => console.err(err));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://todo-list-wkti.onrender.com/todos/${id}`)
      .then(res => getTodos())
      .catch(err => console.error(err))
  }

  const completeTodo = async todo => {
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        console.log('hello')
        item.completed = true
      }
      return item
    }))
    await axios.put(`https://todo-list-wkti.onrender.com/todos/${todo.id}`, {
      title: todo.title,
      description: todo.description,
      completed: true,
    })
      .then(res => console.log('updated'))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="todos-section">
      {todos.length === 0 && loadingPage == false && <div>
        <h1
          style={{
            margin: 20,
            fontWeight: '500',
            fontSize: '30px'
          }}
        >oops, there's not any todos yet</h1>
      </div>}
      {loadingPage == false ? todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo-left">
            <input
              type="checkbox"
              checked={todo.completed}
              onClick={() => completeTodo(todo)}
              disabled={todo.completed}
            />
            <div className="todo-title">
              <h2 className={`${todo.completed === true ? "completed" : ""}`}>{todo.title}</h2>
            </div>
          </div>
          <div className="todo-right">
            <Link to={`/todos/${todo.id}`}>
              <button>read more</button>
            </Link>
            <button onClick={() => deleteTodo(todo.id)}>
              delete <MdDelete />{" "}
            </button>
          </div>
        </div>
      )) : (
        <h1
          style={{
            margin: 20,
            fontWeight: '500',
            fontSize: '30px'
          }}
        >Loading...</h1>
      )}
    </div>
  );
};
