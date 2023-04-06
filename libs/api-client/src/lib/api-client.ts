import { Todo } from '@deno-todo/generated/dotnet-api-types';

export function getTodos(): Promise<Todo[]> {
  return fetch('http://localhost:3000').then((res) => res.json());
}

export function createTodo(title: string): Promise<Todo> {
  return fetch('http://localhost:3000/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
}

export function toggleTodo(id: string): Promise<Todo> {
  return fetch('http://localhost:3000/toggle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}

export function deleteTodo(id: string): Promise<Todo> {
  return fetch('http://localhost:3000', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}
