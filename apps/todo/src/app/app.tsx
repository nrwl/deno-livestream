import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
