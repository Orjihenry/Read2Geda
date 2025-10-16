import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/db";

export function useImageStorage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (
    file: File,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const id = uuidv4();

      const uploadData = {
        id,
        name: file.name,
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
      const image = await db.avatars.get(id);
      if (!image) return null;
      return image.blob as Blob;
    }
    catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      return null;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await db.avatars.delete(id);
    }
    catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  return { uploadImage, getImage, deleteImage, loading, error };
}