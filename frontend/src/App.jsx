import { useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'
import { useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [reRender, setReRender] = useState(0);

  // infite request will occurrs
  // fetch("https://be.todoapp.malekmoin.com/todos")
  //   .then((response) => {
  //     response.json()
  //       .then((value) => {
  //         setTodos(value.todos)
  //       });
  //   });

  useEffect(() => {
    fetch("https://be.todoapp.malekmoin.com/todos")
    .then((response) => {
      response.json()
        .then((value) => {
          setTodos(value.todos)
        });
    });
  }, [reRender]);

  return (
    <>
      <CreateTodo setReRender={setReRender}/>
      <Todos todos={todos} setReRender={setReRender}/>
    </>
  )
}

export default App
