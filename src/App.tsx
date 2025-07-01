import React from 'react';
import { CheckSquare } from 'lucide-react';
import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { TodoFilters } from './components/TodoFilters';
import { TodoItem } from './components/TodoItem';
import { Auth } from './components/Auth';
import { useTodos } from './hooks/useTodos';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading: authLoading } = useAuth();
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    categories,
    stats,
    loading: todosLoading,
  } = useTodos();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-purple-600 p-4 rounded-2xl w-fit mx-auto mb-4 animate-pulse">
            <CheckSquare className="w-12 h-12 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header stats={stats} />
        
        <TodoForm onSubmit={addTodo} categories={categories} />
        
        <TodoFilters 
          filter={filter}
          onFilterChange={setFilter}
          categories={categories}
          stats={stats}
        />

        {todosLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CheckSquare className="w-16 h-16 mx-auto opacity-50 animate-pulse" />
            </div>
            <p className="text-gray-500">Loading your tasks...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CheckSquare className="w-16 h-16 mx-auto opacity-50" />
                </div>
                <h3 className="text-xl font-medium text-gray-500 mb-2">
                  {filter.status === 'all' ? 'No tasks yet' : `No ${filter.status} tasks`}
                </h3>
                <p className="text-gray-400">
                  {filter.status === 'all' 
                    ? 'Create your first task to get started!'
                    : 'Try adjusting your filters to see more tasks.'
                  }
                </p>
              </div>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        )}

        {todos.length > 0 && (
          <div className="text-center mt-8 text-sm text-gray-500">
            Showing {todos.length} of {stats.total} tasks
          </div>
        )}
      </div>
    </div>
  );
}

export default App;