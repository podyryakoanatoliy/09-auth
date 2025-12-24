"use client";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useNoteStore } from "@/lib/store/noteStore";

import type { FormValues } from "@/lib/api";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import type { FormikHelpers } from "formik";

interface OrderFormValues {
  title: string;
  content: string;
  tag: string;
}

// const initialValues: OrderFormValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// const schemaValidationNote = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "The title should not exceed 50 characters.")
//     .required("Title is required"),
//   content: Yup.string().max(
//     500,
//     "The content should not exceed 500 characters."
//   ),
//   tag: Yup.string()
//     .required()
//     .oneOf(
//       ["Todo", "Work", "Personal", "Meeting", "Shopping"],
//       "Tag must be one of: Todo, Work, Personal, Meeting, Shopping"
//     ),
// });

export interface Tag {
  id: number;
  tag: string;
}
const categories: Tag[] = [
  { id: 1, tag: "Todo" },
  { id: 2, tag: "Work" },
  { id: 3, tag: "Personal" },
  { id: 4, tag: "Meeting" },
  { id: 5, tag: "Shopping" },
];

export default function NoteForm() {
  const formId = useId();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const router = useRouter();
  const handleCancel = () => router.push("/notes/filter/all");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: OrderFormValues) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      handleCancel();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as FormValues;
    mutate(values);
    console.log(values);

    // mutate(values);
    // actions.resetForm();
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  console.log(draft);
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${formId}-title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`${formId}-title`}
          className={css.input}
          value={draft?.title}
          onChange={handleChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${formId}-content`}>Content</label>
        <textarea
          name="content"
          rows={8}
          id={`${formId}-content`}
          className={css.textarea}
          value={draft?.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${formId}-tag`}>Category</label>
        <select
          name="tag"
          id={`${formId}-tag`}
          className={css.select}
          value={draft?.tag}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.tag}>
              {category.tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
