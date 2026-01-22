import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        tokens: {
            fonts: {
                heading: { value: "var(--font-syne), system-ui, sans-serif" },
                body: { value: "var(--font-body), system-ui, sans-serif" },
                mono: { value: "var(--font-mono), monospace" },
            },
            colors: {
                brand: {
                    50: { value: "#FFF8E7" },
                    100: { value: "#FFEDC4" },
                    200: { value: "#FFE09E" },
                    300: { value: "#FFD078" },
                    400: { value: "#F5B942" },
                    500: { value: "#E5A320" },
                    600: { value: "#C78B15" },
                    700: { value: "#A6720E" },
                    800: { value: "#855B0A" },
                    900: { value: "#644406" },
                },
                accent: {
                    50: { value: "#F0FDF4" },
                    100: { value: "#DCFCE7" },
                    200: { value: "#BBF7D0" },
                    300: { value: "#86EFAC" },
                    400: { value: "#4ADE80" },
                    500: { value: "#22C55E" },
                    600: { value: "#16A34A" },
                    700: { value: "#15803D" },
                    800: { value: "#166534" },
                    900: { value: "#14532D" },
                },
                surface: {
                    50: { value: "#1C1C1F" },
                    100: { value: "#18181B" },
                    200: { value: "#141416" },
                    300: { value: "#101012" },
                    400: { value: "#0C0C0E" },
                    500: { value: "#09090B" },
                    600: { value: "#050506" },
                },
                vault: {
                    amber: { value: "#F5B942" },
                    gold: { value: "#E5A320" },
                    bronze: { value: "#CD7F32" },
                    copper: { value: "#B87333" },
                    charcoal: { value: "#1C1C1F" },
                    obsidian: { value: "#0C0C0E" },
                    steel: { value: "#71717A" },
                    silver: { value: "#A1A1AA" },
                },
            },
        },
        semanticTokens: {
            colors: {
                brand: {
                    solid: { value: "{colors.brand.500}" },
                    contrast: { value: "{colors.brand.100}" },
                    fg: { value: "{colors.brand.400}" },
                    muted: { value: "{colors.brand.100}" },
                    subtle: { value: "{colors.brand.200}" },
                    emphasized: { value: "{colors.brand.300}" },
                    focusRing: { value: "{colors.brand.500}" },
                },
                accent: {
                    solid: { value: "{colors.accent.500}" },
                    contrast: { value: "{colors.accent.100}" },
                    fg: { value: "{colors.accent.400}" },
                    muted: { value: "{colors.accent.100}" },
                    subtle: { value: "{colors.accent.200}" },
                    emphasized: { value: "{colors.accent.300}" },
                    focusRing: { value: "{colors.accent.500}" },
                },
            },
        },
    },
})

export const system = createSystem(defaultConfig, config)
