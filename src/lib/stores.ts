import { readable } from 'svelte/store';

export const clock = (interval: number) =>
	readable(performance.now(), (set) => {
		const intervalRef = setInterval(() => set(performance.now()), interval);
		return () => clearInterval(intervalRef);
	});
