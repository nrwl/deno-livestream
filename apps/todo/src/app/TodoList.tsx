import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, getTodos, toggleTodo } from '@deno-todo/api-client';
import { Todo } from '@deno-todo/generated/dotnet-api-types';

export default function TodoList() {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    refetchOnWindowFocus: false,
  });
  return (
    <ul>
      {data?.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

function TodoItem({ completed, title, id }: Todo) {
  const client = useQueryClient();
  const { mutate: deleteTodoItem } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deleteItem) => {
      client.setQueryData(['todos'], (old: Todo[] | undefined) =>
        old?.filter((item) => item.id !== deleteItem.id)
      );
    },
  });
  const { mutate: toggle } = useMutation({
    mutationFn: toggleTodo,
    onSuccess: (newItem) => {
      client.setQueryData(['todos'], (old: Todo[] | undefined) => {
        if (!old) return [newItem];
        return old.map((item) => {
          if (item.id === newItem.id) {
            return newItem;
          }
          return item;
        });
      });
    },
  });

  return (
    <li>
      <input
        type="checkbox"
        defaultChecked={completed}
        onClick={() => toggle(id)}
        id={`checkbox-${id}`}
      />
      <label htmlFor={`checkbox-${id}`}>{title}</label>
      <button
        onClick={() => {
          deleteTodoItem(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
