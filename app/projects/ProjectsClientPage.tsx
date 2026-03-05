'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'

type Project = {
    slug: string
    content: string
    metadata: {
        title?: string
        description?: string
        image?: string
        tags?: string
        publishedAt?: string
    }
}

const FILTERS = ['All', 'Architecture', 'Fabrication', 'BIM', 'Brand', 'Research']


export default function ProjectsClientPage({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState('All')

    const filtered = useMemo(() => {
        if (active === 'All') return projects
        return projects.filter((p) => {
            const tags = ((p.metadata as any).tags || '') as string
            return tags.toLowerCase().includes(active.toLowerCase())
        })
    }, [active, projects])

    return (
        <div>
            {/* Hero */}
            <section
                className="relative pt-32 pb-16 px-6 text-center overflow-hidden"
                style={{
                    background:
                        'radial-gradient(ellipse at top, rgba(245,158,11,0.08) 0%, transparent 60%)',
                }}
            >
                <p
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: 'var(--amber)' }}
                >
                    Portfolio
                </p>
                <h1
                    className="text-4xl sm:text-6xl font-bold"
                    style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
                >
                    Selected{' '}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b, #6366f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Work
                    </span>
                </h1>
                <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
                    Architecture, computational design, digital fabrication, and brand systems.
                </p>
            </section>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 justify-center px-6 pb-10">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActive(f)}
                        className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                        style={{
                            background: active === f ? 'var(--amber)' : 'rgba(255,255,255,0.04)',
                            color: active === f ? '#000' : 'var(--text-muted)',
                            border: active === f ? '1px solid var(--amber)' : '1px solid var(--border)',
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                {filtered.length === 0 ? (
                    <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                        No projects in this category yet.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 glow-accent-hover"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                {/* Image */}
                                <div className="relative h-56 w-full overflow-hidden">
                                    {(project.metadata as any).image ? (
                                        <Image
                                            src={(project.metadata as any).image}
                                            alt={(project.metadata as any).title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center text-6xl"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(99,102,241,0.08))',
                                            }}
                                        >
                                            ⬡
                                        </div>
                                    )}
                                    {/* Hover overlay */}
                                    <div
                                        className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'linear-gradient(to top, rgba(8,10,15,0.9), transparent)' }}
                                    >
                                        <span className="text-xs font-semibold" style={{ color: 'var(--accent-2)' }}>
                                            View case study →
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex flex-col gap-2 p-5">
                                    <h2 className="text-base font-semibold" style={{ color: 'var(--cream)' }}>
                                        {(project.metadata as any).title}
                                    </h2>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                        {(project.metadata as any).description}
                                    </p>
                                    {(project.metadata as any).tags && (
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {((project.metadata as any).tags as string)
                                                .split(',')
                                                .map((tag: string) => (
                                                    <span
                                                        key={tag.trim()}
                                                        className="text-xs px-2 py-0.5 rounded-full"
                                                        style={{
                                                            background: 'rgba(245,158,11,0.1)',
                                                            color: 'var(--amber)',
                                                            border: '1px solid rgba(245,158,11,0.2)',
                                                        }}
                                                    >
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
