
export default function ({todos, setReRender}) {
  return (
    <div>
      {todos.map((todo) => <Todo key={todo._id}  id={todo._id} title={todo.title} description={todo.description} completed={todo.completed} setReRender={setReRender}/>)}
    </div>
  )
}

function Todo ({id, title, description, completed, setReRender}) {
  return (
    <div id={id}>
      <h2>{title}</h2>
      <h4>{description}</h4>
      <button onClick={(e) => {
        const id = e.target.parentElement.getAttribute("id");
        fetch(`http://localhost:3000/completed/${id}`, {
          method: "PUT",
        }).then(async (response) => {
          await response.json();
          // setReRender(reRender + 1);  
          setReRender(Math.random());
        })
      }}>{completed?"Done!":"Mark as done"}</button>
    </div>
  )
}