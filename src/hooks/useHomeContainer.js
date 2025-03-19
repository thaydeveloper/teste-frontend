import { useState, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts } from './useProducts';
import { useInfiniteScroll } from './useInfiniteScroll';
import { mapProductsFromPages, getTotalProductsCount } from '../utils/productMappers';

export function useHomeContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const queryClient = useQueryClient();
  const resetPaginationRef = useRef(0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useProducts(searchTerm, priceFilter, resetPaginationRef.current);

  const products = mapProductsFromPages(data?.pages);

  const lastProductRef = useInfiniteScroll(fetchNextPage, {
    isLoading,
    isFetchingMore: isFetchingNextPage,
    hasMore: hasNextPage,
  });

  const handleSearch = useCallback(
    value => {
      queryClient.removeQueries();
      resetPaginationRef.current += 1;
      setSearchTerm(value);
    },
    [queryClient]
  );

  const handlePriceFilterChange = useCallback(
    value => {
      queryClient.removeQueries();
      resetPaginationRef.current += 1;
      setPriceFilter(value);
    },
    [queryClient]
  );

  const totalProducts = getTotalProductsCount(data?.pages);

  return {
    products,
    searchTerm,
    priceFilter,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    error,
    displayTotalProducts: products.length > 0 ? totalProducts : 0,
    refetch,
    handleSearch,
    handlePriceFilterChange,
    lastProductRef,
  };
}
