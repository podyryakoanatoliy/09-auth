import { User } from "@/types/user";
import { nextServer } from "./api";
import { NoteListResponse } from "@/types/note";
import { FormValues } from "@/types/note";
import { Note } from "@/types/note";

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};
interface CheckSessionResponse {
  success: boolean;
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string
): Promise<NoteListResponse> => {
  const { data } = await nextServer.get<NoteListResponse>("/notes", {
    params: {
      ...(query !== "" && { search: query }),
      page,
      perPage: 12,
      ...(tag && tag !== "all" && { tag }),
    },
  });
  // console.log(data);
  return data;
};

export async function createNote(newNote: FormValues): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
}

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const login = async (userData: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  return data;
};

export const register = async (userData: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<CheckSessionResponse>("/auth/session");
  return data.success;
};
export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", { username });
  return data;
};
