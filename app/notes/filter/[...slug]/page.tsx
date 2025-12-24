import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
  // searchParams: { query?: string; id?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Filter: ${slug[0]}`,
    description: "Filtering by selected tag of the user",
    openGraph: {
      title: `Filter: ${slug[0]}`,
      description: `Filtering by ${slug[0]}`,
      url: `https://08-zustand-omega-mauve.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Filter: ${slug[0]}`,
        },
      ],
    },
  };
}

const Notes = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === "all" ? "" : slug[0];
  // console.log(slug);

  const queryKey = tag
    ? ["notes", { query: "", page: 1, tag }]
    : ["notes", { query: "", page: 1 }];
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
