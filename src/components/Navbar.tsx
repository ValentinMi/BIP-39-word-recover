"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Box, Container, HStack, Text, Flex } from "@chakra-ui/react"
import { BookOpen, Github } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg="rgba(9, 9, 11, 0.8)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.06)"
    >
      <Container maxW="container.lg">
        <HStack justify="space-between" h={16}>
          {/* Logo */}
          <Link href="/">
            <HStack
              gap={2.5}
              color="white"
              _hover={{ color: "brand.400" }}
              transition="color 0.2s ease"
            >
              <Flex
                w={8}
                h={8}
                bg="linear-gradient(135deg, rgba(245, 185, 66, 0.2) 0%, rgba(245, 185, 66, 0.05) 100%)"
                border="1px solid"
                borderColor="rgba(245, 185, 66, 0.3)"
                borderRadius="lg"
                align="center"
                justify="center"
                color="brand.400"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L4 6v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </Flex>
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="md"
                letterSpacing="-0.02em"
              >
                BIP39
                <Text as="span" color="brand.400"> Recover</Text>
              </Text>
            </HStack>
          </Link>

          {/* Navigation Links */}
          <HStack gap={1}>
            <Link href="/">
              <Box
                px={4}
                py={2}
                borderRadius="lg"
                fontSize="sm"
                fontWeight="500"
                color={isActive("/") ? "brand.400" : "gray.400"}
                bg={isActive("/") ? "rgba(245, 185, 66, 0.1)" : "transparent"}
                _hover={{
                  color: isActive("/") ? "brand.400" : "white",
                  bg: isActive("/") ? "rgba(245, 185, 66, 0.1)" : "rgba(255, 255, 255, 0.05)",
                }}
                transition="all 0.2s ease"
              >
                Recovery Tool
              </Box>
            </Link>

            <Link href="/faq">
              <HStack
                gap={1.5}
                px={4}
                py={2}
                borderRadius="lg"
                fontSize="sm"
                fontWeight="500"
                color={isActive("/faq") ? "brand.400" : "gray.400"}
                bg={isActive("/faq") ? "rgba(245, 185, 66, 0.1)" : "transparent"}
                _hover={{
                  color: isActive("/faq") ? "brand.400" : "white",
                  bg: isActive("/faq") ? "rgba(245, 185, 66, 0.1)" : "rgba(255, 255, 255, 0.05)",
                }}
                transition="all 0.2s ease"
              >
                <BookOpen size={15} />
                <Text>FAQ</Text>
              </HStack>
            </Link>

            {/* GitHub Link */}
            <Link
              href="https://github.com/ValentinMi/BIP-39-word-recover"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Flex
                w={9}
                h={9}
                align="center"
                justify="center"
                borderRadius="lg"
                color="gray.500"
                _hover={{
                  color: "white",
                  bg: "rgba(255, 255, 255, 0.05)",
                }}
                transition="all 0.2s ease"
                ml={2}
              >
                <Github size={18} />
              </Flex>
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}
