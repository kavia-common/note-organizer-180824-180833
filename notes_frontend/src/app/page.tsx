"use client";

import React, { useCallback, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import NotesList, { NoteListItem } from "@/components/NotesList";
import NoteEditor, { Note } from "@/components/NoteEditor";

function seedNotes(): Note[] {
  const now = Date.now();
  return [
    {
      id: "1",
      title: "Welcome to Ocean Notes",
      content:
        "This is your first note. Edit the title and content on the right. Create new notes with the + New button.",
      updatedAt: now - 1000 * 60 * 60,
    },
    {
      id: "2",
      title: "Tips",
      content:
        "- Left panel lists your notes.\n- Click a note to select and edit.\n- Use Delete to remove a note.\n- All data is in-memory right now.",
      updatedAt: now - 1000 * 60 * 20,
    },
    {
      id: "3",
      title: "Next steps",
      content:
        "We will integrate a backend API soon. The lib/notesClient.ts file has TODO stubs for REST.",
      updatedAt: now - 1000 * 60 * 5,
    },
  ];
}

export default function Home() {
  // In-memory notes state
  const [notes, setNotes] = useState<Note[]>(seedNotes());
  const [selectedId, setSelectedId] = useState<string | null>(notes[0]?.id ?? null);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const listItems: NoteListItem[] = useMemo(
    () =>
      notes
        .slice()
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .map((n) => ({ id: n.id, title: n.title, updatedAt: n.updatedAt })),
    [notes]
  );

  const handleSelect = useCallback((id: string) => setSelectedId(id), []);

  const handleCreate = useCallback(() => {
    const now = Date.now();
    const newNote: Note = {
      id: crypto.randomUUID ? crypto.randomUUID() : `tmp-${now}`,
      title: "Untitled",
      content: "",
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId((prev) => {
      if (prev === id) {
        // If current note deleted, select next available
        const remaining = notes.filter((n) => n.id !== id);
        return remaining[0]?.id ?? null;
      }
      return prev;
    });
  }, [notes]);

  const handleChange = useCallback(
    (updated: Note) => {
      setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    },
    []
  );

  return (
    <main className="min-h-screen bg-[var(--ocean-bg)]">
      <Navbar />
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 md:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Left - Notes List */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="rounded-xl border border-blue-100 bg-white/90 shadow-sm overflow-hidden">
              <div className="px-3 py-2 border-b border-blue-100 bg-gradient-to-r from-blue-50/70 to-white">
                <h3 className="text-sm font-semibold text-slate-900">Notes</h3>
              </div>
              <div className="h-[26rem] md:h-[72vh]">
                <NotesList
                  notes={listItems}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>

          {/* Right - Editor */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="rounded-xl border border-blue-100 bg-white/90 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-blue-50/70 to-amber-50/50 border-b border-blue-100">
                <div className="px-4 py-2">
                  <p className="text-xs text-slate-600">
                    Ocean Professional • Modern • Clean
                  </p>
                </div>
              </div>
              <div className="h-[32rem] md:h-[72vh]">
                <NoteEditor
                  note={selectedNote}
                  onChange={handleChange}
                  onCreate={handleCreate}
                  onDelete={handleDelete}
                />
              </div>
            </div>

            {/* Footer / future integration note */}
            <div className="mt-3 text-[11px] text-slate-500">
              TODO: Replace in-memory state with REST via src/lib/notesClient.ts
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
