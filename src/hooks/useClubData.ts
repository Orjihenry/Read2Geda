import { useEffect, useState } from "react";
import { defaultBookClubs, type bookClub } from "./../utils/bookClub";

export default function useClubData() {
    const [clubs, setClubs] = useState<bookClub[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setClubs(defaultBookClubs);
            setLoading(false);
        }, 500);
    }, []);

    return { clubs, loading };
}