import { useEffect, useState } from "react";
import { useImageStorage } from "./useImageStorage";

export async function loadImageUrl(
  imageId: string | null | undefined,
  getImage: (id: string) => Promise<Blob | null>,
  fallback?: string
): Promise<string | null> {
  if (!imageId) {
    return fallback || null;
  }

  try {
    if (imageId.length === 36 && !imageId.includes("/")) {
      const blob = await getImage(imageId);
      if (blob) {
        return URL.createObjectURL(blob);
      } else {
        return fallback || null;
      }
    } else {
      return imageId;
    }
  } catch (err) {
    console.error("Failed to fetch image:", err);
    return fallback || null;
  }
}

export function useFetchImage(imageId?: string | null, fallback?: string) {
  const { getImage, loading, error } = useImageStorage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let revokeUrl: string | null = null;
    let isCancelled = false;

    const loadImage = async () => {
      const url = await loadImageUrl(imageId, getImage, fallback);
      if (!isCancelled) {
        setImageUrl(url);
        if (url && url.startsWith("blob:")) {
          revokeUrl = url;
        }
      }
    };

    loadImage();

    return () => {
      isCancelled = true;
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [imageId, getImage, fallback]);

  return { imageUrl, loading, error };
}
