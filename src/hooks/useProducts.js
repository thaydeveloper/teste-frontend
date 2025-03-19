import { useInfiniteQuery } from '@tanstack/react-query';
import { MockApiService } from '../services/mockApiService';

export function useProducts(searchTerm, priceFilter, resetId = 0) {
  return useInfiniteQuery({
    queryKey: ['products', searchTerm, priceFilter, resetId],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await MockApiService.getProducts({
          page: pageParam,
          limit: 10,
          search: searchTerm,
          priceFilter,
        });
      } catch (error) {
        console.error('⚠️ Erro ao buscar produtos:', error);
        throw error;
      }
    },
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.page + 1 : undefined),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
