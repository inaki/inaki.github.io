<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="alternate icon" href="/favicon.ico" />
	<title>inakito • terminal</title>
	<meta name="description" content="Inaki — Software engineer & builder. Interactive terminal portfolio." />
</svelte:head>

{@render children()}

<Toaster position="top-center" closeButton richColors theme="dark" />
