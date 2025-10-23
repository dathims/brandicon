<script lang="ts">
	import { templates, getAllCategories, type IconTemplate } from '$lib/utils/templates';
	import Button from '$lib/components/ui/button.svelte';

	interface TemplateGalleryProps {
		onTemplateSelect: (template: IconTemplate, color: string) => void;
	}

	let { onTemplateSelect }: TemplateGalleryProps = $props();

	let selectedCategory = $state<IconTemplate['category']>('tech');
	let selectedColor = $state('#3b82f6');

	const categories = getAllCategories();

	let filteredTemplates = $derived(
		templates.filter((t) => t.category === selectedCategory)
	);

	function renderTemplatePreview(template: IconTemplate): string {
		const canvas = template.render(128, selectedColor);
		return canvas.toDataURL();
	}

	function handleTemplateClick(template: IconTemplate) {
		onTemplateSelect(template, selectedColor);
	}

	const colors = [
		{ name: 'Blue', value: '#3b82f6' },
		{ name: 'Purple', value: '#8b5cf6' },
		{ name: 'Green', value: '#10b981' },
		{ name: 'Orange', value: '#f59e0b' },
		{ name: 'Pink', value: '#ec4899' },
		{ name: 'Cyan', value: '#06b6d4' },
		{ name: 'Indigo', value: '#6366f1' },
		{ name: 'Red', value: '#ef4444' }
	];
</script>

<div class="space-y-6">
	<!-- Category selector -->
	<div>
		<h3 class="text-sm font-semibold text-gray-700 mb-3">Category</h3>
		<div class="flex flex-wrap gap-2">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
						{selectedCategory === category
						? 'bg-blue-600 text-white'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<!-- Color picker -->
	<div>
		<h3 class="text-sm font-semibold text-gray-700 mb-3">Color</h3>
		<div class="flex flex-wrap gap-2">
			{#each colors as color}
				<button
					onclick={() => (selectedColor = color.value)}
					class="w-10 h-10 rounded-lg border-2 transition-all hover:scale-110
						{selectedColor === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'}"
					style="background-color: {color.value}"
					title={color.name}
				></button>
			{/each}
		</div>
	</div>

	<!-- Templates grid -->
	<div>
		<h3 class="text-sm font-semibold text-gray-700 mb-3">Templates</h3>
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each filteredTemplates as template}
				<button
					onclick={() => handleTemplateClick(template)}
					class="group relative border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition-all bg-white"
				>
					<div class="aspect-square mb-3 flex items-center justify-center">
						<img
							src={renderTemplatePreview(template)}
							alt={template.name}
							class="w-full h-full object-contain rounded"
						/>
					</div>
					<h4 class="text-sm font-medium text-gray-900 group-hover:text-blue-600">
						{template.name}
					</h4>
					<p class="text-xs text-gray-500 mt-1">{template.description}</p>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	button {
		cursor: pointer;
	}
</style>
