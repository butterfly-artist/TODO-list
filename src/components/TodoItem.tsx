import React, { useState } from 'react';
import { Check, X, Edit3, Calendar, AlertCircle, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  
  const priorityColors = {
    low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    high: 'bg-red-100 text-red-700 border-red-200',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`group bg-white rounded-xl border transition-all duration-200 hover:shadow-md ${
      todo.completed ? 'border-gray-200 opacity-75' : 'border-gray-100'
    } ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'border-gray-300 hover:border-purple-500'
            }`}
          >
            {todo.completed && <Check className="w-3 h-3" />}
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full font-medium bg-transparent border-b border-purple-200 focus:border-purple-500 outline-none pb-1"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add description..."
                  className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-2 resize-none h-16"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className={`font-medium transition-all duration-200 ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`text-sm mt-1 transition-all duration-200 ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                  }`}>
                    {todo.description}
                  </p>
                )}
              </>
            )}

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[todo.priority]}`}>
                <AlertCircle className="w-3 h-3 inline mr-1" />
                {todo.priority}
              </span>
              
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                {todo.category}
              </span>

              {todo.dueDate && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${
                  isOverdue 
                    ? 'bg-red-100 text-red-700 border-red-200' 
                    : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}>
                  <Calendar className="w-3 h-3" />
                  {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>

          {!isEditing && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};