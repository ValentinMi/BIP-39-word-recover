import { Card, Flex, Box, HStack, Skeleton, SkeletonText } from "@chakra-ui/react"

export function ResultCardSkeleton() {
    return (
        <Card.Root variant="subtle" size="sm">
            <Card.Body>
                <Flex justify="space-between" align="center">
                    <Box flex={1}>
                        <HStack mb={2}>
                            <Skeleton height="24px" width="100px" />
                            <Skeleton height="20px" width="50px" borderRadius="full" />
                        </HStack>
                        <HStack gap={4}>
                            <Skeleton height="14px" width="70px" />
                        </HStack>
                    </Box>
                    <Skeleton height="32px" width="32px" borderRadius="md" />
                </Flex>
            </Card.Body>
        </Card.Root>
    )
}
