<script lang="ts">
import settings from '$lib/icons/settings.svg';

let open = false;
</script>

<section class:open>
	<img src={settings} alt="Settings Icon" on:click={() => (open = !open)} height="30" width="30" />
</section>

<style>
section {
	position: absolute;
	visibility: hidden;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	height: 100vh;
	padding: 20px;
}

@media (max-width: 600px) {
}
</style>
