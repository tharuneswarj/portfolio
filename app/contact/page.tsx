import { Mail, Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

const contacts = [
  {
    name: "Email",
    href: "mailto:tharuneswar@gmail.com", 
    icon: Mail,
  },
  {
    name: "GitHub",
    href: "https://github.com/tharuneswarj",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tharun-eswar/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/tharun.j",
    icon: Instagram,
  },
]

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      {/* Page title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>

      {/* Intro text */}
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
        Whether it’s about architecture, computational design, digital fabrication,
        or just to say hello — I’d love to hear from you. Reach me through any of
        the channels below:
      </p>

      {/* Social links */}
      <ul className="space-y-6">
        {contacts.map((contact) => (
          <li key={contact.name}>
            <Link
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg font-medium text-neutral-700 dark:text-neutral-300 hover:text-red-500 transition-colors"
            >
              <contact.icon className="w-6 h-6" />
              {contact.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
