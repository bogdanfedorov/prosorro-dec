import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    // treat all tags with a dash as custom elements
                    isCustomElement: (tag) => tag.includes('-'),
                },
            },
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
    },
})
