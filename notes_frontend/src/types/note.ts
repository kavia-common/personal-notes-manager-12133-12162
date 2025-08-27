export type NoteId = string;

export interface Note {
  id: NoteId;
  title: string;
  content: string;
  tags: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface NoteInput {
  title: string;
  content: string;
  tags: string[];
}
