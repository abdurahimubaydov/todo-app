import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const createTodo = async (e) => {
    e.preventDefault();
    if (title && description) {
      setLoading(true);
      await axios.post("https://todo-list-wkti.onrender.com/todos", {
        title: title,
        description: description,
        completed: false,
      })
        .then((res) => {
          setLoading(false);
          setTitle("");
          setDescription("");
          setModal(true)
        })
        .catch((err) => console.error(err));
    } else {
      alert('Please fill the forms!')
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setModal(false);
    }, 1500);
  }, [modal === true]);

  return (
    <div className="create-section">
      <div
        onClick={() => setModal(false)}
        className={`close-modal ${modal === true ? 'active' : ''}`}
      >
        <h2>
          todo has just created
        </h2>
      </div>
      <h1>Create a new todo</h1>
      <form onSubmit={(e) => createTodo(e)}>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {loading && <button>loading...</button>}
        {!loading && <button>create</button>}
      </form>
    </div>
  );
}
