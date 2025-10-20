export type BookProgress = {
  bookId: string;
  userId: string;
  progress: number;
  status: 'not_started' | 'reading' | 'completed' | 'paused';
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
    coverImage: "https://m.media-amazon.com/images/I/81O7u0dGaWL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "literature"],
    rating: 4.8,
    readingProgress: [
      {
        bookId: "1",
        userId: "user1",
        progress: 100,
        status: "completed",
        startedAt: "2023-01-01",
        completedAt: "2023-01-10",
        rating: 5,
        review: "A masterpiece of modern literature."
      }
    ]
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    summary: "A novel that presents a terrifying vision of a totalitarian future.",
    coverImage: "https://m.media-amazon.com/images/I/910cf05vZmL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["dystopian", "political"],
    rating: 4.7,
    readingProgress: [
      {
        bookId: "2",
        userId: "user1",
        progress: 80,
        status: "reading",
        startedAt: "2023-01-11",
        completedAt: undefined,
        rating: undefined,
        review: undefined
      }
    ]
  },
  {
    id: "3",
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publishedYear: 1851,
    summary: "The narrative of Captain Ahab's obsessive quest to kill the white whale, Moby Dick.",
    coverImage: "https://m.media-amazon.com/images/I/81XS2mY6qfL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "adventure"],
    rating: 4.5,
    readingProgress: [
      {
        bookId: "3",
        userId: "user1",
        progress: 0,
        status: "not_started"
      }
    ]
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    summary: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    coverImage: "https://m.media-amazon.com/images/I/91fDvMK+aEL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "romance"],
    rating: 4.6,
    readingProgress: [
      {
        bookId: "4",
        userId: "user1",
        progress: 10,
        status: "reading",
        startedAt: "2023-01-15",
        completedAt: undefined,
        rating: undefined,
        review: undefined
      }
    ]
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925,
    summary: "A novel about the American dream and the disillusionment that comes with it.",
    coverImage: "https://m.media-amazon.com/images/I/6150zvwveOL._AC_UL640_FMwebp_QL65_.jpg",
    tags: ["classic", "fiction"],
    rating: 4.4,
    readingProgress: [
      {
        bookId: "5",
        userId: "user1",
        progress: 0,
        status: "not_started"
      }
    ]
  }
];