import { Card, Flex, Box, HStack, Skeleton } from "@chakra-ui/react"

export function ResultCardSkeleton() {
    return (
        <Card.Root
            variant="subtle"
            size="sm"
            bg="rgba(12, 12, 14, 0.6)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.04)"
            borderRadius="xl"
            overflow="hidden"
        >
            <Card.Body p={5}>
                <Flex justify="space-between" align="flex-start" gap={4}>
                    <Box flex={1}>
                        <HStack mb={3} gap={3}>
                            <Skeleton height="24px" width="100px" borderRadius="md" />
                            <Skeleton height="18px" width="50px" borderRadius="md" />
                        </HStack>
                        <HStack gap={4}>
                            <Skeleton height="14px" width="70px" borderRadius="sm" />
                            <Skeleton height="14px" width="50px" borderRadius="sm" />
                        </HStack>
                    </Box>
                    <Skeleton height="32px" width="32px" borderRadius="md" />
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}
