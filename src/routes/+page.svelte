<script lang="ts">
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import IconPreview from '$lib/components/IconPreview.svelte';
	import TemplateGallery from '$lib/components/TemplateGallery.svelte';
	import CanvasEditor from '$lib/components/CanvasEditor.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card.svelte';
	import {
		generateAllIconSizes,
		type IconSize,
		CHROME_ICON_SIZES
	} from '$lib/utils/image-processor';
	import { exportAsZip, exportIndividualIcons, generateManifestSnippet } from '$lib/utils/export';
	import type { IconTemplate } from '$lib/utils/templates';
	import { Download, Code2, Image, Palette, Edit } from 'lucide-svelte';

	let currentMode = $state<'upload' | 'template' | 'editor'>('upload');
	let sourceImage = $state<string | null>(null);
	let generatedIcons = $state<{ [key in IconSize]?: Blob } | null>(null);
	let isGenerating = $state(false);
	let showManifest = $state(false);

	async function handleImageUploaded(imageUrl: string) {
		sourceImage = imageUrl;
		await generateIcons(imageUrl);
	}

	async function handleTemplateSelected(template: IconTemplate, color: string) {
		const canvas = template.render(512, color);
		sourceImage = canvas.toDataURL();
		await generateIcons(sourceImage);
	}

	async function handleEditorSave(dataUrl: string) {
		sourceImage = dataUrl;
		await generateIcons(dataUrl);
	}

	async function generateIcons(imageUrl: string) {
		isGenerating = true;
		try {
			const icons = await generateAllIconSizes(imageUrl);
			generatedIcons = icons;
		} catch (error) {
			console.error('Error generating icons:', error);
			alert('Failed to generate icons. Please try again.');
		} finally {
			isGenerating = false;
		}
	}

	async function handleExportZip() {
		if (!generatedIcons) return;
		await exportAsZip(generatedIcons as { [key in IconSize]: Blob }, {
			includeManifest: true,
			projectName: 'chrome-extension-icons'
		});
	}

	async function handleExportIndividual() {
		if (!generatedIcons) return;
		await exportIndividualIcons(generatedIcons as { [key in IconSize]: Blob });
	}

	function toggleManifest() {
		showManifest = !showManifest;
	}

	const manifestSnippet = $derived(generateManifestSnippet());
</script>

<svelte:head>
	<title>BrandIcon - Chrome Extension Icon Generator</title>
	<meta
		name="description"
		content="Generate professional Chrome extension icons in all required sizes"
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="border-b bg-white sticky top-0 z-50">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-bold text-gray-900">
						BrandIcon
					</h1>
				</div>
				<div class="flex gap-2">
					<a
						href="https://developer.chrome.com/docs/extensions/mv3/manifest/icons/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-gray-600 hover:text-gray-900"
					>
						Chrome Icon Guide
					</a>
				</div>
			</div>
		</div>
	</header>

	<main class="container mx-auto px-4 py-12">
		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Left Panel - Input -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Mode Selector -->
				<div class="bg-white border-b mb-6 -mx-4 px-4">
					<div class="flex gap-2 overflow-x-auto py-3">
						<button
							onclick={() => (currentMode = 'upload')}
							class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors {currentMode === 'upload'
								? 'bg-gray-900 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							Upload Image
						</button>
						<button
							onclick={() => (currentMode = 'template')}
							class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors {currentMode === 'template'
								? 'bg-gray-900 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							Templates
						</button>
						<button
							onclick={() => (currentMode = 'editor')}
							class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors {currentMode === 'editor'
								? 'bg-gray-900 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							Canvas Editor
						</button>
					</div>
				</div>

				<Card class="p-6">
					{#snippet children()}

						<!-- Content based on mode -->
						{#if currentMode === 'upload'}
							<ImageUploader onImageLoaded={handleImageUploaded} />
						{:else if currentMode === 'template'}
							<TemplateGallery onTemplateSelect={handleTemplateSelected} />
						{:else if currentMode === 'editor'}
							<CanvasEditor initialImage={sourceImage} onSave={handleEditorSave} />
						{/if}
					{/snippet}
				</Card>

				<!-- Preview -->
				<Card class="p-6">
					{#snippet children()}
						<div class="flex items-center justify-between mb-6">
							<h2 class="text-xl font-semibold text-gray-900">Generated Icons</h2>
							{#if isGenerating}
								<span class="text-sm text-gray-600 animate-pulse">Generating...</span>
							{/if}
						</div>
						<IconPreview icons={generatedIcons} />
					{/snippet}
				</Card>
			</div>

			<!-- Right Panel - Export -->
			<div class="space-y-6">
				<Card class="p-6 sticky top-24">
					{#snippet children()}
						<h2 class="text-xl font-semibold text-gray-900 mb-6">Export Options</h2>

						<div class="space-y-3">
							<Button
								class="w-full"
								disabled={!generatedIcons}
								onclick={handleExportZip}
							>
								{#snippet children()}
									<Download class="w-4 h-4 mr-2" />
									Download ZIP Package
								{/snippet}
							</Button>

							<Button
								variant="outline"
								class="w-full"
								disabled={!generatedIcons}
								onclick={handleExportIndividual}
							>
								{#snippet children()}
									<Image class="w-4 h-4 mr-2" />
									Download Individual Icons
								{/snippet}
							</Button>

							<Button
								variant="outline"
								class="w-full"
								onclick={toggleManifest}
							>
								{#snippet children()}
									<Code2 class="w-4 h-4 mr-2" />
									{showManifest ? 'Hide' : 'Show'} Manifest Snippet
								{/snippet}
							</Button>
						</div>

						{#if showManifest}
							<div class="mt-6">
								<h3 class="text-sm font-semibold text-gray-700 mb-2">manifest.json snippet:</h3>
								<pre
									class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto"
								><code>{manifestSnippet}</code></pre>
								<Button
									size="sm"
									variant="outline"
									class="w-full mt-2"
									onclick={() => {
										navigator.clipboard.writeText(manifestSnippet);
										alert('Copied to clipboard!');
									}}
								>
									{#snippet children()}
										Copy to Clipboard
									{/snippet}
								</Button>
							</div>
						{/if}

						<!-- Info Card -->
						<div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
							<h3 class="text-sm font-semibold text-gray-900 mb-2">Icon Sizes Info</h3>
							<ul class="text-xs text-gray-700 space-y-1">
								<li>• <strong>16×16:</strong> Browser toolbar</li>
								<li>• <strong>32×32:</strong> Retina displays</li>
								<li>• <strong>48×48:</strong> Extensions page</li>
								<li>• <strong>128×128:</strong> Chrome Web Store</li>
							</ul>
						</div>
					{/snippet}
				</Card>
			</div>
		</div>

		<!-- Features Section -->
		<div class="mt-16 grid md:grid-cols-3 gap-8">
			<div class="text-center">
				<div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
					<Image class="w-6 h-6 text-gray-700" />
				</div>
				<h3 class="font-semibold text-gray-900 mb-2">Upload & Resize</h3>
				<p class="text-sm text-gray-600">
					Upload any image and automatically generate all required Chrome extension icon sizes
				</p>
			</div>
			<div class="text-center">
				<div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
					<Palette class="w-6 h-6 text-gray-700" />
				</div>
				<h3 class="font-semibold text-gray-900 mb-2">Professional Templates</h3>
				<p class="text-sm text-gray-600">
					Choose from a variety of pre-designed templates and customize colors
				</p>
			</div>
			<div class="text-center">
				<div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
					<Edit class="w-6 h-6 text-gray-700" />
				</div>
				<h3 class="font-semibold text-gray-900 mb-2">Canvas Editor</h3>
				<p class="text-sm text-gray-600">
					Draw and edit your icons directly in the browser with powerful tools
				</p>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="border-t bg-white mt-20">
		<div class="container mx-auto px-4 py-8 text-center text-sm text-gray-600">
			<p>
				Built with <a href="https://kit.svelte.dev" class="text-gray-700 hover:text-gray-900">SvelteKit</a>
				| Open Source on
				<a href="https://github.com/dathims/brandicon" class="text-gray-700 hover:text-gray-900">GitHub</a>
			</p>
		</div>
	</footer>
</div>
