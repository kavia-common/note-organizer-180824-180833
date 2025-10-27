"use client";

import React, { useEffect, useMemo, useState } from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

type Props = {
  note: Note | null;
  onChange: (note: Note) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * NoteEditor provides a simple form to view and edit a note title and content.
 */
export default function NoteEditor({ note, onChange, onCreate, onDelete }: Props) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id]);

  const isNewNote = useMemo(() => !note, [note]);

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-base font-semibold text-slate-900">
            {isNewNote ? "New Note" : "Edit Note"}
          </h2>
          {!isNewNote && (
            <span className="text-[11px] text-slate-500">
              Updated {note ? new Date(note.updatedAt).toLocaleString() : ""}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md bg-white text-blue-700 text-xs sm:text-sm px-3 py-2 border border-blue-200 hover:bg-blue-50 transition shadow-sm"
            onClick={onCreate}
          >
            + New
          </button>
          {!isNewNote && note && (
            <button
              className="rounded-md bg-red-500 text-white text-xs sm:text-sm px-3 py-2 hover:bg-red-600 transition shadow-sm"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="grid gap-3">
          <input
            className="w-full rounded-md border border-blue-100 bg-white/80 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              const v = e.target.value;
              setTitle(v);
              if (note) {
                onChange({ ...note, title: v, updatedAt: Date.now() });
              }
            }}
            aria-label="Note title"
          />
          <textarea
            className="min-h-[46vh] md:min-h-[58vh] w-full rounded-md border border-blue-100 bg-white/80 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => {
              const v = e.target.value;
              setContent(v);
              if (note) {
                onChange({ ...note, content: v, updatedAt: Date.now() });
              }
            }}
            aria-label="Note content"
          />
        </div>
      </div>
    </section>
  );
}
