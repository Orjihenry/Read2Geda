import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/db";
import { useAuthContext } from "../context/AuthContext";
import { useClub } from "../context/ClubContext";
import { useParams } from "react-router-dom";

export function useImageStorage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useAuthContext();
    const { clubId } = useParams();
    const { clubs } = useClub();

    const club = clubs.find(c => c.id === clubId);

    const uploadImage = async (file: File, type: 'avatar' | 'clubImage') => {
        try {
            setLoading(true);
            const id = uuidv4();

            const uplaodData = {
                id,
                name: file.name,
                userId: currentUser?.id || "",
                clubId: club?.id || "", 
                type,
                blob: file,
                createdAt: new Date(Date.now()).toISOString(),
            };

            await db.avatars.add(uplaodData);

            setLoading(false);
            return id;
        } catch (error) {
            setError(error as string);
            return null;
        }
    }

    const getImage = async (userId: string): Promise<Blob | null> => {
        try {
            const images = await db.avatars
                .toArray()
                .then(all => all.filter(img => img.userId === userId || img.clubId === userId));
            
            if (!images || images.length === 0) return null;
            return images[0].blob as Blob;
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
            return null;
        }
    };

    const deleteImage = async (id: string) => {
        await db.avatars.delete(id);
    }

    return { uploadImage, getImage, deleteImage, loading, error };
}