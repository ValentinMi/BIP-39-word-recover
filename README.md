# BIP39 Word Recover

A client-side tool to help recover the correct BIP39 seed phrase word from a typo or misspelling. All processing happens locally in your browser - no data is ever sent to a server.

## Features

- **Multiple Similarity Algorithms**: Uses Dice coefficient, Hamming distance, phonetic matching, and adjacent character swap detection
- **Adjustable Threshold**: Filter results by minimum similarity score
- **Keyboard Shortcuts**: `Esc` to clear, `Cmd/Ctrl + 1-9` to copy results
- **Character Diff Highlighting**: See exactly which characters differ from your input
- **100% Client-Side**: Your seed phrase words never leave your browser

## Security Warning

Never enter your full 12 or 24-word seed phrase on any website. Only use this tool to check **one word at a time**.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

- [Next.js 16](https://nextjs.org) with App Router
- [React 19](https://react.dev)
- [Chakra UI v3](https://chakra-ui.com)
- TypeScript

## How It Works

1. Enter a misspelled word in the search box
2. The tool compares your input against the 2048 BIP39 wordlist
3. Results are ranked by weighted algorithm scores:
   - **Dice**: Character overlap similarity (weight: 0.8)
   - **Hamming**: Position-based differences for same-length words (weight: 0.6)
   - **Phonetic**: Sound-based matching using Soundex (weight: 0.7)
   - **Swap**: Detects adjacent character transpositions (weight: 0.95)
4. Click any result to copy the correct word

## Project Structure

```
src/
├── app/
│   └── page.tsx          # Main page component
├── components/
│   ├── SearchInput.tsx   # Search input with typing indicator
│   ├── FilterControls.tsx # Similarity threshold & algorithm toggles
│   ├── ResultCard.tsx    # Individual result display
│   ├── ResultsList.tsx   # Results grid with loading states
│   ├── SecurityWarning.tsx
│   └── OnboardingPanel.tsx
├── lib/
│   ├── search-engine.ts  # Core search logic
│   ├── similarity-algorithms.ts # Algorithm implementations
│   └── hooks/
│       └── useWordSearch.ts # Search state management
├── theme/
│   └── index.ts          # Chakra UI theme configuration
└── types/
    └── index.ts          # TypeScript type definitions
```

## License

MIT
