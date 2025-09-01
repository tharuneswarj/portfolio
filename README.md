# 🧑‍💻 Tharun Eswar — Portfolio

A personal portfolio built with **Next.js 14**, **TailwindCSS**, and **MDX**.  
It showcases my work in architecture, computational design, and digital fabrication.  

## ✨ Features
- Interactive **landing/about page** with typewriter + hover effects  
- **Projects** powered by MDX (`/content/projects`)  
- **Blog** powered by MDX (`/content/blog`)  
- SEO-ready with OpenGraph + Twitter cards  
- Sticky footer & responsive layout  
- Dark/light mode support  
- Easy to extend — just add `.mdx` files, no React coding required  

---

## 📂 Project Structure

```bash
.
├── app/                 # Next.js App Router
│   ├── blog/            # Blog routes
│   │   ├── page.tsx     # Blog listing page
│   │   └── [slug]/      # Blog detail page
│   ├── projects/        # Projects routes
│   │   ├── page.tsx     # Projects listing page
│   │   └── [slug]/      # Project detail page
│   ├── contact/         # Contact page
│   ├── components/      # Shared UI components (Navbar, Footer, MDX, etc.)
│   └── layout.tsx       # Root layout
├── content/             # All content lives here (markdown/MDX)
│   ├── blog/            # Blog posts
│   └── projects/        # Projects
├── public/              # Static assets (images, icons)
│   ├── blog/            # Blog images
│   └── projects/        # Project images
└── README.md
```

## 🛠️ Tech Stack

Next.js 14
 — React framework with App Router

TailwindCSS
 — styling

MDX
 — Markdown + JSX

lucide-react
 — icons

gray-matter
 — frontmatter parsing

Vercel
 — hosting & analytics

### 📬 Contact

🌐 Portfolio: https:\\tha.run

💼 LinkedIn: linkedin.com/in/tharun-eswar

💻 GitHub: github.com/tharuneswarj
