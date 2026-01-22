import stringSimilarity from 'string-similarity';

export function getDiceSimilarity(str1: string, str2: string): number {
    return stringSimilarity.compareTwoStrings(str1, str2);
}

export function getHammingSimilarity(str1: string, str2: string): number {
    if (str1.length !== str2.length) return 0;

    let distance = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            distance++;
        }
    }

    return 1 - (distance / str1.length);
}

function soundex(word: string): string {
    const a = word.toLowerCase().split('');
    const f = a.shift()!.toUpperCase();
    let r = '';

    const codes: { [key: string]: number } = {
        a: 0, e: 0, i: 0, o: 0, u: 0, y: 0, h: 0, w: 0,
        b: 1, f: 1, p: 1, v: 1,
        c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
        d: 3, t: 3,
        l: 4,
        m: 5, n: 5,
        r: 6
    };

    r = f + a
        .map(v => codes[v])
        .filter(v => v !== 0 && v !== undefined)
        .filter((v, i, arr) => i === 0 || v !== arr[i - 1])
        .join('');

    return (r + '000').slice(0, 4);
}

function getConsonantSkeleton(word: string): string {
    const vowels = /[aeiouy]/g;
    const first = word.charAt(0);
    const rest = word.slice(1).replace(vowels, '');
    return first + rest;
}

export function getPhoneticSimilarity(str1: string, str2: string): number {
    const s1 = soundex(str1);
    const s2 = soundex(str2);

    if (s1 === s2) return 0.9;

    const c1 = getConsonantSkeleton(str1);
    const c2 = getConsonantSkeleton(str2);

    if (c1 === c2) return 0.8;

    if (s1.slice(0, 3) === s2.slice(0, 3)) return 0.6;

    return 0;
}

export function getSwapSimilarity(str1: string, str2: string): number {
    if (str1.length !== str2.length) return 0;

    const diffIndices: number[] = [];
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            diffIndices.push(i);
        }
    }

    if (diffIndices.length !== 2) return 0;

    const [i, j] = diffIndices;

    if (Math.abs(i - j) !== 1) return 0;

    if (str1[i] === str2[j] && str1[j] === str2[i]) {
        return 1.0;
    }

    return 0;
}
