'use client';

import React, { useState } from 'react';
import { Todo, FilterStatus } from '../types/todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import FilterTabs from './FilterTabs';
import { CheckSquare, Trash2 } from 'lucide-react';

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('next-todo-app-data', []);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 sm:p-8 space-y-6">
      <header className="space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Todo App
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Stay organized, focused, and productive.
              </p>
            </div>
          </div>
          {counts.completed > 0 && (
            <button
              onClick={handleClearCompleted}
              className="text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 flex items-center gap-1 py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Clear all completed items"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear completed</span>
            </button>
          )}
        </div>
      </header>

      <TodoInput onAddTodo={handleAddTodo} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        <FilterTabs
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center sm:text-right">
          {counts.active} {counts.active === 1 ? 'task' : 'tasks'} remaining
        </div>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        filter={filter}
      />
    </div>
  );
}
