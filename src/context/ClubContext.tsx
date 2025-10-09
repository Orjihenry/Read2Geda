import { createContext, useContext, useEffect, useState } from "react";
import { type bookClub, defaultBookClubs } from "../utils/bookClub";
import { v4 as uuidv4 } from "uuid";

type ClubContextType = {
    clubs: bookClub[];
    loading: boolean;
    createClub: (club: bookClub) => void;
    updateClub: (club: bookClub) => void;
    deleteClub: (clubId: string) => void;
    clubNameExists: (clubName: string) => boolean;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export function ClubProvider({ children }: { children: React.ReactNode }) {
    const [clubs, setClubs] = useState<bookClub[]>([]);
    const [loading, setLoading] = useState(false);

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
    }, [])

    const createClub = (club: bookClub) => {
        const newClub = {
            ...club,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            members: club.members,
            ownerName: club.ownerName,
            ownerImageUrl: club.ownerImageUrl,
            isPublic: club.isPublic,
            isActive: club.isActive,
            rating: club.rating,
            tags: club.tags,
            location: club.location,
            meetingFrequency: club.meetingFrequency,
        }
        setClubs([...clubs, newClub]);
        localStorage.setItem("bookClubs", JSON.stringify([...clubs, newClub]));
    }

    const updateClub = (club: bookClub) => {
        const updateClub = {
            ...club,
            updatedAt: new Date().toISOString(),
        }
        setClubs(clubs.map(c => c.id === club.id ? updateClub : c));
        localStorage.setItem("bookClubs", JSON.stringify(clubs.map(c => c.id === club.id ? updateClub : c)));
    }

    const deleteClub = (clubId: string) => {
        setClubs(clubs.filter(c => c.id !== clubId));
        localStorage.setItem("bookClubs", JSON.stringify(clubs.filter(c => c.id !== clubId)));
    }

    const clubNameExists = (clubName: string) => {
        return clubs.some(c => c.name === clubName);
    }

    return (
        <ClubContext.Provider value={{ clubs, loading, createClub, updateClub, deleteClub, clubNameExists }}>
            {children}
        </ClubContext.Provider>
    )
}

export function useClub() {
    const context = useContext(ClubContext);
    if (!context) throw new Error("useClub must be used within a ClubProvider");
    return context;
}

export function useClubData() {
    const { clubs, loading, createClub, updateClub, deleteClub, clubNameExists } = useClub();
    return { clubs, loading, createClub, updateClub, deleteClub, clubNameExists };
}