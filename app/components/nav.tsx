"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = {
  "/": { name: "Home" },
  "/projects": { name: "Projects" },
  "/blog": { name: "Blog" },
  "/contact": { name: "Contact" },
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="flex items-center justify-between py-6 mb-12">
      {/* Left side: Brand/Logo */}
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Tharun Eswar
      </Link>

      {/* Right side: Nav Links */}
      <nav className="flex space-x-6">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = pathname === path
          return (
            <Link
              key={path}
              href={path}
              className={`transition-colors ${
                isActive
                  ? "text-[#6b1d1d] dark:text-[#c46868] font-medium"
                  : "text-neutral-600 hover:text-[#6b1d1d] dark:text-neutral-400 dark:hover:text-[#c46868]"
              }`}
            >
              {name}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
