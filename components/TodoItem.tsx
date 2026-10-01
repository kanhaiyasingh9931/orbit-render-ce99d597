'use client';

import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`group flex items-center justify-between gap-3 p-4 rounded-xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 shadow-sm hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
          className={`relative flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
            todo.completed
              ? 'bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-transparent'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 stroke-[2.5]" />}
        </button>

        <span
          onClick={() => onToggle(todo.id)}
          className={`cursor-pointer select-none text-base break-words transition-all duration-150 leading-snug ${
            todo.completed
              ? 'line-through text-slate-400 dark:text-slate-500'
              : 'text-slate-700 dark:text-slate-200'
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete task: ${todo.text}`}
        className="opacity-70 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 dark:focus:ring-offset-slate-900 flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </li>
  );
};