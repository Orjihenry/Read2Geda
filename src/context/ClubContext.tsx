import { createContext, useContext, useEffect, useState } from "react";
import { type bookClub, type clubMember, defaultBookClubs } from "../utils/bookClub";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

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
};

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const [clubs, setClubs] = useState<bookClub[]>([]);
  const [loading, setLoading] = useState(false);

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
    setClubs([...clubs, newClub]);
    localStorage.setItem("bookClubs", JSON.stringify([...clubs, newClub]));
  };

  const updateClub = (club: bookClub) => {
    const updateClub = {
      ...club,
      updatedAt: currentDate,
    };
    setClubs(clubs.map((c) => (c.id === club.id ? updateClub : c)));
    localStorage.setItem(
      "bookClubs",
      JSON.stringify(clubs.map((c) => (c.id === club.id ? updateClub : c)))
    );
  };

  const deleteClub = (clubId: string) => {
    setClubs(clubs.filter((c) => c.id !== clubId));
    localStorage.setItem(
      "bookClubs",
      JSON.stringify(clubs.filter((c) => c.id !== clubId))
    );
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
    const updatedClubs = clubs.map((c) => (c.id === club.id ? updatedClub : c));
    setClubs(updatedClubs);
    localStorage.setItem("bookClubs", JSON.stringify(updatedClubs));
  };

  const isClubMember = (clubId: string, userId: string) => {
    const club = clubs.find((c) => c.id === clubId);
    if (!club) return false;
    return club.members.some((m) => m.id === userId);
  };

  const leaveClub = (clubId: string, userId: string) => {
    const club = clubs.find((c) => c.id === clubId);
    
    if (!club) return;
    if (!isClubMember(club.id, userId)) return;
    const updatedMembers = club.members.filter((m) => m.id !== userId);
    const updatedClub = { ...club, members: updatedMembers };
    const updatedClubs = clubs.map((c) => (c.id === club.id ? updatedClub : c));
    
    setClubs(updatedClubs);
    localStorage.setItem("bookClubs", JSON.stringify(updatedClubs));
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

export function useClubData() {
  const {
    clubs,
    loading,
    createClub,
    updateClub,
    deleteClub,
    clubNameExists,
    joinClub,
    leaveClub,
    isClubMember,
  } = useClub();
  return {
    clubs,
    loading,
    createClub,
    updateClub,
    deleteClub,
    clubNameExists,
    joinClub,
    leaveClub,
    isClubMember,
  };
}
