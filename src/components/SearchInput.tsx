import { Input, IconButton, HStack, Text, Box } from "@chakra-ui/react"
import { X, Search } from "lucide-react"
import { InputGroup } from "@/components/ui/input-group"

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    isLoading?: boolean;
    isTyping?: boolean;
}

export function SearchInput({ value, onChange, isLoading, isTyping }: SearchInputProps) {
    return (
        <Box w="full">
            <InputGroup
                w="full"
                startElement={<Search size={20} className="text-gray-400" />}
                endElement={
                    value ? (
                        <HStack gap={2}>
                            {isTyping && (
                                <Box
                                    w={2}
                                    h={2}
                                    borderRadius="full"
                                    bg="brand.400"
                                    animation="pulse 1s ease-in-out infinite"
                                    css={{
                                        "@keyframes pulse": {
                                            "0%, 100%": { opacity: 1, boxShadow: "0 0 8px rgba(0, 217, 255, 0.8)" },
                                            "50%": { opacity: 0.4, boxShadow: "0 0 4px rgba(0, 217, 255, 0.4)" }
                                        }
                                    }}
                                />
                            )}
                            <IconButton
                                aria-label="Clear search (Esc)"
                                variant="ghost"
                                size="xs"
                                onClick={() => onChange('')}
                            >
                                <X size={16} />
                            </IconButton>
                        </HStack>
                    ) : null
                }
            >
                <Input
                    placeholder="Type a misspelled word..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    size="lg"
                    variant="subtle"
                    fontSize="lg"
                    autoFocus
                    bg="rgba(10, 20, 35, 0.6)"
                    border="1px solid"
                    borderColor="rgba(0, 217, 255, 0.2)"
                    color="white"
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                        bg: "rgba(10, 20, 35, 0.8)",
                        borderColor: "brand.500",
                        boxShadow: "0 0 20px rgba(0, 217, 255, 0.15), inset 0 0 20px rgba(0, 217, 255, 0.05)"
                    }}
                    _hover={{
                        borderColor: "rgba(0, 217, 255, 0.4)"
                    }}
                    transition="all 0.2s ease"
                />
            </InputGroup>
            <HStack justify="flex-end" mt={2} gap={3}>
                {isTyping && (
                    <Text fontSize="xs" color="brand.500" fontWeight="medium">
                        Typing...
                    </Text>
                )}
                <Text fontSize="xs" color="gray.500">
                    <Text as="span" color="brand.400" fontWeight="medium">{value.length}</Text> characters
                </Text>
            </HStack>
        </Box>
    )
}
