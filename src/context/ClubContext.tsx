import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { type bookClub, type ClubBook, type clubMember, defaultBookClubs } from "../utils/bookClub";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { useSavedBooks } from "./SavedBooksContext";

type ClubBookStatus = 'upcoming' | 'current' | 'completed';

type ClubContextType = {
  clubs: bookClub[];
  loading: boolean;
  createClub: (club: bookClub) => void;
  updateClub: (club: bookClub) => void;
  deleteClub: (clubId: string) => void;
  clubNameExists: (clubName: string) => boolean;
  joinClub: (club: bookClub, userId: string) => void;
  isClubMember: (clubId: string, userId: string) => boolean;
  leaveClub: (clubId: string, userId: string) => void;
  getMyClubs: (userId: string) => bookClub[];
  addBookToClub: (clubId: string, bookId: string, userId: string) => void;
  removeBookFromClub: (clubId: string, bookId: string) => void;
  getBookClubProgress: (clubId: string) => number;
  getClubBooks: (clubId: string, status?: ClubBookStatus) => ClubBook[];
  isWishListBook: (bookId: string) => boolean;
  updateClubBookStatus: (clubId: string, userId: string, bookId: string, status: ClubBookStatus) => void;
  isModerator: (clubId: string, userId: string) => boolean;
};

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const [clubs, setClubs] = useState<bookClub[]>([]);
  const [loading, setLoading] = useState(false);
  const { getReadingProgress } = useSavedBooks();
  const today = dayjs();
  const currentDate = today.format("YYYY-MM-DD HH:mm:ss");

  useEffect(() => {
    const savedClubs = localStorage.getItem("bookClubs");
    setLoading(true);
    if (savedClubs) {
      setClubs(JSON.parse(savedClubs));
    } else {
      setClubs(defaultBookClubs);
      localStorage.setItem("bookClubs", JSON.stringify(defaultBookClubs));
    }
    setLoading(false);
  }, []);

  // Helper functions
  const saveClubs = (updatedClubs: bookClub[]) => {
    setClubs(updatedClubs);
    localStorage.setItem("bookClubs", JSON.stringify(updatedClubs));
  };

  const findClub = useCallback(
    (clubId: string): bookClub | undefined =>
      clubs.find((c) => c.id === clubId),
    [clubs]
  );

  const updateClubList = (clubId: string, updatedClub: bookClub) =>
    clubs.map((c) => (c.id === clubId ? updatedClub : c));
  
  // End of Helper functions

  const createClub = (club: bookClub) => {
    const newClub = {
      ...club,
      id: uuidv4(),
      createdAt: currentDate,
      updatedAt: currentDate,
      members: club.members,
      isPublic: club.isPublic,
      tags: club.tags,
      location: club.location,
      meetingFrequency: club.meetingFrequency,
    };
    saveClubs([...clubs, newClub]);
  };

  const updateClub = (club: bookClub) => {
    const updateClub = {
      ...club,
      updatedAt: currentDate,
    };
    saveClubs(updateClubList(club.id, updateClub));
  };

  const deleteClub = (clubId: string) => {
    saveClubs(clubs.filter((c) => c.id !== clubId));
  };

  const clubNameExists = (clubName: string) => {
    return clubs.some((c) => c.name === clubName);
  };

  const joinClub = (club: bookClub, userId: string) => {
    if (!club) return;
    if (isClubMember(club.id, userId)) return;
    const newMember: clubMember = {
      id: userId,
      role: "member",
      joinedAt: currentDate,
      isSuspended: false,
    }
    const updatedClub = {
      ...club,
      members: [...club.members, newMember],
    };
    const updatedClubs = updateClubList(club.id, updatedClub);
    saveClubs(updatedClubs);
  };

  const isClubMember = (clubId: string, userId: string) => {
    const club = findClub(clubId);
    if (!club) return false;
    return club.members.some((m) => m.id === userId);
  };

  const leaveClub = (clubId: string, userId: string) => {
    const club = findClub(clubId);
    
    if (!club) return;
    if (!isClubMember(club.id, userId)) return;
    const updatedMembers = club.members.filter((m) => m.id !== userId);
    const updatedClub = { ...club, members: updatedMembers };
    const updatedClubs = updateClubList(club.id, updatedClub);
    
    saveClubs(updatedClubs);
  };

  const getMyClubs = (userId: string) => {
    return clubs.filter((club) =>
      club.members.some((member) => member.id === userId)
    );
  }

  const addBookToClub = (clubId: string, bookId: string, userId: string) => {
    const club = findClub(clubId);
    if (!club) return;
    const newBook: ClubBook = { bookId, status: 'upcoming', addedBy: userId, addedAt: currentDate };
    const updatedClub = { ...club, books: [...(club.books || []), newBook]};
    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);
  };

  const removeBookFromClub = (clubId: string, bookId: string) => {
    const club = findClub(clubId);
    if (!club) return;
    const updatedBooks = club.books?.filter((book) => book.bookId !== bookId);

    const updatedClub = { ...club, books: updatedBooks };
    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);
  };

  const updateClubBookStatus = (clubId: string, userId: string, bookId: string, status: ClubBookStatus) => {
    const club = findClub(clubId);
    if (!club || !isClubMember(clubId, userId)) return;

    const updatedBooks = (club.books || []).map((book) => {
      if (book.bookId === bookId) {
        return {
          ...book,
          status,
          startDate: status === "current" ? currentDate : book.startDate,
          endDate: status === "completed" ? currentDate : book.endDate,
          lastUpdatedBy: userId,
          lastUpdatedAt: currentDate,
        };
      }
      
      if (status === "current" && book.status === "current") {
        return { ...book, status: "completed", endDate: currentDate };
      }

      return book;
    });

    const updatedClub = {
      ...club,
      books: updatedBooks,
      currentBook:
        status === "current" ? { bookId, status, startDate: currentDate } : club.currentBook,
    };

    const updatedClubs = updateClubList(clubId, updatedClub as bookClub);
    saveClubs(updatedClubs);

    return updatedClub;
  };

  const getBookClubProgress = useCallback((clubId: string): number => {
  const club = findClub(clubId);
  if (!club || club.members.length === 0 || !club.currentBook) return 0;

  const currentBookId = club.currentBook.bookId;

  const totalProgress = club.members.reduce((sum, member) => {
    const userProgress = getReadingProgress(member.id).find(
      (p) => p.bookId === currentBookId
    );
    return sum + (userProgress?.progress || 0);
  }, 0);

  return Math.round(totalProgress / club.members.length);
}, [findClub, getReadingProgress]);

  const getClubBooks = useCallback( (clubId: string, status?: ClubBookStatus) => {
    const club = findClub(clubId);
    if (!club?.books) return [];

    return status
      ? club.books.filter((b) => b.status === status)
      : club.books;
  }, [findClub]);
  
  const isWishListBook = (bookId: string) => {
    return clubs.some((club) => club.books?.some((book) => book.bookId === bookId && book.status === 'upcoming' && book.isWishList));
  };

  const isModerator = (clubId: string, userId: string): boolean => {
    const club = findClub(clubId);
    if (!club) return false;
    
    const member = club.members.find((m) => m.id === userId);
    return member?.role === 'owner' || member?.role === 'moderator';
  };

  return (
    <ClubContext.Provider
      value={{
        clubs,
        loading,
        createClub,
        updateClub,
        deleteClub,
        clubNameExists,
        joinClub,
        isClubMember,
        leaveClub,
        getMyClubs,
        addBookToClub,
        removeBookFromClub,
        getBookClubProgress,
        getClubBooks,
        isWishListBook,
        updateClubBookStatus,
        isModerator,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
}

export function useClub() {
  const context = useContext(ClubContext);
  if (!context) throw new Error("useClub must be used within a ClubProvider");
  return context;
}
