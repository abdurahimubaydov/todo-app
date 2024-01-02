import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactLoading from 'react-loading';

export default function TodoDetail() {
  const [todo, setTodo] = useState({})
  const [loadingPage, setloadingPage] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const getSingleTodo = async () => {
    setloadingPage(true)
    await axios.get(`https://todo-list-wkti.onrender.com/todos/${id}`)
      .then(res => {
        setTodo(res.data)
        setloadingPage(false)
      })
      .catch(err => console.error(err))
  }

  const deleteTodo = async () => {
    await axios.delete(`https://todo-list-wkti.onrender.com/todos/${todo.id}`)
      .then(res => '')
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getSingleTodo()
  }, [])

  return (
    <div className="todo-detail-section">
      {loadingPage === true && <div>
        <h2 className="loading-text">Loading...</h2>
      </div>}
      {loadingPage !== true && <div>
        <div className="todo-detail-header">
          <h1>{todo.title}</h1>
          <div>
            {todo.completed && <h2 style={{ color: 'red', fontSize: '15px' }} >completed</h2>}
            <Link to={`/todos/edit/${todo.id}`}>
              {!todo.completed && <button>
                edit todo <CiEdit size={15} style={{ marginLeft: "5px" }} />{" "}
              </button>}
            </Link>
          </div>
        </div>
        <div className="todo-detail-body">
          <p>{todo.description}</p>
          <div className="delete-todo">
            <button onClick={() => {
              deleteTodo()
              navigate('/')
            }}>
              delete <MdDelete />{" "}
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
}
