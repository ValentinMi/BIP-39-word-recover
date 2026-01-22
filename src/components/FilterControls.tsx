import { Box, Stack, Text, HStack, Button } from "@chakra-ui/react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tooltip } from "@/components/ui/tooltip"
import { SearchFilters } from "@/types"
import { Info } from "lucide-react"

interface FilterControlsProps {
    filters: SearchFilters;
    onChange: (filters: SearchFilters) => void;
}

const ALGORITHM_INFO = {
    dice: {
        label: "Dice",
        description: "Measures character overlap. Best for typos like 'abondon' → 'abandon'"
    },
    hamming: {
        label: "Hamming",
        description: "Counts position differences. Only works for same-length words."
    },
    phonetic: {
        label: "Phonetic",
        description: "Finds similar-sounding words. Catches 'fysical' → 'physical'"
    },
    swap: {
        label: "Swaps",
        description: "Detects letter swaps like 'teh' → 'the'"
    }
} as const;

const THRESHOLD_PRESETS = [
    { label: "Loose", value: 0.3, description: "Shows many results, including distant matches" },
    { label: "Balanced", value: 0.5, description: "Good balance of relevance and coverage" },
    { label: "Strict", value: 0.7, description: "Only very close matches" }
];

function getThresholdDescription(threshold: number): string {
    if (threshold <= 0.35) return "Loose — shows many results including distant matches";
    if (threshold <= 0.55) return "Balanced — good for most typos";
    if (threshold <= 0.75) return "Strict — only close matches shown";
    return "Very strict — exact or near-exact matches only";
}

export function FilterControls({ filters, onChange }: FilterControlsProps) {
    const toggleAlgorithm = (key: keyof SearchFilters['enabledAlgorithms']) => {
        onChange({
            ...filters,
            enabledAlgorithms: {
                ...filters.enabledAlgorithms,
                [key]: !filters.enabledAlgorithms[key]
            }
        });
    };

    const setThreshold = (value: number) => {
        onChange({ ...filters, minThreshold: value });
    };

    return (
        <Stack gap={4} p={4} bg="rgba(10, 20, 35, 0.4)" borderRadius="xl" border="1px solid" borderColor="rgba(255, 255, 255, 0.06)">
            <Box>
                <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">
                        Minimum Similarity: {(filters.minThreshold * 100).toFixed(0)}%
                    </Text>
                    <HStack gap={1}>
                        {THRESHOLD_PRESETS.map((preset) => (
                            <Button
                                key={preset.label}
                                size="xs"
                                variant={Math.abs(filters.minThreshold - preset.value) < 0.05 ? "solid" : "ghost"}
                                colorPalette="brand"
                                onClick={() => setThreshold(preset.value)}
                            >
                                {preset.label}
                            </Button>
                        ))}
                    </HStack>
                </HStack>
                <Slider
                    value={[filters.minThreshold * 100]}
                    onValueChange={(e) => onChange({ ...filters, minThreshold: e.value[0] / 100 })}
                    min={0}
                    max={100}
                    step={5}
                />
                <Text fontSize="xs" color="gray.500" mt={2} fontStyle="italic" opacity={0.8}>
                    {getThresholdDescription(filters.minThreshold)}
                </Text>
            </Box>

            <Stack gap={2}>
                <Text fontSize="sm" fontWeight="medium">Algorithms</Text>
                <HStack wrap="wrap" gap={4}>
                    {(Object.keys(ALGORITHM_INFO) as Array<keyof typeof ALGORITHM_INFO>).map((key) => (
                        <Tooltip
                            key={key}
                            content={ALGORITHM_INFO[key].description}
                            showArrow
                            openDelay={300}
                        >
                            <HStack gap={1} cursor="help">
                                <Switch
                                    checked={filters.enabledAlgorithms[key]}
                                    onCheckedChange={() => toggleAlgorithm(key)}
                                >
                                    {ALGORITHM_INFO[key].label}
                                </Switch>
                                <Info size={12} className="text-gray-500" />
                            </HStack>
                        </Tooltip>
                    ))}
                </HStack>
            </Stack>
        </Stack>
    )
}
