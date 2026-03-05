import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
      <p className="text-xl text-neutral-400 mb-8">
        This page doesn&apos;t exist — yet.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-glow hover:-translate-y-0.5"
      >
        Go home
      </Link>
    </section>
  )
}
