import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/db";

export function useImageStorage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (
    file: File,
    type: "avatar" | "clubImage",
    options?: { userId?: string; clubId?: string }
  ) => {
    try {
      setLoading(true);
      setError(null);

      const id = uuidv4();

      const uploadData = {
        id,
        name: file.name,
        userId: options?.userId ?? "",
        clubId: options?.clubId ?? "",
        type,
        blob: file,
        createdAt: new Date().toISOString(),
      };

      await db.avatars.add(uploadData);

      return id;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getImage = async (id: string): Promise<Blob | null> => {
    try {
      const images = await db.avatars
        .toArray()
        .then((all) => all.filter((img) => img.userId === id || img.clubId === id));

      if (images.length === 0) return null;
      return images[0].blob as Blob;
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return null;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await db.avatars.delete(id);
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
    }
  };

  return { uploadImage, getImage, deleteImage, loading, error };
}