import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
  const [todo, setTodo] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleTodo = async () => {
    await axios.get(`https://todo-list-wkti.onrender.com/todos/${id}`)
      .then(res => {
        setTodo(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
      })
      .catch(err => console.error(err))
  };

  const editTodo = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axios.put(`https://todo-list-wkti.onrender.com/todos/${id}`, {
      title: title,
      description: description,
      completed: todo.completed,
    }).then(res => {
      console.log('updated')
      setLoading(false)
      navigate(`/todos/${todo.id}`)
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getSingleTodo()
  }, [])

  return (
    <div className="create-section">
      <h1>Edit todo</h1>
      <form onSubmit={e => editTodo(e)}>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        {loading && <button>editing...</button>}
        {!loading && <button>edit</button>}
      </form>
    </div>
  );
}
