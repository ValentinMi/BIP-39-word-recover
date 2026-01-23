import { Input, IconButton, Box } from "@chakra-ui/react"
import { X, Search } from "lucide-react"
import { InputGroup } from "@/components/ui/input-group"

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    isSearching?: boolean;
}

export function SearchInput({ value, onChange, isSearching }: SearchInputProps) {
    return (
        <Box w="full" position="relative">
            <InputGroup
                w="full"
                startOffset="-8px"
                startElement={
                    <Box pl={{ base: 3, sm: 4 }} color={value ? "brand.400" : "gray.500"} transition="color 0.2s ease">
                        <Search size={20} strokeWidth={2.5} />
                    </Box>
                }
                endElement={
                    value ? (
                        <IconButton
                            aria-label="Clear search (Esc)"
                            variant="ghost"
                            size="sm"
                            onClick={() => onChange('')}
                            color="gray.500"
                            mr={1}
                            _hover={{ color: "white", bg: "whiteAlpha.100" }}
                        >
                            <X size={18} />
                        </IconButton>
                    ) : null
                }
            >
                <Input
                    placeholder="Type a misspelled word..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    size="lg"
                    variant="subtle"
                    fontSize={{ base: "md", sm: "lg" }}
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    bg="rgba(20, 20, 22, 0.6)"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.08)"
                    color="white"
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                        bg: "rgba(20, 20, 22, 0.9)",
                        borderColor: "rgba(245, 185, 66, 0.5)",
                        boxShadow: "0 0 0 3px rgba(245, 185, 66, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)"
                    }}
                    _hover={{
                        borderColor: "rgba(255, 255, 255, 0.15)"
                    }}
                    transition="all 0.2s ease"
                    borderRadius="2xl"
                    h={{ base: 14, sm: 16 }}
                    ps={{ base: "56px", sm: "72px" }}
                    fontWeight="400"
                />
            </InputGroup>

            {/* Subtle loading indicator */}
            {isSearching && (
                <Box
                    position="absolute"
                    bottom={0}
                    left="50%"
                    transform="translateX(-50%)"
                    w="60%"
                    h="2px"
                    borderRadius="full"
                    overflow="hidden"
                >
                    <Box
                        w="30%"
                        h="full"
                        bg="linear-gradient(90deg, transparent, var(--brand-amber), transparent)"
                        className="animate-shimmer"
                    />
                </Box>
            )}
        </Box>
    )
}
