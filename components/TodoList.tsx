'use client';

import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { CheckCircle2, ListTodo } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter: string;
}

export function TodoList({ todos, onToggle, onDelete, filter }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-3">
          {filter === 'completed' ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <ListTodo className="w-6 h-6" />
          )}
        </div>
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {filter === 'completed'
            ? 'No completed tasks yet'
            : filter === 'active'
            ? 'No active tasks'
            : 'No tasks found'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {filter === 'all'
            ? 'Add a task above to get started!'
            : filter === 'active'
            ? 'You have completed all your tasks!'
            : 'Complete some tasks to see them listed here.'}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5" role="list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
