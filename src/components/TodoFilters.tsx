import React from 'react';
import { Search, Filter, CheckCircle, Circle, Clock, AlertTriangle } from 'lucide-react';
import { TodoFilter } from '../types/todo';

interface TodoFiltersProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  categories: string[];
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({ 
  filter, 
  onFilterChange, 
  categories, 
  stats 
}) => {
  const statusFilters = [
    { key: 'all', label: 'All Tasks', icon: Circle, count: stats.total },
    { key: 'active', label: 'Active', icon: Clock, count: stats.active },
    { key: 'completed', label: 'Completed', icon: CheckCircle, count: stats.completed },
  ] as const;

  const priorityFilters = [
    { key: 'high', label: 'High Priority', color: 'text-red-600' },
    { key: 'medium', label: 'Medium Priority', color: 'text-amber-600' },
    { key: 'low', label: 'Low Priority', color: 'text-emerald-600' },
  ] as const;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.search || ''}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Status Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Status
        </h3>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => onFilterChange({ ...filter, status: key })}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter.status === key
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter.status === key 
                  ? 'bg-purple-700 text-purple-100' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Priority & Category Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Priority
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => onFilterChange({ ...filter, priority: undefined })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !filter.priority ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50'
              }`}
            >
              All Priorities
            </button>
            {priorityFilters.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => onFilterChange({ ...filter, priority: key })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter.priority === key 
                    ? 'bg-purple-100 text-purple-700' 
                    : `hover:bg-gray-50 ${color}`
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
          <div className="space-y-1">
            <button
              onClick={() => onFilterChange({ ...filter, category: undefined })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !filter.category ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onFilterChange({ ...filter, category })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter.category === category 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {stats.overdue > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {stats.overdue} task{stats.overdue !== 1 ? 's' : ''} overdue
            </span>
          </div>
        </div>
      )}
    </div>
  );
};