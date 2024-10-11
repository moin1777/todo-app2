const express = require("express");
const z = require("zod");
const cors = require("cors");
const Todo = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

const todoInputSchema = z.object({
  title: z.string(),
  description: z.string()
});

app.post("/todo", async (req, res) => {
  const body = req.body;
  if (!(todoInputSchema.safeParse(body).success)) {
    return res.status(403).json({
      msg: "Incorrect inputs"
    });
  }

  await Todo.create({
    title: body.title,
    description: body.description
  });
  res.json({
    msg: "Todo created"
  });
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json({
    todos
  });
});

app.put("/completed/:todoId", async (req, res) => {
  // try {
  //   await Todo.updateOne({
  //     _id: req.params.todoId
  //   }, {
  //     // completed: true
  //     // this is wrong only work with integer
  //     // $bit: {
  //     //   completed: { xor: 1}
  //     // }
  //   });

  try {
    await Todo.updateOne({
      _id: req.params.todoId
    }, [
      {
        "$set": {
          completed: {
            "$cond": {
              if: {"$eq": ["$completed", true]},
              then: false,
              else: true
            }
          }
        }
      }
    ]);
  } catch(e) {
    console.log(e.stack);
    return res.status(411).json({
      msg: "Invalid todo Id"
    });
  }

  res.json({
    msg: "Todo completed successfully"
  });
});

app.listen(3000, () => {
  console.log("The port is listening on 3000");
});