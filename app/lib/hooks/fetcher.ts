// SWR için fetcher fonksiyonu
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('Veri çekilirken bir hata oluştu');
    // Hata detaylarını ekle
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }
  
  return res.json();
};

// POST/PUT/DELETE işlemleri için fetcher
export const mutationFetcher = async (url: string, { arg }: { arg: any }) => {
  const res = await fetch(url, {
    method: arg.method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...arg.headers,
    },
    body: arg.body ? JSON.stringify(arg.body) : undefined,
  });

  if (!res.ok) {
    const error = new Error('İşlem sırasında bir hata oluştu');
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};
