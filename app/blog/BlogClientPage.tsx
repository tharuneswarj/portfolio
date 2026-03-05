'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'

type Post = {
    slug: string
    content: string
    metadata: {
        title: string
        publishedAt: string
        summary: string
        image?: string
        tags?: string
    }
}

function formatDate(date: string) {
    if (!date || typeof date !== 'string') return 'Unknown date'
    if (!date.includes('T')) date = `${date}T00:00:00`
    const d = new Date(date)
    return d.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })
}

const CATEGORIES = ['All', 'Architecture', 'Computation', 'Fabrication', 'Life', 'Tech']

function estimateReadTime(content: string) {
    const words = content.split(/\s+/).length
    const mins = Math.max(1, Math.round(words / 200))
    return `${mins} min read`
}



export default function BlogClientPage({ posts }: { posts: Post[] }) {
    const [active, setActive] = useState('All')

    const filtered = useMemo(() => {
        if (active === 'All') return posts
        return posts.filter((p) => {
            const tags = ((p.metadata as any).tags || '') as string
            return tags.toLowerCase().includes(active.toLowerCase())
        })
    }, [active, posts])

    return (
        <div>
            {/* Hero */}
            <section
                className="relative pt-32 pb-16 px-6 text-center overflow-hidden"
                style={{
                    background:
                        'radial-gradient(ellipse at top, rgba(99,102,241,0.12) 0%, transparent 60%)',
                }}
            >
                <div
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(255,255,255,0.05)',
                        fontFamily: 'var(--font-space, inherit)',
                        fontSize: 'clamp(6rem, 20vw, 16rem)',
                        fontWeight: 900,
                        lineHeight: 1,
                        userSelect: 'none',
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                    }}
                >
                    BLOG
                </div>
                <p
                    className="text-xs font-semibold uppercase tracking-widest mb-4 relative"
                    style={{ color: 'var(--accent-2)' }}
                >
                    Writing
                </p>
                <h1
                    className="text-4xl sm:text-6xl font-bold relative"
                    style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
                >
                    Thoughts &amp;{' '}
                    <span className="gradient-text">Process</span>
                </h1>
                <p className="mt-4 max-w-xl mx-auto text-base relative" style={{ color: 'var(--text-muted)' }}>
                    Architecture, computation, fabrication, and the things in between.
                </p>
            </section>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 justify-center px-6 pb-10">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                        style={{
                            background: active === cat ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                            color: active === cat ? '#fff' : 'var(--text-muted)',
                            border: active === cat ? '1px solid var(--accent)' : '1px solid var(--border)',
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Posts grid */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                {filtered.length === 0 ? (
                    <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                        No posts in this category yet.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 glow-accent-hover"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                {/* Image or placeholder */}
                                <div className="relative h-44 w-full overflow-hidden">
                                    {post.metadata.image ? (
                                        <Image
                                            src={post.metadata.image}
                                            alt={post.metadata.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center text-5xl"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(245,158,11,0.08))',
                                            }}
                                        >
                                            ◈
                                        </div>
                                    )}
                                    {/* Accent left bar */}
                                    <div
                                        className="absolute top-0 left-0 w-1 h-full"
                                        style={{ background: 'var(--accent)' }}
                                    />
                                </div>

                                <div className="flex flex-col flex-1 gap-2 p-5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                            {formatDate(post.metadata.publishedAt)}
                                        </span>
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full"
                                            style={{
                                                background: 'rgba(99,102,241,0.12)',
                                                color: 'var(--accent-2)',
                                                border: '1px solid rgba(99,102,241,0.2)',
                                            }}
                                        >
                                            {estimateReadTime(post.content)}
                                        </span>
                                    </div>
                                    <h2
                                        className="text-base font-semibold transition-colors group-hover:text-indigo-300"
                                        style={{ color: 'var(--cream)' }}
                                    >
                                        {post.metadata.title}
                                    </h2>
                                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                                        {post.metadata.summary}
                                    </p>
                                    <span
                                        className="text-xs font-semibold mt-2 transition-opacity opacity-0 group-hover:opacity-100"
                                        style={{ color: 'var(--accent-2)' }}
                                    >
                                        Read more →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
