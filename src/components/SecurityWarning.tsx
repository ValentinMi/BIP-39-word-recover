import { Box, Flex, Text } from "@chakra-ui/react"
import { ShieldAlert } from "lucide-react"

export function SecurityWarning() {
    return (
        <Box
            bg="rgba(251, 191, 36, 0.08)"
            border="1px solid"
            borderColor="rgba(251, 191, 36, 0.2)"
            borderRadius="xl"
            p={4}
            mb={6}
        >
            <Flex gap={3} align="flex-start">
                <Box color="yellow.400" mt={0.5}>
                    <ShieldAlert size={20} />
                </Box>
                <Box>
                    <Text fontWeight="semibold" color="yellow.400" mb={1}>
                        Security Warning
                    </Text>
                    <Text fontSize="sm" color="gray.300" lineHeight="tall">
                        Never enter your full 12 or 24-word seed phrase on any website.
                        Only use this tool to check{" "}
                        <Text as="span" fontWeight="semibold" color="yellow.300">
                            one word at a time
                        </Text>
                        . All processing happens locally in your browser.
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}
