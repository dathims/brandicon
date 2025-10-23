# BrandIcon

**Professional Chrome Extension Icon Generator**

Generate all required icon sizes for your Chrome extension in seconds. Upload an image, choose from templates, or draw your own with the built-in canvas editor.

## Features

- **Upload & Resize**: Automatically generate all 4 required Chrome extension icon sizes (16×16, 32×32, 48×48, 128×128)
- **Professional Templates**: 8+ pre-designed templates across multiple categories
- **Canvas Editor**: Draw and edit icons directly in the browser with powerful tools
- **Export Options**:
  - Download complete ZIP package with all sizes
  - Download individual icon files
  - Copy manifest.json snippet for easy integration

## Tech Stack

- **Framework**: SvelteKit + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Shadcn-inspired design
- **Icons**: Lucide Svelte
- **Export**: JSZip + FileSaver
- **Deployment**: Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Chrome Extension Icon Requirements

| Size    | Usage                           |
|---------|---------------------------------|
| 16×16   | Browser toolbar icon            |
| 32×32   | Windows retina display          |
| 48×48   | Extensions management page      |
| 128×128 | Chrome Web Store listing        |

## Development

```bash
# Check types
npm run check

# Build
npm run build
```

## License

MIT License - feel free to use this project for any purpose.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dathims/brandicon)

---

Built with SvelteKit | [GitHub](https://github.com/dathims/brandicon)
