"use client"

import { useEffect, useRef } from "react"
import { Box } from "@chakra-ui/react"

type AdSize = "728x90" | "300x250" | "320x50" | "native"

interface BitmediaAdProps {
  size?: AdSize
  className?: string
}

const BITMEDIA_ID = process.env.NEXT_PUBLIC_BITMEDIA_ID

const SIZE_STYLES: Record<AdSize, { width: string; height: string }> = {
  "728x90": { width: "728px", height: "90px" },
  "300x250": { width: "300px", height: "250px" },
  "320x50": { width: "320px", height: "50px" },
  "native": { width: "100%", height: "auto" },
}

export function BitmediaAd({ size = "728x90", className }: BitmediaAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    // Load Bitmedia script only once
    if (!scriptLoaded.current && typeof window !== "undefined" && BITMEDIA_ID) {
      const existingScript = document.querySelector('script[src*="bitmedia"]')

      if (!existingScript) {
        const script = document.createElement("script")
        script.src = "https://ad.bitmedia.io/js/adbybm.js"
        script.async = true
        document.body.appendChild(script)
      }

      scriptLoaded.current = true
    }
  }, [])

  // Don't render if no Bitmedia ID configured
  if (!BITMEDIA_ID) {
    return null
  }

  const styles = SIZE_STYLES[size]

  return (
    <Box
      ref={adRef}
      className={className}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH={styles.height}
      bg="rgba(13, 21, 38, 0.4)"
      borderRadius="xl"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.06)"
      overflow="hidden"
      position="relative"
      _before={{
        content: '"Ad"',
        position: "absolute",
        top: 1,
        right: 2,
        fontSize: "10px",
        color: "gray.600",
        textTransform: "uppercase",
        letterSpacing: "wide",
      }}
    >
      {/* Bitmedia ad container */}
      <Box
        className="bm-ad"
        data-bm-id={BITMEDIA_ID}
        data-bm-size={size === "native" ? "responsive" : size}
        maxW={styles.width}
        w="100%"
        minH={styles.height}
      />
    </Box>
  )
}

// Smaller inline ad for between results
export function InlineAd() {
  return (
    <Box gridColumn={{ md: "span 2" }} my={2}>
      <BitmediaAd size="native" />
    </Box>
  )
}
