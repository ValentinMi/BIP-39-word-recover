"use client"

import { useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function FAQItem({ question, children, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Box
      bg="rgba(20, 20, 22, 0.6)"
      border="1px solid"
      borderColor={isOpen ? "rgba(245, 185, 66, 0.3)" : "rgba(255, 255, 255, 0.06)"}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        borderColor: isOpen ? "rgba(245, 185, 66, 0.4)" : "rgba(255, 255, 255, 0.12)",
      }}
    >
      <Box
        as="button"
        w="full"
        p={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        textAlign="left"
        bg="transparent"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ bg: "rgba(255, 255, 255, 0.02)" }}
        transition="background 0.2s ease"
      >
        <Text fontWeight="600" fontSize="md" color="white" pr={4}>
          {question}
        </Text>
        <Box
          color="brand.400"
          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
          transition="transform 0.3s ease"
          flexShrink={0}
        >
          <ChevronDown size={20} />
        </Box>
      </Box>
      <Box
        overflow="hidden"
        maxH={isOpen ? "1000px" : "0"}
        opacity={isOpen ? 1 : 0}
        transition="all 0.4s ease"
      >
        <Box
          px={5}
          pb={5}
          pt={0}
          color="gray.400"
          fontSize="sm"
          lineHeight="tall"
          borderTop="1px solid"
          borderColor="rgba(255, 255, 255, 0.04)"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
