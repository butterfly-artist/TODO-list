import { useState, useEffect } from 'react';
import { Todo, TodoFilter } from '../types/todo';
import { todosAPI } from '../lib/api';
import { useAuth } from './useAuth';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>({ status: 'all' });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load todos from MongoDB
  const loadTodos = async () => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    try {
      const data = await todosAPI.getAll();
      
      const formattedTodos: Todo[] = data.map((todo: any) => ({
        id: todo._id,
        title: todo.title,
        description: todo.description || undefined,
        completed: todo.completed,
        priority: todo.priority,
        category: todo.category,
        dueDate: todo.dueDate || undefined,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      }));

      setTodos(formattedTodos);
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
      const data = await todosAPI.create({
        title: todoData.title,
        description: todoData.description,
        completed: todoData.completed,
        priority: todoData.priority,
        category: todoData.category,
        dueDate: todoData.dueDate,
      });

      const newTodo: Todo = {
        id: data._id,
        title: data.title,
        description: data.description || undefined,
        completed: data.completed,
        priority: data.priority,
        category: data.category,
        dueDate: data.dueDate || undefined,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    if (!user) return;

    try {
      const data = await todosAPI.update(id, {
        title: updates.title,
        description: updates.description,
        completed: updates.completed,
        priority: updates.priority,
        category: updates.category,
        dueDate: updates.dueDate,
      });

      const updatedTodo: Todo = {
        id: data._id,
        title: data.title,
        description: data.description || undefined,
        completed: data.completed,
        priority: data.priority,
        category: data.category,
        dueDate: data.dueDate || undefined,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      setTodos(prev =>
        prev.map(todo => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;

    try {
      await todosAPI.delete(id);
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
    if (filter.search && !todo.title.toLowerCase().includes(filter.search.toLowerCase()) && 
        !todo.description?.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

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
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    categories,
    stats,
    loading,
  };
};