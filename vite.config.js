import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'import.meta.vitest': undefined,
	},
	test: {
		includeSource: ['src/**/*.{js,ts}'],
	},
	ssr: {
		noExternal: ['three', 'troika-three-text'],
	},
});
