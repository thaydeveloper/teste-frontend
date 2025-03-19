import { useState, useRef, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts } from './useProducts';

export function useHomeContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const queryClient = useQueryClient();
  const resetPaginationRef = useRef(0);
  const observerRef = useRef(null);
  const observedNodeRef = useRef(null);

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

  const products =
    data?.pages?.flatMap((page, pageIndex) => {
      if (!page?.products?.length) return [];

      return page.products.map((product, index) => ({
        id: `${pageIndex}-${index}`,
        name: product.productName || product.name || 'Sem nome',
        productName: product.productName || product.name || 'Sem nome',
        description: product.productDescription || product.description || 'Sem descrição',
        image: product.productImg || product.image || 'https://via.placeholder.com/150',
        price: parseFloat(
          product.productPrice?.replace('R$ ', '')?.replace(',', '.') || product.price || '0'
        ),
        brand: product.productName?.split(' ')[0] || product.name?.split(' ')[0] || '',
      }));
    }) || [];

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    if (isLoading || isFetchingNextPage || !hasNextPage) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observedNodeRef.current) {
      observerRef.current.observe(observedNodeRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const lastProductRef = useCallback(node => {
    observedNodeRef.current = node;
    if (node && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(node);
    }
  }, []);

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

  const totalProducts = data?.pages?.[0]?.total || 0;

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
