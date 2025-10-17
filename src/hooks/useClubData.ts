import { useEffect, useState } from "react";
import { defaultBookClubs, type bookClub } from "./../utils/bookClub";

export default function useClubData() {
  const [clubs, setClubs] = useState<bookClub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedClubs = localStorage.getItem("bookClubs");

    if (savedClubs) {
      setClubs(JSON.parse(savedClubs));
    } else {
      setClubs(defaultBookClubs);
      localStorage.setItem("bookClubs", JSON.stringify(defaultBookClubs));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (clubs.length > 0) {
      localStorage.setItem("bookClubs", JSON.stringify(clubs));
    }
  }, [clubs]);

  function handleSubmitEvent(club: bookClub) {
    const newClub = {
        id: String(clubs.length + 1),
        name: club.name,
        description: club.description,
        members: club.members,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrl: club.imageUrl,
        isPublic: club.isPublic,
        isActive: club.isActive,
        rating: club.rating,
        tags: club.tags,
        ownerId: club.ownerId,
    }

    setClubs([...clubs, newClub]);
  }
  
  function handleUpdateClub(club: bookClub) {
    const updateClub = {
        ...club,
        updatedAt: new Date().toISOString(),
    }

    setClubs(clubs.map(c => c.id === club.id ? updateClub : c));
  }

  function handleDeleteClub(clubId: string) {
    setClubs(clubs.filter(item => item.id !== clubId));
  }

  return { clubs, setClubs, loading, handleSubmitEvent, handleUpdateClub, handleDeleteClub };
}
