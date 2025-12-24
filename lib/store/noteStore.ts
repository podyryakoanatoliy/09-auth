import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Note {
  title: string;
  content: string;
  tag: string;
}

const initialDraft: Note = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: Note;
  setDraft: (note: Note) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
