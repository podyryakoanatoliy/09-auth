export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
};

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
}
export type FormValues = {
  title: string;
  content: string;
  tag: string;
};
