import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Physiology High-Yield | MBBS Exam Revision" },
      { name: "description", content: "Study high-yield physiology facts, flashcards, MCQs, animated diagrams, and normal values for MBBS exams." },
      { property: "og:title", content: "Physiology High-Yield | MBBS Exam Revision" },
      { property: "og:description", content: "Study high-yield physiology facts, flashcards, MCQs, animated diagrams, and normal values for MBBS exams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
