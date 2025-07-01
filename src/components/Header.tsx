import React from 'react';
import { CheckSquare, TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  const { user, signOut } = useAuth();
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-3 rounded-2xl">
            <CheckSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            TodoFlow
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Welcome back,</p>
            <p className="font-medium text-gray-900">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 text-lg">
        Organize your life, one task at a time
      </p>

      {stats.total > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Progress Overview</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
              <div className="text-sm text-gray-500">Done</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};