<script lang="ts">
import Board from '$lib/components/Board.svelte';
import Controls from '$lib/components/Controls.svelte';
import Settings from '$lib/components/Settings.svelte';
import { Game } from '$lib/game';
import { clock } from '$lib/stores';

let game = new Game(20);
let interval = 200;
$: gameClock = clock(interval);

$: if ($gameClock && game.playing) {
	game = game.increment();
}

$: console.log($gameClock, game.playing);
</script>

<Controls bind:game bind:interval />
<Settings />
<Board bind:game />
