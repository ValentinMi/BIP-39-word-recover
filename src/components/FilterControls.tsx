import { Box, Stack, Text, HStack, Button, Flex } from "@chakra-ui/react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tooltip } from "@/components/ui/tooltip"
import { SearchFilters } from "@/types"
import { Info, Sliders } from "lucide-react"

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
    { label: "Loose", value: 0.3 },
    { label: "Balanced", value: 0.5 },
    { label: "Strict", value: 0.7 }
];

function getThresholdDescription(threshold: number): string {
    if (threshold <= 0.35) return "showing many results including distant matches";
    if (threshold <= 0.55) return "balanced — good for most typos";
    if (threshold <= 0.75) return "strict — only close matches shown";
    return "very strict — exact or near-exact matches only";
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
        <Stack
            gap={5}
            p={5}
            bg="rgba(9, 9, 11, 0.6)"
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.04)"
        >
            {/* Header */}
            <HStack gap={2} color="gray.500" fontSize="xs" fontFamily="mono">
                <Sliders size={12} />
                <Text letterSpacing="wider">FILTERS</Text>
            </HStack>

            {/* Threshold Control */}
            <Box>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between"
                    align={{ base: "stretch", sm: "center" }}
                    gap={{ base: 3, sm: 0 }}
                    mb={3}
                >
                    <HStack gap={2}>
                        <Text fontSize="sm" fontWeight="500" color="gray.300">
                            Similarity Threshold
                        </Text>
                        <Text
                            fontSize="sm"
                            fontFamily="mono"
                            color="brand.400"
                            fontWeight="600"
                        >
                            {(filters.minThreshold * 100).toFixed(0)}%
                        </Text>
                    </HStack>
                    <HStack gap={1} justify={{ base: "flex-start", sm: "flex-end" }}>
                        {THRESHOLD_PRESETS.map((preset) => {
                            const isActive = Math.abs(filters.minThreshold - preset.value) < 0.05;
                            return (
                                <Button
                                    key={preset.label}
                                    size="xs"
                                    variant={isActive ? "solid" : "ghost"}
                                    bg={isActive ? "rgba(245, 185, 66, 0.15)" : "transparent"}
                                    color={isActive ? "brand.400" : "gray.500"}
                                    borderColor={isActive ? "rgba(245, 185, 66, 0.3)" : "transparent"}
                                    border="1px solid"
                                    onClick={() => setThreshold(preset.value)}
                                    _hover={{
                                        bg: isActive ? "rgba(245, 185, 66, 0.2)" : "rgba(255, 255, 255, 0.05)",
                                        color: isActive ? "brand.300" : "gray.400"
                                    }}
                                    fontFamily="mono"
                                    fontSize="xs"
                                    px={3}
                                    flex={{ base: 1, sm: "initial" }}
                                >
                                    {preset.label}
                                </Button>
                            );
                        })}
                    </HStack>
                </Flex>

                <Box px={1}>
                    <Slider
                        value={[filters.minThreshold * 100]}
                        onValueChange={(e) => onChange({ ...filters, minThreshold: e.value[0] / 100 })}
                        min={0}
                        max={100}
                        step={5}
                    />
                </Box>

                <Text
                    fontSize="xs"
                    color="gray.600"
                    mt={3}
                    fontFamily="mono"
                    fontStyle="italic"
                >
                    {`// ${getThresholdDescription(filters.minThreshold)}`}
                </Text>
            </Box>

            {/* Divider */}
            <Box h="1px" bg="rgba(255, 255, 255, 0.04)" />

            {/* Algorithm Toggles */}
            <Box>
                <Text fontSize="sm" fontWeight="500" color="gray.300" mb={3}>
                    Matching Algorithms
                </Text>
                <Flex wrap="wrap" gap={{ base: 2, sm: 4 }}>
                    {(Object.keys(ALGORITHM_INFO) as Array<keyof typeof ALGORITHM_INFO>).map((key) => (
                        <Tooltip
                            key={key}
                            content={ALGORITHM_INFO[key].description}
                            showArrow
                            openDelay={300}
                        >
                            <HStack
                                gap={2}
                                cursor="help"
                                p={2}
                                borderRadius="lg"
                                bg={filters.enabledAlgorithms[key] ? "rgba(245, 185, 66, 0.05)" : "transparent"}
                                border="1px solid"
                                borderColor={filters.enabledAlgorithms[key] ? "rgba(245, 185, 66, 0.1)" : "transparent"}
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: "rgba(255, 255, 255, 0.02)"
                                }}
                                flex={{ base: "1 1 calc(50% - 4px)", sm: "0 0 auto" }}
                                minW={{ base: "0", sm: "auto" }}
                            >
                                <Switch
                                    checked={filters.enabledAlgorithms[key]}
                                    onCheckedChange={() => toggleAlgorithm(key)}
                                    size="sm"
                                >
                                    <Text
                                        fontFamily="mono"
                                        fontSize="xs"
                                        color={filters.enabledAlgorithms[key] ? "gray.200" : "gray.500"}
                                    >
                                        {ALGORITHM_INFO[key].label}
                                    </Text>
                                </Switch>
                                <Info size={10} className="text-gray-600" style={{ opacity: 0.5, flexShrink: 0 }} />
                            </HStack>
                        </Tooltip>
                    ))}
                </Flex>
            </Box>
        </Stack>
    )
}
