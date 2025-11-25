const descriptionCache = new Map<string, string>();

function findDescriptionInBookCache(title: string, author: string): string | null {
  try {
    const stored = localStorage.getItem("bookCache");
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    const books = Array.isArray(parsed) ? parsed : Object.values(parsed);
    
    const matchingBook = books.find((book: any) => 
      book.title?.toLowerCase() === title.toLowerCase() &&
      book.author?.toLowerCase() === author.toLowerCase() &&
      book.summary &&
      book.summary !== "No description available." &&
      book.summary !== "No description available"
    );
    
    return matchingBook?.summary || null;
  } catch (error) {
    console.warn("Error checking bookCache for description:", error);
    return null;
  }
}

export async function generateBriefDescription(
  title: string,
  author: string,
  publishedYear?: number
): Promise<string> {
  const cacheKey = `${title}-${author}`;
  if (descriptionCache.has(cacheKey)) {
    return descriptionCache.get(cacheKey)!;
  }

  const cachedDescription = findDescriptionInBookCache(title, author);
  if (cachedDescription) {
    descriptionCache.set(cacheKey, cachedDescription);
    return cachedDescription;
  }

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    const fallback = `A ${publishedYear ? `${publishedYear} ` : ''}book by ${author}.`;
    descriptionCache.set(cacheKey, fallback);
    return fallback;
  }

  try {
    const prompt = "Brief book description (max 20 words): What is the book about and top 3 genres? Plus its authors";
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Generate brief, concise book descriptions in one sentence (max 20 words).'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 50,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    const description = data.choices?.[0]?.message?.content?.trim() || 
      `A ${publishedYear ? `${publishedYear} ` : ''}book by ${author}.`;
    
    descriptionCache.set(cacheKey, description);
    return description;
  } catch (error) {
    console.warn('Failed to generate AI description:', error);
    const fallback = `A ${publishedYear ? `${publishedYear} ` : ''}book by ${author}.`;
    descriptionCache.set(cacheKey, fallback);
    return fallback;
  }
}
