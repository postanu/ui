import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'

let root = join(fileURLToPath(import.meta.url), '..')

export default defineConfig({
	plugins: [vue()],
	build: {
		outDir: join(root, './dist'),
		lib: {
			entry: join(root, './index.js'),
			formats: ['es'],
			fileName: () => 'index.js'
		},
		rollupOptions: {
			external: [
				'@postanu/twitter-text/regexp',
				'@postanu/twitter-text',
				'@postanu/core',
				'hashtag-regex',
				'vuedraggable',
				'date-fns',
				'nanoid',
				'vue'
			]
		}
	}
})
