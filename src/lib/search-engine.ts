import { BIP39_WORDLIST } from './bip39-wordlist';
import {
    getDiceSimilarity,
    getHammingSimilarity,
    getPhoneticSimilarity,
    getSwapSimilarity
} from './similarity-algorithms';
import { SearchResult, SearchOptions, MatchType, CharDiff } from '@/types';

function computeCharDiffs(input: string, target: string): CharDiff[] {
    const diffs: CharDiff[] = [];
    const maxLen = Math.max(input.length, target.length);

    for (let i = 0; i < maxLen; i++) {
        const inputChar = input[i];
        const targetChar = target[i];

        if (inputChar === targetChar) {
            diffs.push({ char: targetChar, type: 'match' });
        } else if (inputChar === undefined) {
            diffs.push({ char: targetChar, type: 'insert' });
        } else if (targetChar === undefined) {
            continue;
        } else {
            diffs.push({ char: targetChar, type: 'change' });
        }
    }

    return diffs;
}

export function searchWords(input: string, options: SearchOptions): SearchResult[] {
    if (!input || input.trim().length === 0) return [];

    const normalizedInput = input.toLowerCase().trim();
    const results: SearchResult[] = [];

    const WEIGHTS = {
        exact: 1.0,
        swap: 0.95,
        dice: 0.8,
        phonetic: 0.7,
        hamming: 0.6
    };

    for (const word of BIP39_WORDLIST) {
        if (word === normalizedInput) {
            results.push({
                word,
                score: 1.0,
                matchType: 'exact',
                algorithmScores: {
                    dice: 1,
                    hamming: 1,
                    phonetic: 1,
                    swap: 0
                },
                charDiffs: word.split('').map(char => ({ char, type: 'match' as const }))
            });
            continue;
        }

        const scores = {
            dice: options.enabledAlgorithms.dice ? getDiceSimilarity(normalizedInput, word) : 0,
            hamming: options.enabledAlgorithms.hamming ? getHammingSimilarity(normalizedInput, word) : 0,
            phonetic: options.enabledAlgorithms.phonetic ? getPhoneticSimilarity(normalizedInput, word) : 0,
            swap: options.enabledAlgorithms.swap ? getSwapSimilarity(normalizedInput, word) : 0
        };

        let maxScore = 0;
        let matchType: MatchType = 'similar';

        if (scores.swap > 0) {
            maxScore = Math.max(maxScore, scores.swap * WEIGHTS.swap);
            if (maxScore === scores.swap * WEIGHTS.swap) matchType = 'swap';
        }

        if (scores.phonetic > 0) {
            maxScore = Math.max(maxScore, scores.phonetic * WEIGHTS.phonetic);
            if (maxScore === scores.phonetic * WEIGHTS.phonetic) matchType = 'phonetic';
        }

        if (scores.dice > 0) {
            maxScore = Math.max(maxScore, scores.dice * WEIGHTS.dice);
            if (maxScore === scores.dice * WEIGHTS.dice) matchType = 'dice';
        }

        if (maxScore >= options.minThreshold) {
            results.push({
                word,
                score: maxScore,
                matchType,
                algorithmScores: scores,
                charDiffs: computeCharDiffs(normalizedInput, word)
            });
        }
    }

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, options.maxResults || 20);
}
