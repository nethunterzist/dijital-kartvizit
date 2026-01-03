import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UsePackageInquiriesOptions {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function usePackageInquiries(options: UsePackageInquiriesOptions = {}) {
  const { status = 'all', search = '', page = 1, limit = 20 } = options;

  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const { data, error, mutate, isLoading } = useSWR(
    `/api/admin/package-inquiries?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  return {
    inquiries: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 0,
    isLoading,
    isError: error,
    mutate,
  };
}
