<svelte:options immutable={true} />

<script lang="ts" strictEvents>
import type { Cell } from '$lib/game';
import { Mesh, type Position } from '@threlte/core';
import { BoxBufferGeometry, MeshStandardMaterial } from 'three';

export let cell: Cell;
export let position: Position;
const deathColors = ['rgb(0, 30, 0)', 'rgb(0, 15, 0)'];
</script>

<Mesh
	interactive
	on:pointerenter
	on:pointerdown
	on:pointercancel
	castShadow
	geometry={new BoxBufferGeometry(1, 1, 1)}
	{position}
	material={new MeshStandardMaterial({
		color: cell.alive ? 'green' : deathColors[cell.deathTime] ?? 'black',
	})}
/>
