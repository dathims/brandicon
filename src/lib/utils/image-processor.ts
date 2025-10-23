/**
 * Chrome Extension Icon Sizes
 */
export const CHROME_ICON_SIZES = [16, 32, 48, 128] as const;
export type IconSize = (typeof CHROME_ICON_SIZES)[number];

/**
 * Resize an image to specified dimensions using canvas
 */
export async function resizeImage(
	imageUrl: string,
	targetSize: number
): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				reject(new Error('Failed to get canvas context'));
				return;
			}

			canvas.width = targetSize;
			canvas.height = targetSize;

			// Use high-quality image smoothing
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';

			// Draw the image centered and scaled to fit
			const scale = Math.min(targetSize / img.width, targetSize / img.height);
			const x = (targetSize - img.width * scale) / 2;
			const y = (targetSize - img.height * scale) / 2;

			ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

			canvas.toBlob(
				(blob) => {
					if (blob) {
						resolve(blob);
					} else {
						reject(new Error('Failed to create blob'));
					}
				},
				'image/png',
				1.0
			);
		};

		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = imageUrl;
	});
}

/**
 * Generate all Chrome extension icon sizes from a source image
 */
export async function generateAllIconSizes(sourceImage: string): Promise<{
	[key in IconSize]: Blob;
}> {
	const results = await Promise.all(
		CHROME_ICON_SIZES.map(async (size) => ({
			size,
			blob: await resizeImage(sourceImage, size)
		}))
	);

	return results.reduce(
		(acc, { size, blob }) => {
			acc[size] = blob;
			return acc;
		},
		{} as { [key in IconSize]: Blob }
	);
}

/**
 * Convert a File to a data URL
 */
export function fileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

/**
 * Create a blank canvas with optional background color
 */
export function createBlankCanvas(
	size: number,
	backgroundColor = '#ffffff'
): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;

	const ctx = canvas.getContext('2d');
	if (ctx) {
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, size, size);
	}

	return canvas;
}

/**
 * Download a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
