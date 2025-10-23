<script lang="ts">
	import { CHROME_ICON_SIZES, type IconSize } from '$lib/utils/image-processor';

	interface IconPreviewProps {
		icons: { [key in IconSize]?: Blob } | null;
	}

	let { icons }: IconPreviewProps = $props();

	let previewUrls = $derived.by(() => {
		if (!icons) return null;

		const urls: { [key in IconSize]?: string } = {};
		for (const size of CHROME_ICON_SIZES) {
			if (icons[size]) {
				urls[size] = URL.createObjectURL(icons[size]!);
			}
		}
		return urls;
	});

	const sizeDescriptions = {
		16: 'Browser toolbar',
		32: 'Retina display',
		48: 'Extensions page',
		128: 'Web Store'
	} as const;
</script>

{#if previewUrls}
	<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
		{#each CHROME_ICON_SIZES as size}
			{#if previewUrls[size]}
				<div class="flex flex-col items-center gap-3">
					<div
						class="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
						style="width: {Math.min(size * 1.5, 120)}px; height: {Math.min(size * 1.5, 120)}px;"
					>
						<img
							src={previewUrls[size]}
							alt="{size}x{size} icon"
							class="w-full h-full object-contain"
							style="image-rendering: pixelated;"
						/>
					</div>
					<div class="text-center">
						<p class="text-sm font-semibold text-gray-700">{size}×{size}</p>
						<p class="text-xs text-gray-500">{sizeDescriptions[size]}</p>
					</div>
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<div class="text-center py-12 text-gray-400">
		<p>No icons generated yet</p>
		<p class="text-sm mt-1">Upload an image or choose a template to get started</p>
	</div>
{/if}
