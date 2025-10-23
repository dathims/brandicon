<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { Eraser, Paintbrush, Square, Circle, Type, Undo, Redo } from 'lucide-svelte';
	import { onMount } from 'svelte';

	interface CanvasEditorProps {
		initialImage?: string;
		size?: number;
		onSave: (dataUrl: string) => void;
	}

	let { initialImage, size = 512, onSave }: CanvasEditorProps = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let isDrawing = $state(false);
	let tool = $state<'pen' | 'eraser' | 'rectangle' | 'circle' | 'text'>('pen');
	let color = $state('#000000');
	let lineWidth = $state(4);

	let history: ImageData[] = [];
	let historyStep = -1;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, size, size);

		if (initialImage) {
			const img = new Image();
			img.onload = () => {
				ctx.drawImage(img, 0, 0, size, size);
				saveState();
			};
			img.src = initialImage;
		} else {
			saveState();
		}
	});

	function saveState() {
		historyStep++;
		if (historyStep < history.length) {
			history = history.slice(0, historyStep);
		}
		history.push(ctx.getImageData(0, 0, size, size));
	}

	function undo() {
		if (historyStep > 0) {
			historyStep--;
			ctx.putImageData(history[historyStep], 0, 0);
		}
	}

	function redo() {
		if (historyStep < history.length - 1) {
			historyStep++;
			ctx.putImageData(history[historyStep], 0, 0);
		}
	}

	function startDrawing(e: MouseEvent) {
		isDrawing = true;
		const rect = canvas.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * size;
		const y = ((e.clientY - rect.top) / rect.height) * size;

		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	function draw(e: MouseEvent) {
		if (!isDrawing) return;

		const rect = canvas.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * size;
		const y = ((e.clientY - rect.top) / rect.height) * size;

		ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		ctx.lineTo(x, y);
		ctx.stroke();
	}

	function stopDrawing() {
		if (isDrawing) {
			isDrawing = false;
			saveState();
		}
	}

	function handleSave() {
		const dataUrl = canvas.toDataURL('image/png');
		onSave(dataUrl);
	}

	function clear() {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, size, size);
		saveState();
	}
</script>

<div class="space-y-4">
	<!-- Toolbar -->
	<div class="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-lg border">
		<div class="flex gap-2">
			<Button
				size="icon"
				variant={tool === 'pen' ? 'default' : 'outline'}
				onclick={() => (tool = 'pen')}
			>
				{#snippet children()}
					<Paintbrush class="w-4 h-4" />
				{/snippet}
			</Button>
			<Button
				size="icon"
				variant={tool === 'eraser' ? 'default' : 'outline'}
				onclick={() => (tool = 'eraser')}
			>
				{#snippet children()}
					<Eraser class="w-4 h-4" />
				{/snippet}
			</Button>
		</div>

		<div class="h-8 w-px bg-gray-300"></div>

		<div class="flex gap-2">
			<Button size="icon" variant="outline" onclick={undo}>
				{#snippet children()}
					<Undo class="w-4 h-4" />
				{/snippet}
			</Button>
			<Button size="icon" variant="outline" onclick={redo}>
				{#snippet children()}
					<Redo class="w-4 h-4" />
				{/snippet}
			</Button>
		</div>

		<div class="h-8 w-px bg-gray-300"></div>

		<div class="flex items-center gap-2">
			<label for="color" class="text-sm font-medium text-gray-700">Color:</label>
			<input
				id="color"
				type="color"
				bind:value={color}
				class="w-10 h-10 rounded border cursor-pointer"
			/>
		</div>

		<div class="flex items-center gap-2">
			<label for="lineWidth" class="text-sm font-medium text-gray-700">Size:</label>
			<input
				id="lineWidth"
				type="range"
				min="1"
				max="20"
				bind:value={lineWidth}
				class="w-24"
			/>
			<span class="text-sm text-gray-600 w-8">{lineWidth}px</span>
		</div>

		<div class="h-8 w-px bg-gray-300"></div>

		<Button variant="outline" onclick={clear}>
			{#snippet children()}
				Clear
			{/snippet}
		</Button>

		<Button onclick={handleSave}>
			{#snippet children()}
				Use This Design
			{/snippet}
		</Button>
	</div>

	<!-- Canvas -->
	<div class="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
		<canvas
			bind:this={canvas}
			width={size}
			height={size}
			class="w-full max-w-2xl cursor-crosshair"
			onmousedown={startDrawing}
			onmousemove={draw}
			onmouseup={stopDrawing}
			onmouseleave={stopDrawing}
		></canvas>
	</div>
</div>

<style>
	canvas {
		image-rendering: crisp-edges;
		image-rendering: -moz-crisp-edges;
		image-rendering: -webkit-crisp-edges;
	}
</style>
