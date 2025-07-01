export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  search?: string;
}