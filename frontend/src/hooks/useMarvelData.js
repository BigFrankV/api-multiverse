import { useState, useEffect, useCallback } from 'react';
import * as marvelService from '../services/marvelService';

export function useMarvelData(entityType, options = {}) {
  const { searchTerm = '', limit = 20 } = options;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searching, setSearching] = useState(false);

  const fetchData = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const newOffset = reset ? 0 : offset;
      
      if (searchTerm && searchTerm.trim() !== '') {
        // Search mode
        setSearching(true);
        let results;
        
        if (entityType === 'character') {
          results = await marvelService.searchMarvelCharacters(searchTerm);
        } else if (entityType === 'comic') {
          results = await marvelService.searchMarvelComics(searchTerm);
        }
        
        setData(results || []);
        setHasMore(false);
      } else {
        // Get list mode
        setSearching(false);
        let response;
        
        if (entityType === 'character') {
          response = await marvelService.getMarvelCharacters(limit, newOffset);
        } else if (entityType === 'comic') {
          response = await marvelService.getMarvelComics(limit, newOffset);
        } else if (entityType === 'event') {
          response = await marvelService.getMarvelEvents(limit, newOffset);
        }
        
        if (reset) {
          setData(response.results);
        } else {
          setData(prevData => [...prevData, ...response.results]);
        }
        
        setOffset(newOffset + limit);
        setHasMore(response.next);
        setTotalItems(response.count || 0);
      }
      
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching Marvel ${entityType} data:`, err);
      setError(`No se pudo cargar la información. Por favor, intenta nuevamente más tarde.`);
      setLoading(false);
    }
  }, [entityType, searchTerm, offset, limit]);

  const performSearch = useCallback(() => {
    setOffset(0);
    fetchData(true);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    hasMore,
    totalItems,
    offset,
    searching,
    fetchMore: () => fetchData(false),
    search: performSearch,
    reset: () => {
      setOffset(0);
      setData([]);
      fetchData(true);
    }
  };
}
