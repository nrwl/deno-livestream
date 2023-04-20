import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, getTodos, toggleTodo } from '@deno-todo/api-client';
import { ToDo } from '@deno-todo/models';

export function TodoList() {
  const { data, status } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: 10_000,
  });
  return status === 'loading' ? (
    <p>loading...</p>
  ) : status === 'error' ? (
    <p> you messed up</p>
  ) : (
    <ul>
      {data?.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

function TodoItem({ completed, title, id }: ToDo) {
  const client = useQueryClient();
  const { mutate: deleteTodoItem } = useMutation({
    mutationFn: deleteTodo,
    onSettled: () => {
      client.invalidateQueries(['todos']);
    },
  });
  const { mutate: toggle } = useMutation({
    mutationFn: toggleTodo,

    onSuccess: (newItem) => {
      client.setQueryData(['todos'], (old: ToDo[] | undefined) => {
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
        checked={!!completed}
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
