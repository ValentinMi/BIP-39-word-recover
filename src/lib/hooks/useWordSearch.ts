import { useState, useEffect, useCallback } from 'react';
import { searchWords } from '../search-engine';
import { SearchResult, SearchFilters } from '@/types';

// Debounce helper
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

    // Typing indicator: true when user is typing but debounce hasn't fired yet
    const isTyping = input !== debouncedInput && input.trim().length > 0;

    const handleSearch = useCallback(() => {
        if (!debouncedInput.trim()) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        // Use setTimeout to allow UI to update to "searching" state before heavy calculation
        // although for 2048 words it should be instant.
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
