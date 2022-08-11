<script lang="ts">
import Board from '$lib/components/Board.svelte';
import Controls from '$lib/components/Controls.svelte';
import Settings from '$lib/components/Settings.svelte';
import { Game } from '$lib/game';
import { clock } from '$lib/stores';
import { MOUSE } from 'three';
import { DEG2RAD } from 'three/src/math/MathUtils';
import {
	AmbientLight,
	Canvas,
	DirectionalLight,
	OrbitControls,
	PerspectiveCamera,
} from '@threlte/core';
import { spring } from 'svelte/motion';

const scale = spring(1);

let game = new Game(20);
let interval = 200;
let drawing = false;
let spacing = false;
$: gameClock = clock(interval);

$: if ($gameClock && game.playing) {
	game = game.increment();
}
</script>

<Controls bind:game bind:interval bind:spacing />
<Settings />

<main>
	<Canvas>
		<PerspectiveCamera position={{ x: 0, y: 10, z: 0 }} fov={24}>
			<OrbitControls
				maxPolarAngle={DEG2RAD * 80}
				autoRotate={false}
				target={{ y: 0.5 }}
				maxZoom={1}
				minZoom={0.5}
				enableRotate={!drawing}
				mouseButtons={{
					LEFT: MOUSE.LEFT,
					RIGHT: MOUSE.RIGHT,
					MIDDLE: MOUSE.MIDDLE,
				}}
			/>
		</PerspectiveCamera>

		<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
		<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
		<AmbientLight intensity={0.2} />

		<Board {game} bind:drawing {spacing} />
	</Canvas>
</main>

<style>
main {
	height: 100%;
	width: 100%;
}
</style>
