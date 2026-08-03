<script lang="ts">
	import {
		DEFAULT_OG_IMAGE_ALT,
		resolveOgImage,
		SITE_KEYWORDS
	} from '$lib/seo';
	import { SITE_NAME } from '$lib/site';

	let {
		title,
		description,
		url,
		type = 'website',
		image = null,
		imageAlt = DEFAULT_OG_IMAGE_ALT,
		jsonLd = null,
		noindex = false,
		articlePublished = null,
		articleModified = null,
		keywords = true
	}: {
		title: string;
		description: string;
		url: string;
		type?: 'website' | 'article' | 'profile';
		image?: string | null;
		imageAlt?: string;
		jsonLd?: Record<string, unknown> | null;
		noindex?: boolean;
		articlePublished?: string | null;
		articleModified?: string | null;
		keywords?: boolean;
	} = $props();

	const ogImage = $derived(resolveOgImage(image));
	const jsonLdString = $derived(jsonLd ? JSON.stringify(jsonLd) : null);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords}
		<meta name="keywords" content={SITE_KEYWORDS} />
	{/if}
	<link rel="canonical" href={url} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large" />
	{/if}
	<meta name="author" content="Iñaki Aranzadi" />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:locale" content="en_US" />

	{#if articlePublished}
		<meta property="article:published_time" content={articlePublished} />
	{/if}
	{#if articleModified}
		<meta property="article:modified_time" content={articleModified} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={imageAlt} />

	{#if jsonLdString}
		{@html `<script type="application/ld+json">${jsonLdString}</script>`}
	{/if}
</svelte:head>
