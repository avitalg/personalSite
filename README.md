# Personal Portfolio Website

A modern, responsive portfolio website built with React and TypeScript.

## What is this?

This is my personal professional website showcasing my experience, skills, and services as a full-stack developer. It features a clean design with smooth animations and is fully responsive.

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS3

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Structure

- `src/App.tsx` - Main application component
- `src/App.css` - All styles and animations
- `public/` - Static assets (favicon, etc.)

## Sections

- **Home** - Hero section with introduction
- **About** - Background and skills
- **Experience** - Professional work history
- **Services** - Development services offered
- **Contact** - Contact information

## SEO Features

This website includes comprehensive SEO optimization:

- **Meta Tags**: Complete Open Graph and Twitter Card tags for social media sharing
- **Structured Data**: JSON-LD schema markup for Person and ProfessionalService
- **Semantic HTML**: Proper use of semantic elements (header, main, article, section, footer)
- **Sitemap**: XML sitemap at `/sitemap.xml` for search engine indexing
- **Robots.txt**: Configured to allow all search engine crawlers
- **Accessibility**: ARIA labels and proper heading hierarchy

### Important Notes

1. **Update URLs**: Replace `https://avitalglazer.com/` in `index.html`, `sitemap.xml`, and `robots.txt` with your actual domain when deploying.

2. **Open Graph Image**: Add an `og-image.jpg` file to the `public` folder for better social media previews, or update the `og:image` meta tag in `index.html` to point to your image.

3. **Submit to Search Engines**:
   - **Google**: Submit your sitemap at [Google Search Console](https://search.google.com/search-console)
   - **Bing**: Submit at [Bing Webmaster Tools](https://www.bing.com/webmasters)

4. **Verify Structured Data**: Test your structured data using [Google's Rich Results Test](https://search.google.com/test/rich-results)

## Deployment

After building (`npm run build`), upload the `dist` folder to any static hosting service like Vercel, Netlify, or GitHub Pages.

**Before deploying**, make sure to:
- Update all URLs in `index.html`, `sitemap.xml`, and `robots.txt` to match your domain
- Add an Open Graph image to the `public` folder
- Configure your hosting service to serve `robots.txt` and `sitemap.xml` from the root
