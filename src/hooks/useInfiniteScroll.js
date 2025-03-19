import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(loadMore, { isLoading, isFetchingMore, hasMore }) {
  const observerRef = useRef(null);
  const observedNodeRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    if (isLoading || isFetchingMore || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observedNodeRef.current) {
      observerRef.current.observe(observedNodeRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [isLoading, isFetchingMore, hasMore, loadMore]);

  const lastItemRef = useCallback(node => {
    observedNodeRef.current = node;
    if (node && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(node);
    }
  }, []);

  return lastItemRef;
}
