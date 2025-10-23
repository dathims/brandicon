<script lang="ts">
	import { cn } from '$lib/utils';

	interface ButtonProps {
		variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		class?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		onclick?: () => void;
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'default',
		size = 'default',
		class: className,
		type = 'button',
		disabled = false,
		onclick,
		children,
		...rest
	}: ButtonProps = $props();

	const variants = {
		default: 'bg-blue-600 text-white hover:bg-blue-700 shadow',
		secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
		outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
		ghost: 'hover:bg-gray-100',
		destructive: 'bg-red-600 text-white hover:bg-red-700'
	};

	const sizes = {
		default: 'h-10 px-4 py-2',
		sm: 'h-8 px-3 text-sm',
		lg: 'h-12 px-8 text-lg',
		icon: 'h-10 w-10'
	};
</script>

<button
	{type}
	{disabled}
	{...rest}
	onclick={onclick}
	class={cn(
		'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
		variants[variant],
		sizes[size],
		className
	)}
>
	{#if children}
		{@render children()}
	{/if}
</button>
