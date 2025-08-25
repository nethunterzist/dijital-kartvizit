import useSWR from 'swr';

// Fetcher fonksiyonu
const fetcher = async (url: string) => {
  console.log('🔄 Fetching data from:', url);
  
  const res = await fetch(url);
  
  console.log('📡 Response status:', res.status, res.statusText);
  
  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
    
    try {
      const errorData = await res.json();
      errorMessage = errorData.error?.message || errorMessage;
      console.error('❌ API Error Response:', errorData);
    } catch (e) {
      console.error('❌ Failed to parse error response');
    }
    
    throw new Error(errorMessage);
  }
  
  const data = await res.json();
  console.log('✅ Data fetched successfully:', data);
  return data;
};

// Firmalar listesi için hook
export function useFirmalar() {
  const { data, error, isLoading, mutate } = useSWR('/api/firmalar', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 30000, // 30 saniyede bir yenile
    dedupingInterval: 5000, // 5 saniye içinde aynı isteği tekrar yapma
  });

  return {
    firmalar: data?.data || [],
    isLoading,
    isError: error,
    mutate, // Manuel yenileme için
  };
}

// Tek firma için hook
export function useFirma(id: string | number) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/firmalar/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0, // Tek firma için otomatik yenileme yapma
    }
  );

  return {
    firma: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Firma slug ile çekme
export function useFirmaBySlug(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `/api/firmalar/slug/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
    }
  );

  return {
    firma: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Template'ler için hook
export function useTemplates() {
  const { data, error, isLoading } = useSWR('/api/templates', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // Template'ler değişmez, cache'de tut
  });

  return {
    templates: data?.data || [],
    isLoading,
    isError: error,
  };
}

// Optimistic update helper
export function useOptimisticFirmalar() {
  const { firmalar, mutate, ...rest } = useFirmalar();

  const addFirma = async (newFirma: any) => {
    // Optimistic update - UI'yi hemen güncelle
    const optimisticData = {
      data: [...firmalar, { ...newFirma, id: Date.now() }]
    };
    
    // UI'yi hemen güncelle
    mutate(optimisticData, false);

    try {
      // Gerçek API çağrısını yap
      const response = await fetch('/api/firmalar', {
        method: 'POST',
        body: newFirma, // FormData olarak gönder
      });

      if (!response.ok) {
        throw new Error('Firma eklenemedi');
      }

      // Başarılı olursa veriyi yenile
      mutate();
      return await response.json();
    } catch (error) {
      // Hata durumunda eski veriyi geri yükle
      mutate();
      throw error;
    }
  };

  const updateFirma = async (id: number, updatedData: any) => {
    // Optimistic update
    const optimisticData = {
      data: firmalar.map((firma: any) => 
        firma.id === id ? { ...firma, ...updatedData } : firma
      )
    };
    
    mutate(optimisticData, false);

    try {
      const response = await fetch(`/api/firmalar/${id}`, {
        method: 'PUT',
        body: updatedData,
      });

      if (!response.ok) {
        throw new Error('Firma güncellenemedi');
      }

      mutate();
      return await response.json();
    } catch (error) {
      mutate();
      throw error;
    }
  };

  const deleteFirma = async (id: number) => {
    // Optimistic update
    const optimisticData = {
      data: firmalar.filter((firma: any) => firma.id !== id)
    };
    
    mutate(optimisticData, false);

    try {
      const response = await fetch(`/api/firmalar?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Firma silinemedi');
      }

      mutate();
      return await response.json();
    } catch (error) {
      mutate();
      throw error;
    }
  };

  return {
    firmalar,
    addFirma,
    updateFirma,
    deleteFirma,
    ...rest,
  };
}
