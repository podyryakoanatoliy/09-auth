import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
// import { useRouter } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a new note",
  description: "Create a new note as you need it.",
  openGraph: {
    title: "Create a New Note",
    description:
      "Easily create and save a new note to keep your thoughts organized.",
    url: "https://08-zustand-omega-mauve.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Creating a new note",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
