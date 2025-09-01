"use client"

import { useEffect, useState } from "react"

export default function Page() {
  const text = [
    "Hi, I’m Tharun Eswar.",
    "An architect and computational designer.",
    "I work at the intersection of architecture, technology, and digital fabrication.",
    "Here you’ll find a selection of my projects, experiments, and writings.",
  ]

  const [displayed, setDisplayed] = useState<string[]>(Array(text.length).fill(""))
  const [hoverTarget, setHoverTarget] = useState<{ line: number; word: number } | null>(null)

  const palette = ["#ef4444", "#f97316", "#f59e0b", "#facc15"]

  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0

    const interval = setInterval(() => {
      if (lineIndex < text.length) {
        const currentLine = text[lineIndex]
        if (charIndex <= currentLine.length) {
          setDisplayed((prev) => {
            const newLines = [...prev]
            newLines[lineIndex] = currentLine.slice(0, charIndex)
            return newLines
          })
          charIndex++
        } else {
          lineIndex++
          charIndex = 0
        }
      } else {
        clearInterval(interval)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    // ❌ old: className="min-h-screen flex items-center justify-center px-6"
    <section className="flex items-center justify-center px-6">
      <div className="w-full text-center space-y-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          {displayed[0]}
        </h1>

        <div className="max-w-3xl mx-auto space-y-6 text-xl md:text-2xl font-medium leading-relaxed">
          {displayed.slice(1).map((line, lineIndex) => {
            const words = line.trim().split(/\s+/)

            return (
              <p key={lineIndex}>
                {words.map((word, i) => {
                  let style: React.CSSProperties = {}
                  let baseClass =
                    "inline-block cursor-pointer transition-all duration-300"

                  if (
                    hoverTarget &&
                    hoverTarget.line === lineIndex + 1
                  ) {
                    const distance = Math.abs(i - hoverTarget.word)
                    const maxDistance = Math.max(
                      hoverTarget.word,
                      words.length - hoverTarget.word
                    )

                    const intensity = 1 - distance / (maxDistance || 1)

                    if (distance === 0) {
                      style = {
                        background: `linear-gradient(90deg, ${palette.join(", ")})`,
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        fontWeight: 700,
                      }
                    } else {
                      const colorIndex = i % palette.length
                      const baseColor = palette[colorIndex]

                      style = {
                        color: baseColor,
                        opacity: intensity,
                        fontWeight: 400,
                      }
                    }
                  }

                  return (
                    <span
                      key={i}
                      className={baseClass}
                      style={style}
                      onMouseEnter={() =>
                        setHoverTarget({ line: lineIndex + 1, word: i })
                      }
                      onMouseLeave={() => setHoverTarget(null)}
                    >
                      {word}&nbsp;
                    </span>
                  )
                })}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
