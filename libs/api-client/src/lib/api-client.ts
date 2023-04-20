import { ToDo } from '@deno-todo/models';

export function getTodos(): Promise<ToDo[]> {
  return fetch('http://localhost:3000').then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Failed to fetch todos');
  });
}

export function createTodo(title: string): Promise<ToDo> {
  return fetch('http://localhost:3000/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
}

export async function toggleTodo(id: string): Promise<ToDo> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log('done waiting');
  return fetch('http://localhost:3000/toggle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}

export function deleteTodo(id: string): Promise<ToDo> {
  return fetch('http://localhost:3000', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}
