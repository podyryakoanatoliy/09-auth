import { NoteListResponse, Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

interface CheckSessionResponse {
  success: boolean;
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string
): Promise<NoteListResponse> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<NoteListResponse>("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
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

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export async function checkSession(): Promise<
  AxiosResponse<CheckSessionResponse>
> {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionResponse>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
