
export type bookClub = {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  ownerId: string;
  ownerName: string;
  ownerImageUrl?: string;
  isPublic: boolean;
  isActive: boolean;
  tags?: string[];
  location?: string;
  meetingFrequency?: string;
  nextMeeting?: string;
  lastMeeting?: string;
  meetingPlatform?: string;
}

export const defaultBookClubs: bookClub[] = [
  {
    id: "1",
    name: "Book Lovers",
    description: "A club for people who love reading books.",
    members: ["user1", "user2"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: "/src/assets/track_your_progress.png",
    ownerId: "user1",
    ownerName: "User One",
    ownerImageUrl: "",
    isPublic: true,
    isActive: true,
    tags: ["fiction", "mystery"],
    location: "Online",
    meetingFrequency: "Weekly",
    nextMeeting: new Date().toISOString(),
    lastMeeting: new Date().toISOString(),
    meetingPlatform: "Zoom",
  },
  {
    id: "2",
    name: "Sci-Fi Enthusiasts",
    description: "A club for fans of science fiction.",
    members: ["user3", "user4"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: "/src/assets/keeping_in_touch.png",
    ownerId: "user3",
    ownerName: "User Three",
    ownerImageUrl: "",
    isPublic: true,
    isActive: true,
    tags: ["science fiction", "fantasy"],
    location: "Online",
    meetingFrequency: "Bi-weekly",
    nextMeeting: new Date().toISOString(),
    lastMeeting: new Date().toISOString(),
    meetingPlatform: "Discord",
  },
  {
    id: "3",
    name: "Mystery Solvers",
    description: "A club for those who love solving mysteries.",
    members: ["user5", "user6"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: "/src/assets/keeping_in_touch.png",
    ownerId: "user5",
    ownerName: "User Five",
    ownerImageUrl: "",
    isPublic: true,
    isActive: true,
    tags: ["mystery", "thriller"],
    location: "Online",
    meetingFrequency: "Monthly",
    nextMeeting: new Date().toISOString(),
    lastMeeting: new Date().toISOString(),
    meetingPlatform: "Google Meet",
  },
  {
    id: "4",
    name: "History Buffs",
    description: "A club for those who love history books.",
    members: ["user7", "user8"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: "/src/assets/keeping_in_touch.png",
    ownerId: "user7",
    ownerName: "User Seven",
    ownerImageUrl: "",
    isPublic: true,
    isActive: true,
    tags: ["history", "non-fiction"],
    location: "Online",
    meetingFrequency: "Monthly",
    nextMeeting: new Date().toISOString(),
    lastMeeting: new Date().toISOString(),
    meetingPlatform: "Skype",
  },
  {
    id: "5",
    name: "Fantasy Realm",
    description: "A club for fans of fantasy novels.",
    members: ["user9", "user10"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: "/src/assets/discover_new_reads.jpg",
    ownerId: "user9",
    ownerName: "User Nine",
    ownerImageUrl: "",
    isPublic: true,
    isActive: true,
    tags: ["fantasy", "adventure"],
    location: "Online",
    meetingFrequency: "Weekly",
    nextMeeting: new Date().toISOString(),
    lastMeeting: new Date().toISOString(),
    meetingPlatform: "Teams",
  },
]