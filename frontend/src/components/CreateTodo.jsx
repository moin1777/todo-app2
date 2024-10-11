import { useState } from "react"

export default function ({reRender, setReRender}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      <input type={"text"} placeholder={"enter title"} onChange={e => setTitle(e.target.value)}/> <br/><br/>
      <input type={"text"} placeholder={"enter description"} onChange={e => setDescription(e.target.value)}/> <br/><br/>
      <button onClick={() => {
        fetch("http://localhost:3000/todo", {
          method: "POST",
          body: JSON.stringify({
            title,
            description
          }), 
          headers: {
            "Content-type": "application/json"
          }
        }).then(async (response) => {
          const result = await response.json();
          alert(result.msg);
          // setReRender(reRender + 1);
          setReRender(Math.random());
        })
      }}>Add a todo</button>
    </div>
  )
}