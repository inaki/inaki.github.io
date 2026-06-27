<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(html:has(.resume-page)),
	:global(body:has(.resume-page)) {
		height: auto !important;
		min-height: 100% !important;
		overflow: auto !important;
		font-family: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif !important;
		background: #eceaf3 !important;
		color: #16141f !important;
	}

	:global(body:has(.resume-page)::before),
	:global(body:has(.resume-page)::after) {
		display: none !important;
	}
</style>