import type { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";

const userIds = () => {
  const ids: string[] = [];
  for (let i = 0; i < 15; i++) {
    ids.push(uuidv4());
  }
  return ids;
};

export const usersIds = userIds();

export const UsersData: User[] = [
  {
    id: usersIds[0],
    name: "Alice Johnson",
    email: "alice@example.com",
    pwd: "password",
    joinedAt: "2023-06-15",
    isActive: true,
    bio: "Book enthusiast and writer",
  },
  {
    id: usersIds[1],
    name: "Bob Smith",
    email: "bob@example.com",
    pwd: "password",
    joinedAt: "2023-07-20",
    isActive: true,
    bio: "Sci-fi lover",
  },
  {
    id: usersIds[2],
    name: "Carol Davis",
    email: "carol@example.com",
    pwd: "password",
    joinedAt: "2023-08-10",
    isActive: true,
    bio: "Mystery novel enthusiast",
  },
  {
    id: usersIds[3],
    name: "David Wilson",
    email: "david@example.com",
    pwd: "password",
    joinedAt: "2023-09-05",
    isActive: true,
    bio: "Classic literature reader",
  },
  {
    id: usersIds[4],
    name: "Emma Brown",
    email: "emma@example.com",
    pwd: "password",
    joinedAt: "2023-09-15",
    isActive: true,
    bio: "Fantasy fiction fan",
  },
  {
    id: usersIds[5],
    name: "Frank Lee",
    email: "frank@example.com",
    pwd: "password",
    joinedAt: "2023-10-01",
    isActive: true,
    bio: "Historical fiction reader",
  },
  {
    id: usersIds[6],
    name: "Grace Taylor",
    email: "grace@example.com",
    pwd: "password",
    joinedAt: "2023-10-12",
    isActive: true,
    bio: "Book club moderator",
  },
  {
    id: usersIds[7],
    name: "Henry Martinez",
    email: "henry@example.com",
    pwd: "password",
    joinedAt: "2023-10-25",
    isActive: true,
    bio: "Thriller enthusiast",
  },
  {
    id: usersIds[8],
    name: "Isabella Garcia",
    email: "isabella@example.com",
    pwd: "password",
    joinedAt: "2023-11-05",
    isActive: true,
    bio: "Poetry lover",
  },
  {
    id: usersIds[9],
    name: "Jack Anderson",
    email: "jack@example.com",
    pwd: "password",
    joinedAt: "2023-11-15",
    isActive: true,
    bio: "Non-fiction reader",
  },
  {
    id: usersIds[10],
    name: "Kate Williams",
    email: "kate@example.com",
    pwd: "password",
    joinedAt: "2023-11-25",
    isActive: true,
    bio: "Young adult fiction",
  },
  {
    id: usersIds[11],
    name: "Luke Thompson",
    email: "luke@example.com",
    pwd: "password",
    joinedAt: "2023-12-01",
    isActive: true,
    bio: "Horror genre fan",
  },
  {
    id: usersIds[12],
    name: "Maya Rodriguez",
    email: "maya@example.com",
    pwd: "password",
    joinedAt: "2023-12-10",
    isActive: true,
    bio: "Biography reader",
  },
  {
    id: usersIds[13],
    name: "Nathan White",
    email: "nathan@example.com",
    pwd: "password",
    joinedAt: "2023-12-20",
    isActive: true,
    bio: "Philosophy books",
  },
  {
    id: usersIds[14],
    name: "Olivia Harris",
    email: "olivia@example.com",
    pwd: "password",
    joinedAt: "2024-01-01",
    isActive: true,
    bio: "Graphic novel enthusiast",
  },
  {
    id: usersIds[15],
    name: "Paul Clark",
    email: "paul@example.com",
    pwd: "password",
    joinedAt: "2024-01-10",
    isActive: true,
    bio: "Literary critic",
  },
];
