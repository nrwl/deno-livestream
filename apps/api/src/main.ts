import express from 'express';
import cors from 'cors';
import {
  CreateTodoRequestBody,
  CreateTodoResponseBody,
  DeleteTodoRequestBody,
  DeleteTodoResponseBody,
  ToDo,
  ToggleTodoRequestBody,
  ToggleTodoResponseBody,
} from '@deno-todo/models';
import bodyParser from 'body-parser';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());
app.use(express.json());

const todos: Record<string, ToDo> = {};
let count = 0;

app.get<void, ToDo[]>('', (req, res) => {
  res.send(Object.values(todos));
});

app.post<void, CreateTodoRequestBody, CreateTodoResponseBody>(
  '/create',
  (req, res) => {
    count++;
    const id = `${count}`;
    console.log(req.body);
    const todo = { id, title: req.body.title, completed: false };
    res.send(todo);
    todos[todo.id] = todo;
  }
);

app.post<void, ToggleTodoRequestBody, ToggleTodoResponseBody>(
  '/toggle',
  (req, res) => {
    const todo = todos[req.body.id];
    todo.completed = !todo.completed;
    res.send(todo);
  }
);

app.delete<void, DeleteTodoRequestBody, DeleteTodoResponseBody>(
  '',
  bodyParser.json(),
  (req, res) => {
    const todo = todos[req.body.id];
    delete todos[req.body.id];
    res.send(todo);
  }
);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
