"use client";

import React from "react";

export type NoteListItem = {
  id: string;
  title: string;
  updatedAt: number;
};

type Props = {
  notes: NoteListItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * NotesList displays a scrollable list of notes with selection and delete controls.
 */
export default function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
}: Props) {
  return (
    <aside
      className="h-full overflow-y-auto"
      aria-label="Notes list"
      role="navigation"
    >
      <div className="px-3 py-2">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full rounded-md border border-blue-100 bg-white/80 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300"
            onChange={() => {
              // Placeholder for future search; currently no-op
            }}
            aria-label="Search notes"
          />
        </div>
        <ul className="space-y-1" role="list">
          {notes.length === 0 && (
            <li className="text-sm text-slate-500 px-1 py-6 text-center">
              No notes yet. Create one to get started.
            </li>
          )}
          {notes.map((n) => {
            const isActive = n.id === selectedId;
            return (
              <li key={n.id}>
                <button
                  className={[
                    "group w-full flex items-center justify-between rounded-md border px-3 py-2 text-left transition-all",
                    isActive
                      ? "bg-gradient-to-br from-blue-50 to-blue-100/40 border-blue-200 shadow-sm"
                      : "bg-white hover:bg-blue-50/60 border-blue-100",
                  ].join(" ")}
                  onClick={() => onSelect(n.id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="min-w-0">
                    <div
                      className={[
                        "truncate text-sm font-medium",
                        isActive ? "text-blue-800" : "text-slate-800",
                      ].join(" ")}
                      title={n.title}
                    >
                      {n.title || "Untitled"}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {new Date(n.updatedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      className="opacity-60 hover:opacity-100 text-red-500 hover:text-red-600 text-xs px-2 py-1 rounded-md border border-red-100 bg-red-50/50 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(n.id);
                      }}
                      aria-label={`Delete ${n.title || "Untitled note"}`}
                    >
                      Delete
                    </button>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
