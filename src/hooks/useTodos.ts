import { useState, useEffect } from 'react';
import { Todo, TodoFilter } from '../types/todo';
import { useAuth } from './useAuth';

const API_URL = import.meta.env.VITE_API_URL;

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>({ status: 'all' });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load todos from backend API
  const loadTodos = async () => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/todos?user_id=${user.id}`);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load todos when user changes
  useEffect(() => {
    loadTodos();
  }, [user]);

  const addTodo = async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todoData, user_id: user.id }),
      });
      const newTodo = await res.json();
      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, user_id: user.id }),
      });
      const updated = await res.json();
      setTodos(prev => prev.map(todo => (todo.id === id ? updated : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;
    try {
      await fetch(`${API_URL}/todos/${id}?user_id=${user.id}`, {
        method: 'DELETE',
      });
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    await updateTodo(id, { completed: !todo.completed });
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter.status === 'active' && todo.completed) return false;
    if (filter.status === 'completed' && !todo.completed) return false;
    if (filter.priority && todo.priority !== filter.priority) return false;
    if (filter.category && todo.category !== filter.category) return false;
    if (filter.search) {
      const search = filter.search.toLowerCase();
      // Show todos that match search in title or description
      if (!todo.title.toLowerCase().includes(search) &&
          !(todo.description && todo.description.toLowerCase().includes(search))) {
        return false;
      }
    }
    return true;
  });

  // Add a function to search and update todos from backend
  const searchTodos = async (search: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/todos/search?user_id=${user.id}&q=${encodeURIComponent(search)}`);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error searching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = Array.from(new Set(todos.map(todo => todo.category).filter(Boolean)));

  // Statistics
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => 
      !t.completed && 
      t.dueDate && 
      new Date(t.dueDate) < new Date()
    ).length,
  };

  return {
    // Return both filteredTodos and raw todos
    todos: filter.search ? todos : filteredTodos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    categories,
    stats,
    loading,
    searchTodos,
  };
};