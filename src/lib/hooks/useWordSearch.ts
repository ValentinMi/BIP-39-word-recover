import { useState, useEffect, useCallback } from 'react';
import { searchWords } from '../search-engine';
import { SearchResult, SearchFilters } from '@/types';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function useWordSearch() {
    const [input, setInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    const [filters, setFilters] = useState<SearchFilters>({
        minThreshold: 0.4,
        enabledAlgorithms: {
            dice: true,
            hamming: true,
            phonetic: true,
            swap: true
        }
    });

    const debouncedInput = useDebounce(input, 300);

    const isTyping = input !== debouncedInput && input.trim().length > 0;

    const handleSearch = useCallback(() => {
        if (!debouncedInput.trim()) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        setTimeout(() => {
            const searchResults = searchWords(debouncedInput, filters);
            setResults(searchResults);
            setIsSearching(false);
        }, 10);
    }, [debouncedInput, filters]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    return {
        input,
        setInput,
        results,
        isSearching,
        isTyping,
        filters,
        setFilters
    };
}
