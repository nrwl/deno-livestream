import { createTodo } from '@deno-todo/api-client';
import { ToDo } from '@deno-todo/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function AddTodoForm() {
  const client = useQueryClient();
  const [title, setNewTodoName] = useState('');
  const { mutate, isLoading } = useMutation({
    mutationFn: createTodo,
    onSuccess: (todoItem) => {
      client.setQueryData(['todos'], (old: ToDo[] | undefined) => {
        if (!old) return [todoItem];
        return [...old, todoItem];
      });
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    mutate(title);
    setNewTodoName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(event) => {
          setNewTodoName(event.target.value);
        }}
        value={title}
      />

      <button type="submit">Add</button>
    </form>
  );
}
