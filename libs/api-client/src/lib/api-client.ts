import { ToDo } from '@deno-todo/models';

export function getTodos(): Promise<ToDo[]> {
  return fetch('http://localhost:4200/todos').then((res) => res.json());
}

export function createTodo(title: string): Promise<ToDo> {
  return fetch('http://localhost:4200/todos/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
}

export function toggleTodo(id: string): Promise<ToDo> {
  return fetch('http://localhost:4200/todos/toggle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}

export function deleteTodo(id: string): Promise<ToDo> {
  return fetch('http://localhost:4200/todos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}
