import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: [
				'./index.ts',
				'./components/queue/index.ts',
				'./components/editor/index.ts',
				'./components/calendar/index.ts'
			],
			formats: ['es']
		},
		rollupOptions: {
			external: [
				'@postanu/core',
				'@postanu/twitter-text',
				'@postanu/twitter-text/regexp',
				'hashtag-regex',
				'vuedraggable',
				'date-fns',
				'nanoid'
			],
			output: {
				dir: './dist',
				exports: 'named'
			}
		},
		copyPublicDir: false,
		sourcemap: true
	}
})
