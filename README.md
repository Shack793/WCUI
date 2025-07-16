## Installation Steps

1. Copy all files from the `src` directory to `resources/js`
2. Copy these files to your Laravel project root:
   - `package.json`
   - `postcss.config.js`
   - `tailwind.config.js`
   - `tsconfig.json`
   - `tsconfig.app.json`
   - `tsconfig.node.json`
   - `vite.config.ts`
   - `eslint.config.js`

3. Update your Laravel project's `vite.config.js`:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.tsx'],
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
});
```

4. Update your Laravel blade template (`resources/views/app.blade.php`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RiseLab - Make a Difference</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/main.tsx'])
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

5. Install dependencies:
```bash
npm install
```

6. Run the development server:
```bash
npm run dev
```