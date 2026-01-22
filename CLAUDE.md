# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a **BIP39 seed phrase word recovery tool** - a client-side Next.js 16 application that helps users find the correct BIP39 wordlist word from typos or misspellings using multiple string similarity algorithms.

### Tech Stack
- Next.js 16 with App Router
- React 19
- Chakra UI v3 (configured in `src/theme/index.ts`)
- TypeScript with path alias `@/*` → `src/*`

### Key Components

**Search Engine** (`src/lib/search-engine.ts`): Core search logic that compares input against the 2048 BIP39 wordlist using weighted algorithm scores.

**Similarity Algorithms** (`src/lib/similarity-algorithms.ts`):
- Levenshtein (via `string-similarity` package)
- Hamming distance (same-length strings only)
- Phonetic matching (Soundex + consonant skeleton)
- Adjacent character swap detection

**Search Hook** (`src/lib/hooks/useWordSearch.ts`): Manages search state with 300ms debouncing. Returns `{ input, setInput, results, isSearching, filters, setFilters }`.

**Types** (`src/types/index.ts`): `SearchResult`, `SearchFilters`, `SearchOptions`, `MatchType`, `AlgorithmScores`.

### UI Structure
- Single page app at `src/app/page.tsx` (client component)
- Theme provider wraps Chakra UI + next-themes in `src/components/ui/provider.tsx`
- Custom brand colors (teal) and accent colors (purple) defined in theme
