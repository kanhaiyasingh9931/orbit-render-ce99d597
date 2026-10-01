'use client';

import React from 'react';

export type FilterStatus = 'all' | 'active' | 'completed';

interface FilterTabsProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts?: {
    all: number;
    active: number;
    completed: number;
  };
}

const TABS: { id: FilterStatus; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

export default function FilterTabs({
  currentFilter,
  onFilterChange,
  counts,
}: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter todos"
      className="flex items-center justify-center p-1 space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl"
    >
      {TABS.map((tab) => {
        const isActive = currentFilter === tab.id;
        const count = counts ? counts[tab.id] : undefined;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(tab.id)}
            className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isActive
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <span>{tab.label}</span>
            {count !== undefined && (
              <span
                className={`px-1.5 py-0.5 text-xs rounded-full font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}