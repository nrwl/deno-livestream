import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { ToDo } from '@deno-todo/models';

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes

const todos: Record<string, ToDo> = {};
let count = 0;

const router = new Router();
router
  .get('/', (context) => {
    context.response.body = Object.values(todos);
  })
  .post('/create', async ({ request, response }) => {
    count++;
    const id = `${count}`;
    const todo = {
      id,
      title: (await request.body().value).title,
      completed: false,
    };
    response.body = todo;
    todos[todo.id] = todo;
  })
  .post('/toggle', async ({ request, response }) => {
    const todo = todos[(await request.body().value).id];
    todo.completed = !todo.completed;
    response.body = todo;
  })
  .delete('/', async ({ request, response }) => {
    const id = (await request.body().value).id;
    const todo = todos[id];
    delete todos[id];
    response.body = todo;
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
