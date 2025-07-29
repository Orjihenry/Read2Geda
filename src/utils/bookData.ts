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
    rating: 4.8
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    summary: "A novel that presents a terrifying vision of a totalitarian future.",
    coverImage: "https://example.com/1984.jpg",
    tags: ["dystopian", "political"],
    rating: 4.7
  },
  {
    id: "3",
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publishedYear: 1851,
    summary: "The narrative of Captain Ahab's obsessive quest to kill the white whale, Moby Dick.",
    coverImage: "https://example.com/moby-dick.jpg",
    tags: ["classic", "adventure"],
    rating: 4.5
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    summary: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    coverImage: "https://example.com/pride-and-prejudice.jpg",
    tags: ["classic", "romance"],
    rating: 4.6
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925,
    summary: "A novel about the American dream and the disillusionment that comes with it.",
    coverImage: "https://example.com/the-great-gatsby.jpg",
    tags: ["classic", "fiction"],
    rating: 4.4
  }
];