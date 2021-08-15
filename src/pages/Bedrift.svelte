<script>
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	onMount(() => {
		show = true;
	});

	let show = false;
</script>

<svelte:head>
	<title>For Bedrifter - Beta</title>
	<meta
		name="description"
		content="Info til bedrifter som ønsker å komme i kontakt med Beta"
	/>
</svelte:head>

<main>
	{#if show}
		<div class="card" in:fly={{ y: 20 }}>
			<h2>For bedrifter</h2>
			<p>Her er det mye nyttig info gitt.</p>
		</div>
	{/if}
</main>
