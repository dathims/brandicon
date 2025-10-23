export interface IconTemplate {
	id: string;
	name: string;
	category: 'tech' | 'business' | 'social' | 'gaming' | 'tools' | 'creative';
	description: string;
	render: (size: number, customColor?: string) => HTMLCanvasElement;
}

/**
 * Create a gradient background
 */
function createGradient(
	ctx: CanvasRenderingContext2D,
	size: number,
	color1: string,
	color2: string
) {
	const gradient = ctx.createLinearGradient(0, 0, size, size);
	gradient.addColorStop(0, color1);
	gradient.addColorStop(1, color2);
	return gradient;
}

/**
 * Available icon templates
 */
export const templates: IconTemplate[] = [
	{
		id: 'gradient-circle',
		name: 'Gradient Circle',
		category: 'tech',
		description: 'Modern gradient circle design',
		render: (size: number, customColor = '#3b82f6') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Background
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, size, size);

			// Gradient circle
			const centerX = size / 2;
			const centerY = size / 2;
			const radius = size * 0.35;

			const gradient = createGradient(ctx, size, customColor, '#8b5cf6');
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
			ctx.fill();

			return canvas;
		}
	},
	{
		id: 'rounded-square',
		name: 'Rounded Square',
		category: 'business',
		description: 'Clean rounded square with shadow',
		render: (size: number, customColor = '#10b981') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Background
			ctx.fillStyle = '#f3f4f6';
			ctx.fillRect(0, 0, size, size);

			// Rounded square
			const padding = size * 0.15;
			const squareSize = size - padding * 2;
			const radius = size * 0.12;

			ctx.fillStyle = customColor;
			ctx.beginPath();
			ctx.roundRect(padding, padding, squareSize, squareSize, radius);
			ctx.fill();

			return canvas;
		}
	},
	{
		id: 'letter-icon',
		name: 'Letter Icon',
		category: 'business',
		description: 'First letter on colored background',
		render: (size: number, customColor = '#f59e0b') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Background
			ctx.fillStyle = customColor;
			ctx.fillRect(0, 0, size, size);

			// Letter
			ctx.fillStyle = '#ffffff';
			ctx.font = `bold ${size * 0.5}px Arial`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('A', size / 2, size / 2);

			return canvas;
		}
	},
	{
		id: 'dual-tone',
		name: 'Dual Tone',
		category: 'creative',
		description: 'Split diagonal design',
		render: (size: number, customColor = '#ec4899') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Top triangle
			ctx.fillStyle = customColor;
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(size, 0);
			ctx.lineTo(size, size);
			ctx.closePath();
			ctx.fill();

			// Bottom triangle
			ctx.fillStyle = '#8b5cf6';
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, size);
			ctx.lineTo(size, size);
			ctx.closePath();
			ctx.fill();

			return canvas;
		}
	},
	{
		id: 'geometric',
		name: 'Geometric Shapes',
		category: 'creative',
		description: 'Abstract geometric pattern',
		render: (size: number, customColor = '#06b6d4') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Background
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, size, size);

			// Circle
			ctx.fillStyle = customColor;
			ctx.beginPath();
			ctx.arc(size * 0.3, size * 0.3, size * 0.2, 0, Math.PI * 2);
			ctx.fill();

			// Triangle
			ctx.fillStyle = '#8b5cf6';
			ctx.beginPath();
			ctx.moveTo(size * 0.7, size * 0.3);
			ctx.lineTo(size * 0.9, size * 0.5);
			ctx.lineTo(size * 0.5, size * 0.5);
			ctx.closePath();
			ctx.fill();

			// Square
			ctx.fillStyle = '#f59e0b';
			ctx.fillRect(size * 0.5, size * 0.6, size * 0.3, size * 0.3);

			return canvas;
		}
	},
	{
		id: 'minimal-icon',
		name: 'Minimal Icon',
		category: 'tools',
		description: 'Simple centered icon shape',
		render: (size: number, customColor = '#6366f1') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Background
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, size, size);

			// Border
			ctx.strokeStyle = customColor;
			ctx.lineWidth = size * 0.08;
			ctx.beginPath();
			ctx.roundRect(size * 0.2, size * 0.2, size * 0.6, size * 0.6, size * 0.08);
			ctx.stroke();

			// Inner dot
			ctx.fillStyle = customColor;
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, size * 0.12, 0, Math.PI * 2);
			ctx.fill();

			return canvas;
		}
	},
	{
		id: 'neon-glow',
		name: 'Neon Glow',
		category: 'gaming',
		description: 'Glowing neon effect',
		render: (size: number, customColor = '#a855f7') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Dark background
			ctx.fillStyle = '#1f2937';
			ctx.fillRect(0, 0, size, size);

			// Glow effect
			ctx.shadowBlur = size * 0.15;
			ctx.shadowColor = customColor;

			// Circle
			ctx.fillStyle = customColor;
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, size * 0.3, 0, Math.PI * 2);
			ctx.fill();

			return canvas;
		}
	},
	{
		id: 'app-icon',
		name: 'App Icon Style',
		category: 'tech',
		description: 'iOS-style rounded square',
		render: (size: number, customColor = '#3b82f6') => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d')!;

			// Background gradient
			const gradient = createGradient(ctx, size, customColor, '#8b5cf6');
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.roundRect(0, 0, size, size, size * 0.22);
			ctx.fill();

			// Inner icon
			ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, size * 0.25, 0, Math.PI * 2);
			ctx.fill();

			return canvas;
		}
	}
];

/**
 * Get templates by category
 */
export function getTemplatesByCategory(
	category: IconTemplate['category']
): IconTemplate[] {
	return templates.filter((t) => t.category === category);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): IconTemplate | undefined {
	return templates.find((t) => t.id === id);
}

/**
 * Get all categories
 */
export function getAllCategories(): IconTemplate['category'][] {
	return ['tech', 'business', 'social', 'gaming', 'tools', 'creative'];
}
