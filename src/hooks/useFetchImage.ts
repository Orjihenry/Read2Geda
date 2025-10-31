import { useEffect, useState } from "react";
import { useImageStorage } from "./useImageStorage";

export function useFetchImage(imageId?: string | null, fallback?: string) {
  const { getImage, loading, error } = useImageStorage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageId) {
      setImageUrl(fallback || null);
      return;
    }

    let revokeUrl: string | null = null;
    let isCancelled = false;

    const loadImage = async () => {
      try {
        if (imageId.length === 36 && !imageId.includes("/")) {
          const blob = await getImage(imageId);
          if (blob) {
            const url = URL.createObjectURL(blob);
            revokeUrl = url;
            if (!isCancelled) setImageUrl(url);
          } else {
            if (!isCancelled) setImageUrl(fallback || null);
          }
        } else {
          if (!isCancelled) setImageUrl(imageId);
        }
      } catch (err) {
        console.error("Failed to fetch image:", err);
        if (!isCancelled) {
          setImageUrl(fallback || null);
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

