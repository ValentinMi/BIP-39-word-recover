import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    50: { value: "#E6FFFA" },
                    100: { value: "#B2F5EA" },
                    200: { value: "#81E6D9" },
                    300: { value: "#4FD1C5" },
                    400: { value: "#38B2AC" },
                    500: { value: "#00D9FF" },
                    600: { value: "#00B8D9" },
                    700: { value: "#0097A7" },
                    800: { value: "#00838F" },
                    900: { value: "#006064" },
                },
                accent: {
                    50: { value: "#FFF8E1" },
                    100: { value: "#FFECB3" },
                    200: { value: "#FFE082" },
                    300: { value: "#FFD54F" },
                    400: { value: "#FFCA28" },
                    500: { value: "#FFC107" },
                    600: { value: "#FFB300" },
                    700: { value: "#FFA000" },
                    800: { value: "#FF8F00" },
                    900: { value: "#FF6F00" },
                },
                surface: {
                    50: { value: "#1a1f2e" },
                    100: { value: "#151926" },
                    200: { value: "#10131c" },
                    300: { value: "#0c0e14" },
                    400: { value: "#080a0f" },
                    500: { value: "#050709" },
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
            },
        },
    },
})

export const system = createSystem(defaultConfig, config)
