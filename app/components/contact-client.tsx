'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram } from 'lucide-react'

const FloatingGeometry = dynamic(
  () => import('./three/floating-geometry').then((mod) => mod.FloatingGeometry),
  { ssr: false, loading: () => <div className="w-full h-[400px]" /> }
)

const contacts = [
  {
    name: 'Email',
    href: 'mailto:tharuneswar@gmail.com',
    icon: Mail,
    description: 'tharuneswar@gmail.com',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/tharuneswarj',
    icon: Github,
    description: '@tharuneswarj',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tharun-eswar/',
    icon: Linkedin,
    description: 'Tharun Eswar',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/tharun.j',
    icon: Instagram,
    description: '@tharun.j',
  },
]

export function ContactClient() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: content */}
        <div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h1>

          <motion.p
            className="text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Whether it&apos;s about architecture, computational design, digital
            fabrication, or just to say hello — I&apos;d love to hear from you.
          </motion.p>

          <div className="space-y-4">
            {contacts.map((contact, i) => (
              <motion.a
                key={contact.name}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 p-4 group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              >
                <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <contact.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {contact.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {contact.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: 3D geometry */}
        <div className="hidden md:block">
          <FloatingGeometry className="w-full h-[400px]" />
        </div>
      </div>
    </section>
  )
}
