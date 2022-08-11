<svelte:options immutable={true} />

<script lang="ts">
import type { Cell } from '$lib/game';

export let cell: Cell;
const deathColors = ['rgb(0, 60, 0)', 'rgb(0, 30, 0)'];
</script>

<input
	type="checkbox"
	class="cell"
	class:dead={cell.dead}
	style:--death-color={deathColors[cell.deathTime] ?? 'black'}
	checked={cell.alive}
	aria-checked={cell.alive}
	on:pointerover
	on:pointerdown
/>

<style>
.cell {
	width: 100%;
	height: 100%;
	border: none;
	appearance: none;
	background-color: green;
}

.cell.dead {
	background-color: var(--death-color);
}
</style>
