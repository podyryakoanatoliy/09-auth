import css from "./NotFound.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found page",
  description: "There are no such pages. Switch to another route",
  openGraph: {
    title: "Not found",
    description: "Not found this page",
    url: "https://08-zustand-omega-mauve.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
