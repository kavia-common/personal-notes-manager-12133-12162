"use client";

import { useEffect, useMemo, useState } from "react";
import type { Note, NoteId, NoteInput } from "@/types/note";
import { createNote, deleteNote, listNotes, updateNote } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

type Filter = {
  query: string;
  tag: string;
};

function matchesFilter(n: Note, f: Filter): boolean {
  const q = f.query.trim().toLowerCase();
  const t = f.tag.trim().toLowerCase();

  const text = (n.title + " " + n.content).toLowerCase();
  const hasQuery = q ? text.includes(q) : true;
  const hasTag = t ? n.tags.map((x) => x.toLowerCase()).includes(t) : true;

  return hasQuery && hasTag;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export default function NotesPage() {
  const user = getCurrentUser();

  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<NoteId | null>(null);

  const [filter, setFilter] = useState<Filter>({ query: "", tag: "" });

  const active = useMemo(
    () => notes.find((n) => n.id === activeId) ?? null,
    [notes, activeId]
  );

  // load notes on mount
  useEffect(() => {
    const all = listNotes();
    setNotes(all);
    if (all.length > 0) {
      setActiveId(all[0].id);
    }
  }, []);

  const filtered = useMemo(
    () => notes.filter((n) => matchesFilter(n, filter)),
    [notes, filter]
  );

  const allTags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const handleCreate = useMemo(
    () => () => {
      const base: NoteInput = {
        title: "New note",
        content: "",
        tags: [],
      };
      const n = createNote(base);
      const next = listNotes();
      setNotes(next);
      setActiveId(n.id);
    },
    []
  );

  const handleDelete = useMemo(
    () => (id: NoteId) => {
      deleteNote(id);
      const next = listNotes();
      setNotes(next);
      setActiveId(next[0]?.id ?? null);
    },
    []
  );

  const handleUpdate = useMemo(
    () => (id: NoteId, patch: Partial<NoteInput>) => {
      const updated = updateNote(id, patch);
      const next = listNotes();
      setNotes(next);
      if (updated) setActiveId(updated.id);
    },
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6">
      <aside className="card p-4 h-fit sticky top-[84px] self-start">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--color-secondary)]">My Notes</h2>
          <button className="btn btn-primary" onClick={handleCreate}>New</button>
        </div>

        <div className="mt-4">
          <input
            className="input"
            placeholder="Search notes..."
            value={filter.query}
            onChange={(e) => setFilter((f) => ({ ...f, query: e.target.value }))}
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm mb-1 text-gray-600">Filter by tag</label>
          <div className="flex gap-2 flex-wrap">
            <button
              className={`badge ${filter.tag === "" ? "ring-2 ring-[var(--color-primary)]" : ""}`}
              onClick={() => setFilter((f) => ({ ...f, tag: "" }))}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                className={`badge ${filter.tag === t ? "ring-2 ring-[var(--color-primary)]" : ""}`}
                onClick={() => setFilter((f) => ({ ...f, tag: t }))}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-4 divide-y divide-[var(--color-border)]">
          {filtered.map((n) => (
            <li key={n.id}>
              <button
                className={`w-full text-left py-3 px-2 rounded-md hover:bg-[var(--color-subtle)] ${activeId === n.id ? "bg-[var(--color-subtle)]" : ""}`}
                onClick={() => setActiveId(n.id)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{n.title || "Untitled"}</div>
                    <div className="text-xs text-gray-500 truncate">{formatDate(n.updatedAt)}</div>
                  </div>
                  <div className="shrink-0 flex gap-1">
                    {n.tags.slice(0, 2).map((t) => (
                      <span key={t} className="badge">#{t}</span>
                    ))}
                    {n.tags.length > 2 && <span className="badge">+{n.tags.length - 2}</span>}
                  </div>
                </div>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="py-6 text-sm text-gray-500 text-center">No notes found</li>
          )}
        </ul>
      </aside>

      <section className="min-w-0">
        {!user && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-[var(--color-secondary)]">You are not signed in</h3>
            <p className="text-gray-600 mt-1 text-sm">
              The demo app will still work locally, but for a real experience, please sign in.
            </p>
            <div className="mt-4">
              <Link href="/auth" className="btn btn-primary">Go to Sign In</Link>
            </div>
          </div>
        )}
        {active ? (
          <EditorPanel
            note={active}
            onDelete={() => handleDelete(active.id)}
            onChangeTitle={(title) => handleUpdate(active.id, { title })}
            onChangeContent={(content) => handleUpdate(active.id, { content })}
            onChangeTags={(tags) => handleUpdate(active.id, { tags })}
          />
        ) : (
          <div className="card p-8 text-center text-gray-600">
            <div className="text-lg">No note selected</div>
            <div className="mt-3">
              <button className="btn btn-primary" onClick={handleCreate}>Create your first note</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function EditorPanel({
  note,
  onDelete,
  onChangeTitle,
  onChangeContent,
  onChangeTags,
}: {
  note: Note;
  onDelete: () => void;
  onChangeTitle: (title: string) => void;
  onChangeContent: (content: string) => void;
  onChangeTags: (tags: string[]) => void;
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tagsInput, setTagsInput] = useState(note.tags.join(", "));

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setTagsInput(note.tags.join(", "));
  }, [note.id, note.title, note.content, note.tags]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (title !== note.title) onChangeTitle(title);
    }, 250);
    return () => clearTimeout(t);
  }, [title, note.title, onChangeTitle]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (content !== note.content) onChangeContent(content);
    }, 250);
    return () => clearTimeout(t);
  }, [content, note.content, onChangeContent]);

  useEffect(() => {
    const t = setTimeout(() => {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (tags.join(",") !== note.tags.join(",")) onChangeTags(tags);
    }, 300);
    return () => clearTimeout(t);
  }, [tagsInput, note.tags, onChangeTags]);

  return (
    <div className="card p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <input
          className="input text-xl font-semibold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <div className="flex-1" />
        <button className="btn btn-secondary" onClick={() => setShowDelete(true)}>Delete</button>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">Tags</label>
        <input
          className="input"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="comma,separated,tags"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">Content</label>
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing your note..."
        />
      </div>

      {showDelete && (
        <ConfirmModal
          title="Delete note"
          message="Are you sure you want to delete this note? This action cannot be undone."
          confirmText="Delete"
          onConfirm={() => {
            onDelete();
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative z-10 w-[92vw] max-w-md card p-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          <h4 className="text-lg font-semibold text-[var(--color-secondary)]">{title}</h4>
        </div>
        <p className="mt-3 text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
