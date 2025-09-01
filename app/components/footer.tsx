import { Github, Linkedin, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-8">
      <div className="flex flex-col items-center space-y-6 md:flex-row md:justify-between md:space-y-0">
        {/* Left side: Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Tharun Eswar</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Architect • Computational Designer • Maker
          </p>
        </div>

        {/* Right side: Social links */}
        <div className="flex space-x-6">
          <a
            href="mailto:tharuneswar@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/tharuneswarj"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/tharun-eswar/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com/tharun.j"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
        © {new Date().getFullYear()} Tharun Eswar. All rights reserved.
      </div>
    </footer>
  )
}
