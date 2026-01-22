export type MatchType = 'exact' | 'phonetic' | 'dice' | 'swap' | 'similar';

export interface AlgorithmScores {
  dice: number;
  hamming: number;
  phonetic: number;
  swap: number;
}

export type CharDiffType = 'match' | 'insert' | 'delete' | 'change';

export interface CharDiff {
  char: string;
  type: CharDiffType;
}

export interface SearchResult {
  word: string;
  score: number;
  matchType: MatchType;
  algorithmScores: AlgorithmScores;
  charDiffs?: CharDiff[];
}

export interface SearchFilters {
  minThreshold: number;
  enabledAlgorithms: {
    dice: boolean;
    hamming: boolean;
    phonetic: boolean;
    swap: boolean;
  };
}

export interface SearchOptions extends SearchFilters {
  maxResults?: number;
}
