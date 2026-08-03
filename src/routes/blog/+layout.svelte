<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
	<link rel="alternate" type="application/rss+xml" title="Iñaki Aranzadi — Writing" href="/blog/rss.xml" />
</svelte:head>

{@render children()}

<style>
	/* Scrollable reading surface (home terminal locks overflow). Keep atmosphere. */
	:global(html:has(.blog-page)),
	:global(body:has(.blog-page)) {
		height: auto !important;
		min-height: 100% !important;
		overflow: auto !important;
	}
</style>
