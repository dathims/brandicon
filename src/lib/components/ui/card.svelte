<script lang="ts">
	import { cn } from '$lib/utils';

	interface CardProps {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className, children }: CardProps = $props();
</script>

<div class={cn('rounded-lg border bg-white shadow-sm', className)}>
	{#if children}
		{@render children()}
	{/if}
</div>
