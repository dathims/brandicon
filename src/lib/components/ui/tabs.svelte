<script lang="ts">
	import { cn } from '$lib/utils';

	interface TabsProps {
		tabs: { id: string; label: string }[];
		activeTab?: string;
		onTabChange?: (tabId: string) => void;
		class?: string;
	}

	let { tabs, activeTab = tabs[0]?.id, onTabChange, class: className }: TabsProps = $props();

	let currentTab = $state(activeTab);

	function handleTabClick(tabId: string) {
		currentTab = tabId;
		onTabChange?.(tabId);
	}
</script>

<div class={cn('w-full', className)}>
	<div class="border-b border-gray-200">
		<nav class="-mb-px flex space-x-8" aria-label="Tabs">
			{#each tabs as tab}
				<button
					onclick={() => handleTabClick(tab.id)}
					class={cn(
						'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors',
						currentTab === tab.id
							? 'border-blue-500 text-blue-600'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
					)}
				>
					{tab.label}
				</button>
			{/each}
		</nav>
	</div>
</div>

<style>
	button {
		background: none;
		cursor: pointer;
	}
</style>
