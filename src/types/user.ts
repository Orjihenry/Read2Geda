export type UserBook = {
    bookId: string;
    status: "reading" | "completed" | "to-read";
    progress?: number;
    rating?: number;
    addedAt: string;
    startedAt?: string;
    completedAt?: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    pwd: string;
    avatar?: string;
    bio?: string;
    joinedAt: string;
    isActive: boolean;
    books?: UserBook[];
}
