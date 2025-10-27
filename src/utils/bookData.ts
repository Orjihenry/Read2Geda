import { usersIds } from "./userData";

export type BookProgress = {
  bookId: string;
  userId: string;
  progress: number;
  status: "not_started" | "reading" | "completed" | "paused";
  startedAt?: string;
  completedAt?: string;
  rating?: number;
  review?: string;
};

export type BookData = {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  summary: string;
  coverImage: string;
  tags?: string[];
  rating?: number;
  readingProgress?: BookProgress[];
};

export const bookData: BookData[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publishedYear: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
    coverImage:
      "https://m.media-amazon.com/images/I/81O7u0dGaWL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "literature"],
    rating: 4.8,
    readingProgress: [
      {
        bookId: "1",
        userId: usersIds[10],
        progress: 100,
        status: "completed",
        startedAt: "2024-01-01",
        completedAt: "2024-01-15",
        rating: 5,
        review: "A masterpiece of modern literature.",
      },
      {
        bookId: "1",
        userId: usersIds[2],
        progress: 75,
        status: "reading",
        startedAt: "2024-02-01",
      },
      {
        bookId: "1",
        userId: usersIds[4],
        progress: 100,
        status: "completed",
        startedAt: "2023-12-01",
        completedAt: "2024-01-20",
        rating: 5,
      },
    ],
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    summary:
      "A novel that presents a terrifying vision of a totalitarian future.",
    coverImage:
      "https://m.media-amazon.com/images/I/910cf05vZmL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["dystopian", "political"],
    rating: 4.7,
    readingProgress: [
      {
        bookId: "2",
        userId: usersIds[1],
        progress: 80,
        status: "reading",
        startedAt: "2024-02-10",
      },
      {
        bookId: "2",
        userId: usersIds[5],
        progress: 45,
        status: "reading",
        startedAt: "2024-02-05",
      },
      {
        bookId: "2",
        userId: usersIds[7],
        progress: 100,
        status: "completed",
        startedAt: "2024-01-15",
        completedAt: "2024-02-01",
        rating: 4,
      },
    ],
  },
  {
    id: "3",
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publishedYear: 1851,
    summary:
      "The narrative of Captain Ahab's obsessive quest to kill the white whale, Moby Dick.",
    coverImage:
      "https://m.media-amazon.com/images/I/81XS2mY6qfL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "adventure"],
    rating: 4.5,
    readingProgress: [
      {
        bookId: "3",
        userId: usersIds[3],
        progress: 20,
        status: "reading",
        startedAt: "2024-02-08",
      },
      {
        bookId: "3",
        userId: usersIds[6],
        progress: 0,
        status: "not_started",
      },
      {
        bookId: "3",
        userId: usersIds[9],
        progress: 60,
        status: "reading",
        startedAt: "2024-01-25",
      },
    ],
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    summary:
      "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    coverImage:
      "https://m.media-amazon.com/images/I/91fDvMK+aEL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "romance"],
    rating: 4.6,
    readingProgress: [
      {
        bookId: "4",
        userId: usersIds[11],
        progress: 10,
        status: "reading",
        startedAt: "2024-02-15",
      },
      {
        bookId: "4",
        userId: usersIds[4],
        progress: 0,
        status: "not_started",
      },
      {
        bookId: "4",
        userId: usersIds[8],
        progress: 35,
        status: "reading",
        startedAt: "2024-02-01",
      },
    ],
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925,
    summary:
      "A novel about the American dream and the disillusionment that comes with it.",
    coverImage:
      "https://m.media-amazon.com/images/I/6150zvwveOL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "fiction"],
    rating: 4.4,
    readingProgress: [
      {
        bookId: "5",
        userId: usersIds[1],
        progress: 100,
        status: "completed",
        startedAt: "2023-11-01",
        completedAt: "2024-01-15",
        rating: 5,
      },
      {
        bookId: "5",
        userId: usersIds[6],
        progress: 0,
        status: "not_started",
      },
      {
        bookId: "5",
        userId: usersIds[10],
        progress: 50,
        status: "reading",
        startedAt: "2024-01-20",
      },
    ],
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publishedYear: 1951,
    summary: "A controversial novel about teenage rebellion and alienation.",
    coverImage:
      "https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "coming-of-age"],
    rating: 4.3,
    readingProgress: [
      {
        bookId: "6",
        userId: usersIds[9],
        progress: 65,
        status: "reading",
        startedAt: "2024-02-01",
      },
      {
        bookId: "6",
        userId: usersIds[1],
        progress: 40,
        status: "reading",
        startedAt: "2024-02-05",
      },
      {
        bookId: "6",
        userId: usersIds[2],
        progress: 90,
        status: "reading",
        startedAt: "2024-01-20",
      },
    ],
  },
  {
    id: "7",
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    publishedYear: 1932,
    summary:
      "A dystopian novel about a future society where people are conditioned for happiness.",
    coverImage:
      "https://m.media-amazon.com/images/I/71oiPZrfnSL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["dystopian", "science fiction"],
    rating: 4.6,
    readingProgress: [
      {
        bookId: "7",
        userId: usersIds[1],
        progress: 100,
        status: "completed",
        startedAt: "2024-01-10",
        completedAt: "2024-01-25",
        rating: 5,
      },
      {
        bookId: "7",
        userId: usersIds[3],
        progress: 30,
        status: "reading",
        startedAt: "2024-02-01",
      },
      {
        bookId: "7",
        userId: usersIds[5],
        progress: 75,
        status: "reading",
        startedAt: "2024-01-28",
      },
    ],
  },
];
