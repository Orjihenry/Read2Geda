import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { bookClub, ClubBook, BookSuggestion, clubMember, ClubRule } from "../utils/bookClub";
import { defaultBookClubs } from "../utils/bookClub";
import { getCurrentDateTime } from "../utils/dateUtils";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "./AuthContext";
import type { UserBooks } from "../types/user";
import type { BookData } from "../utils/bookData";
import { useBookCache } from "./BookCacheContext";
import { notifyAlert } from "../alerts/sweetAlert";
import { clubAlerts } from "../alerts/clubAlerts";

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
  addBookToClub: (clubId: string, book: BookData, userId: string) => void;
  selectCurrentBook: (clubId: string, bookId: string, userId: string) => void;
  removeBookFromClub: (clubId: string, bookId: string) => void;
  getUserBookProgressById: (userId: string, bookId: string) => number;
  getBookClubProgress: (clubId: string) => number;
  getClubBooks: (clubId: string, status?: ClubBookStatus) => ClubBook[];
  isWishListBook: (bookId: string) => boolean;
  updateClubBookStatus: (clubId: string, userId: string, bookId: string, status: ClubBookStatus) => void;
  isOwner: (clubId: string, userId: string) => boolean;
  isModerator: (clubId: string, userId: string) => boolean;
  suggestBook: (clubId: string, bookId: string, userId: string) => boolean;
  approveSuggestion: (clubId: string, bookId: string, userId: string) => boolean;
  rejectSuggestion: (clubId: string, bookId: string, userId: string) => boolean;
  getSuggestions: (clubId: string) => BookSuggestion[];
  updateClubRules: (clubId: string, rules: ClubRule[]) => boolean;
  addRule: (rules: ClubRule[]) => ClubRule[];
  removeRule: (rules: ClubRule[], index: number) => ClubRule[];
  updateRule: (rules: ClubRule[], index: number, field: "title" | "description", value: string) => ClubRule[];
  updateMemberRole: (clubId: string, memberId: string, role: "member" | "moderator" | "owner", userId: string, transferOwnerId?: string) => boolean;
  getClubAccess: (clubId?: string) => {userId: string; isLoggedIn: boolean; canModerate: boolean; isClubOwner: boolean;};
};

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const [clubs, setClubs] = useState<bookClub[]>([]);
  const [loading, setLoading] = useState(false);
  const { users, currentUser } = useAuthContext();
  const { addBook: addBookToCache } = useBookCache();

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
  const saveClubs = useCallback((updatedClubs: bookClub[]) => {
    setClubs(updatedClubs);
    localStorage.setItem("bookClubs", JSON.stringify(updatedClubs));
  }, []);

  const findClub = useCallback((clubId: string): bookClub | undefined =>
      clubs.find((c) => c.id === clubId),
    [clubs]
  );

  const updateClubList = useCallback((clubId: string, updatedClub: bookClub) =>
    clubs.map((c) => (c.id === clubId ? updatedClub : c)),
    [clubs]
  );

  const isOwner = useCallback((clubId: string, userId: string): boolean => {
    const club = findClub(clubId);
    if (!club) return false;
    return club.ownerId === userId || club.members.some((m) => m.id === userId && m.role === "owner");
  }, [findClub]);

  // End of Helper functions

  const createClub = useCallback((club: bookClub) => {
    const currentDate = getCurrentDateTime();
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
  }, [clubs, saveClubs]);

  const isModerator = useCallback((clubId: string, userId: string): boolean => {
    const club = findClub(clubId);
    if (!club) return false;
    const member = club.members.find((m) => m.id === userId);
    return club.ownerId === userId || member?.role === "owner" || member?.role === "moderator";
  }, [findClub]);

  const getClubAccess = useCallback((clubId?: string) => {
    const userId = currentUser?.id || "";
    const isLoggedIn = !!currentUser;
    const canModerate = clubId ? isModerator(clubId, userId) : false;
    const isClubOwner = clubId ? isOwner(clubId, userId) : false;

    return { userId, isLoggedIn, canModerate, isClubOwner };
  }, [currentUser, isModerator, isOwner]);

  const updateClub = useCallback((club: bookClub) => {
    const currentDate = getCurrentDateTime();
    const updateClub = {
      ...club,
      updatedAt: currentDate,
    };
    saveClubs(updateClubList(club.id, updateClub));
  }, [saveClubs, updateClubList]);

  const updateClubRules = useCallback((clubId: string, rules: ClubRule[]): boolean => {
    const club = findClub(clubId);
    if (!club) return false;

    const updatedClub = {
      ...club,
      rules: rules,
      updatedAt: getCurrentDateTime(),
    };
    
    saveClubs(updateClubList(clubId, updatedClub));
    return true;
  }, [findClub, saveClubs, updateClubList]);

  const addRule = useCallback((rules: ClubRule[]): ClubRule[] => {
    const MAX_RULES = 7;
    if (rules.length >= MAX_RULES) {
      return rules;
    }
    return [...rules, { title: "", description: "" }];
  }, []);

  const removeRule = useCallback((rules: ClubRule[], index: number): ClubRule[] => {
    return rules.filter((_, i) => i !== index);
  }, []);

  const updateRule = useCallback((rules: ClubRule[], index: number, field: "title" | "description", value: string ): ClubRule[] => 
    {
      const updated = [...rules];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    }, []);

  const deleteClub = useCallback((clubId: string) => {
    saveClubs(clubs.filter((c) => c.id !== clubId));
  }, [clubs, saveClubs]);

  const clubNameExists = useMemo(() => (clubName: string) => {
    return clubs.some((c) => c.name === clubName);
  }, [clubs]);

  const isClubMember = useMemo(() => (clubId: string, userId: string) => {
    const club = findClub(clubId);
    if (!club) return false;
    return club.members.some((m) => m.id === userId);
  }, [findClub]);

  const joinClub = useCallback((club: bookClub, userId: string) => {
    const currentDate = getCurrentDateTime();
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
  }, [saveClubs, updateClubList, isClubMember]);

  const leaveClub = useCallback((clubId: string, userId: string) => {
    const club = findClub(clubId);

    if (!club) return;
    if (!isClubMember(club.id, userId)) return;
    
    if (isOwner(clubId, userId)) {
      notifyAlert(clubAlerts.ownerCannotLeaveClub());
      return;
    };

    const updatedMembers = club.members.filter((m) => m.id !== userId);
    const updatedClub = { ...club, members: updatedMembers };
    const updatedClubs = updateClubList(club.id, updatedClub);
    
    saveClubs(updatedClubs);
  }, [findClub, isClubMember, saveClubs, updateClubList]);

  const getMyClubs = useMemo(() => (userId: string) => {
    return clubs.filter((club) =>
      club.members.some((member) => member.id === userId)
    );
  }, [clubs]);

  const addBookToClub = useCallback((clubId: string, book: BookData, userId: string) => {
    const currentDate = getCurrentDateTime();
    const club = findClub(clubId);
    if (!club) return;
    const newClubBook: ClubBook = { bookId: book.id, status: 'upcoming', addedBy: userId, addedAt: currentDate };
    const updatedClub = { ...club, books: [...(club.books || []), newClubBook]};
    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);
    addBookToCache(book);
  }, [findClub, saveClubs, updateClubList, addBookToCache]);

  const selectCurrentBook = useCallback((clubId: string, bookId: string, userId: string) => {
    const currentDate = getCurrentDateTime();
    const club = findClub(clubId);
    if (!club) return;
    if (!isModerator(clubId, userId)) return;

    const updatedBooks = (club.books || []).map((book) => {
      if (book.bookId === bookId) {
        return { ...book, status: "current" as ClubBookStatus, startDate: currentDate };
      }
      if (book.status === "current") {
        return { ...book, status: "completed" as ClubBookStatus, endDate: currentDate };
      }
      return book;
    });

    const updatedClub: bookClub = {
      ...club,
      currentBook: { bookId, status: "current", startDate: currentDate },
      books: updatedBooks,
    };

    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);

    return updatedClub;
  },
  [findClub, saveClubs, updateClubList, isModerator]
);

  const removeBookFromClub = useCallback((clubId: string, bookId: string) => {
    const club = findClub(clubId);
    if (!club) return;
    const updatedBooks = club.books?.filter((book) => book.bookId !== bookId);

    const updatedClub = { ...club, books: updatedBooks };
    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);
  }, [findClub, saveClubs, updateClubList]);

  const updateClubBookStatus = useCallback((clubId: string, userId: string, bookId: string, status: ClubBookStatus) => {
    const currentDate = getCurrentDateTime();
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
  }, [findClub, isClubMember, saveClubs, updateClubList]);

  const getUserBookProgressById = useCallback((userId: string, bookId: string): number => {
    const user = users.find((u) => u.id === userId);
    if (!user || !user.books) return 0;

    const userBooks: UserBooks = user.books;
    return userBooks[bookId]?.progress || 0;
  }, [users]);

  const getBookClubProgress = useCallback((clubId: string): number => {
    const club = findClub(clubId);
    if (!club || club.members.length === 0 || !club.currentBook) return 0;

    const currentBookId = club.currentBook.bookId;

    const allProgress = club.members.map((member) => {
      const user = users.find((u) => u.id === member.id);
      if (!user || !user.books) return 0;
      const userBooks: UserBooks = user.books;
      return userBooks[currentBookId]?.progress || 0;
    });

    const total = allProgress.reduce((sum, p) => sum + p, 0);
    return Math.round(total / club.members.length);
  }, [findClub, users]);

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

  const suggestBook = useCallback((clubId: string, bookId: string, userId: string): boolean => {
    const club = findClub(clubId);
    if (!club) return false;

    if (!isClubMember(clubId, userId)) return false;

    const existingBook = club.books?.find((book) => book.bookId === bookId);
    if (existingBook) return false;

    const existingSuggestion = club.suggestions?.find((suggestion) => suggestion.bookId === bookId);
    if (existingSuggestion) return false;

    const currentDate = getCurrentDateTime();
    const newSuggestion: BookSuggestion = {
      bookId,
      suggestedBy: userId,
      suggestedAt: currentDate,
    };

    const updatedClub = {
      ...club,
      suggestions: [...(club.suggestions || []), newSuggestion],
    };

    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);
    return true;
  }, [findClub, isClubMember, saveClubs, updateClubList]);

  const approveSuggestion = useCallback((clubId: string, bookId: string, userId: string): boolean => {
    const club = findClub(clubId);
    if (!club) return false;

    if (!isModerator(clubId, userId)) return false;

    const suggestion = club.suggestions?.find((s) => s.bookId === bookId);
    if (!suggestion) return false;

    const existingBook = club.books?.find((book) => book.bookId === bookId);
    if (existingBook) {
      const updatedSuggestions = club.suggestions?.filter((s) => s.bookId !== bookId) || [];
      const updatedClub = {
        ...club,
        suggestions: updatedSuggestions,
      };
      const updatedClubs = updateClubList(clubId, updatedClub);
      saveClubs(updatedClubs);
      return false;
    }

    const currentDate = getCurrentDateTime();
    const newBook: ClubBook = {
      bookId,
      status: 'upcoming',
      addedBy: userId,
      addedAt: currentDate,
      isWishList: false,
    };

    const updatedSuggestions = club.suggestions?.filter((s) => s.bookId !== bookId) || [];
    const updatedClub = {
      ...club,
      books: [...(club.books || []), newBook],
      suggestions: updatedSuggestions,
    };

    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);
    return true;
  }, [findClub, isModerator, saveClubs, updateClubList]);

  const rejectSuggestion = useCallback((clubId: string, bookId: string, userId: string): boolean => {
    const club = findClub(clubId);
    if (!club) return false;

    if (!isModerator(clubId, userId)) return false;

    const suggestion = club.suggestions?.find((s) => s.bookId === bookId);
    if (!suggestion) return false; 

    const updatedSuggestions = club.suggestions?.filter((s) => s.bookId !== bookId) || [];
    const updatedClub = {
      ...club,
      suggestions: updatedSuggestions,
    };

    const updatedClubs = updateClubList(clubId, updatedClub);
    saveClubs(updatedClubs);
    return true;
  }, [findClub, isModerator, saveClubs, updateClubList]);

  const getSuggestions = useCallback((clubId: string): BookSuggestion[] => {
    const club = findClub(clubId);
    return club?.suggestions || [];
  }, [findClub]);

  const updateMemberRole = useCallback((clubId: string, memberId: string, role: "member" | "moderator" | "owner", userId: string, transferOwnerId?: string): boolean => {
    const club = findClub(clubId);
    if (!club) return false;

    if (!isOwner(clubId, userId)) return false;

    const currentMember = club.members.find((m) => m.id === memberId);
    if (!currentMember) return false;

    const currentRole = currentMember.role || "member";
    const currentOwnerList = club.ownerId === memberId || currentRole === "owner";
    const isPrimaryOwner = club.ownerId === memberId;

    const additionalOwners = club.members.filter((m) => 
      m.role === "owner" && m.id !== club.ownerId
    ).length;
    const actualOwnerCount = (club.ownerId ? 1 : 0) + additionalOwners;

    if (role === "owner" && !currentOwnerList) {
      if (actualOwnerCount >= 3) {
        return false;
      }
    }

    if (currentOwnerList && role !== "owner") {
      if (actualOwnerCount <= 1) {
        return false;
      }
    }

    if (isPrimaryOwner && role !== "owner") {
      if (!transferOwnerId) return false;

      const transferTarget = club.members.find((m) => m.id === transferOwnerId);
      if (!transferTarget || transferTarget.id === memberId) return false;
      if (transferTarget.role !== "owner") return false;

      const updatedMembers = club.members.map((m) => {
        if (m.id === memberId) return { ...m, role };
        if (m.id === transferOwnerId) return { ...m, role: "owner" as const };
        return m;
      });

      const updatedClub = {
        ...club,
        ownerId: transferOwnerId,
        members: updatedMembers,
        updatedAt: getCurrentDateTime(),
      };

      saveClubs(updateClubList(clubId, updatedClub));
      return true;
    }

    const updatedMembers = club.members.map((m) =>
      m.id === memberId ? { ...m, role } : m
    );

    const updatedClub = {
      ...club,
      members: updatedMembers,
      updatedAt: getCurrentDateTime(),
    };

    saveClubs(updateClubList(clubId, updatedClub));
    return true;
  }, [findClub, saveClubs, updateClubList, isOwner]);

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
        selectCurrentBook,
        removeBookFromClub,
        getUserBookProgressById,
        getBookClubProgress,
        getClubBooks,
        isWishListBook,
        updateClubBookStatus,
        isOwner,
        isModerator,
        suggestBook,
        approveSuggestion,
        rejectSuggestion,
        getSuggestions,
        updateClubRules,
        addRule,
        removeRule,
        updateRule,
        updateMemberRole,
        getClubAccess,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useClub() {
  const context = useContext(ClubContext);
  if (!context) throw new Error("useClub must be used within a ClubProvider");
  return context;
}

