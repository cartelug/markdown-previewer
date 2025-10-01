# Markdown Previewer

Simple markdown preview app (React 19 + Vite).

## Features
- Real-time markdown preview
- Code block syntax highlighting
- Upload and Save `.md` files
- LocalStorage persistence
- Fake API save (jsonplaceholder)
- Error Boundary test route: `/error-test`
- Custom 404 page
- Responsive design with Tailwind

## Scripts
- `npm run dev` → local development
- `npm run build` → production build
- `npm run preview` → preview production build

## Deploy
- Netlify: Build command → `npm run build`, Output dir → `dist`
- Vercel: Framework → Vite, Build → `npm run build`, Output → `dist`
