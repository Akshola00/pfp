/**
 * Articles. The section hides itself entirely when this array is empty,
 * so you can ship without writing and it will appear the moment you do.
 */

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  /** ISO date — formatted for display at render time. */
  date: string;
  readTime: string;
  platform: "Medium" | "Dev.to" | "Personal";
  href: string;
  tags: string[];
};

export const articles: Article[] = [
  {
    id: "rust-in-action",
    title: "Learning Rust Through Rust in Action",
    excerpt:
      "Working through Rust in Action as a developer coming from TypeScript — what clicked, what didn't, and the mental models that made ownership and borrowing finally make sense.",
    date: "2026-01-15",
    readTime: "4 min read",
    platform: "Medium",
    href: "https://medium.com/@akshola00/learning-rust-through-rust-in-action-b71afa8376cc",
    tags: ["Rust", "Learning", "Systems"],
  },
];
