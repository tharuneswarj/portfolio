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
                  ? "text-[#b11f2d] dark:text-[#e07b87] font-medium"
                  : "text-neutral-600 hover:text-[#b11f2d] dark:text-neutral-400 dark:hover:text-[#e07b87]"
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
