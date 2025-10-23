<script lang="ts">
	import { fileToDataUrl } from '$lib/utils/image-processor';
	import { Upload } from 'lucide-svelte';

	interface ImageUploaderProps {
		onImageLoaded: (imageUrl: string) => void;
	}

	let { onImageLoaded }: ImageUploaderProps = $props();

	let isDragging = $state(false);
	let fileInput: HTMLInputElement;

	async function handleFile(file: File) {
		if (!file.type.startsWith('image/')) {
			alert('Please upload an image file');
			return;
		}

		try {
			const dataUrl = await fileToDataUrl(file);
			onImageLoaded(dataUrl);
		} catch (error) {
			console.error('Error loading image:', error);
			alert('Failed to load image');
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;

		const file = e.dataTransfer?.files?.[0];
		if (file) {
			handleFile(file);
		}
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			handleFile(file);
		}
	}

	function openFilePicker() {
		fileInput?.click();
	}
</script>

<div
	role="button"
	tabindex="0"
	class="relative border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
		{isDragging
		? 'border-blue-500 bg-blue-50'
		: 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'}"
	ondrop={handleDrop}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	onclick={openFilePicker}
	onkeydown={(e) => e.key === 'Enter' && openFilePicker()}
>
	<input
		bind:this={fileInput}
		type="file"
		accept="image/*"
		class="hidden"
		onchange={handleInputChange}
	/>

	<div class="flex flex-col items-center gap-4">
		<Upload class="w-12 h-12 text-gray-400" />
		<div>
			<p class="text-lg font-semibold text-gray-700">Drop your image here</p>
			<p class="text-sm text-gray-500 mt-1">or click to browse</p>
		</div>
		<p class="text-xs text-gray-400">Supports PNG, JPG, SVG, and more</p>
	</div>
</div>
