import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TodoList } from '@deno-todo/todo-list';
import { AddTodoForm } from '@deno-todo/add-todo-form';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddTodoForm />
      <TodoList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
