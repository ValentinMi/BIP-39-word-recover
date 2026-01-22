import { useState, useEffect, useMemo } from 'react';
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

    const results = useMemo<SearchResult[]>(() => {
        if (!debouncedInput.trim()) {
            return [];
        }
        return searchWords(debouncedInput, filters);
    }, [debouncedInput, filters]);

    return {
        input,
        setInput,
        results,
        isSearching: isTyping,
        isTyping,
        filters,
        setFilters
    };
}
