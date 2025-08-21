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

  return { clubs, setClubs, loading };
}
