import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'

const srcDir = 'D:\\Code\\Youtube_Backend\\frontend\\src'
const skipFiles = new Set(['globals.css', 'UIContext.jsx'])

function getAllFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      files.push(...getAllFiles(full))
    } else if (entry.isFile() && (extname(entry.name) === '.jsx' || extname(entry.name) === '.js')) {
      if (!skipFiles.has(entry.name)) files.push(full)
    }
  }
  return files
}

const replacements = [
  // ===== TAILWIND CLASS PATTERNS (must come first) =====
  // text-[#...]
  [/text-\[#ffdadb\]/g, 'text-accent-hover-text'],
  [/text-\[#67001b\]/g, 'text-accent-on-light'],
  [/text-\[#ffd0d2\]/g, 'text-accent-on-dark'],
  [/text-\[#ffb2b7\]/g, 'text-accent-light'],
  [/text-\[#be123c\]/g, 'text-accent'],
  [/text-\[#BE123C\]/g, 'text-accent'],

  // bg-[#...] with and without opacity modifiers
  [/bg-\[#be123c\]\/90/g, 'bg-accent/90'],
  [/bg-\[#be123c\]\/20/g, 'bg-accent/20'],
  [/bg-\[#be123c\]\/10/g, 'bg-accent/10'],
  [/bg-\[#be123c\]\/12/g, 'bg-accent/12'],
  [/bg-\[#be123c\]\/5/g, 'bg-accent/5'],
  [/bg-\[#be123c\](?!\/)/g, 'bg-accent'],
  [/bg-\[#BE123C\](?!\/)/g, 'bg-accent'],
  [/hover:bg-\[#ffb2b7\]/g, 'hover:bg-accent-light'],
  [/hover:bg-\[#a00f33\]/g, 'hover:bg-accent-hover'],

  // border-[#...]
  [/border-\[#ffb2b7\]/g, 'border-accent-light'],
  [/focus:border-\[#ffb2b7\]/g, 'focus:border-accent-light'],
  [/hover:border-\[#ffb2b7\]/g, 'hover:border-accent-light'],

  // focus:ring-[#...]
  [/focus:ring-\[#ffb2b7\]/g, 'focus:ring-accent-light'],

  // ===== INLINE STYLE VALUES (quoted strings) =====
  [/'#ffdadb'/g, "'var(--color-accent-hover-text)'"],
  [/'#67001b'/g, "'var(--color-accent-on-light)'"],
  [/'#ffd0d2'/g, "'var(--color-accent-on-dark)'"],
  [/'#ffb2b7'/g, "'var(--color-accent-light)'"],
  [/'#9F0E31'/g, "'var(--color-accent-hover)'"],
  [/'#be123c'/g, "'var(--color-accent)'"],
  [/'#BE123C'/g, "'var(--color-accent)'"],

  // rgba accent values in style strings
  [/'rgba\(190,\s*18,\s*60,\s*0\.08\)'/g, "'var(--color-accent-muted-bg)'"],
  [/'rgba\(190,\s*18,\s*60,\s*0\.12\)'/g, "'var(--color-accent-muted)'"],
  [/'rgba\(190,\s*18,\s*60,\s*0\.25\)'/g, "'var(--color-accent-glow)'"],
  [/'rgba\(190,\s*18,\s*60,\s*0\.3\)'/g, "'var(--color-accent-glow-light)'"],
  [/'rgba\(190,\s*18,\s*60,\s*0\.06\)'/g, "'var(--color-accent-muted-bg)'"],
  [/'rgba\(190,\s*18,\s*60,\s*0\.04\)'/g, "'var(--color-accent-muted-bg)'"],
  [/'rgba\(190,\s*18,\s*60,\s*0\.1\)'/g, "'var(--color-accent-muted)'"],
  [/'rgba\(255,\s*178,\s*183,\s*0\.2\)'/g, "'var(--color-accent-border)'"],
  [/'rgba\(255,\s*178,\s*183,\s*0\.15\)'/g, "'var(--color-accent-border-subtle)'"],
  [/'rgba\(255,\s*178,\s*183,\s*0\.3\)'/g, "'var(--color-accent-light)'"],
  [/'rgba\(255,\s*178,\s*183,\s*0\.4\)'/g, "'var(--color-accent-light)'"],

  // ===== UNQUOTED rgba in style values (e.g. inside longer strings) =====
  [/rgba\(190,\s*18,\s*60,\s*0\.08\)/g, 'var(--color-accent-muted-bg)'],
  [/rgba\(190,\s*18,\s*60,\s*0\.06\)/g, 'var(--color-accent-muted-bg)'],
  [/rgba\(190,\s*18,\s*60,\s*0\.04\)/g, 'var(--color-accent-muted-bg)'],
  [/rgba\(190,\s*18,\s*60,\s*0\.25\)/g, 'var(--color-accent-glow)'],
  [/rgba\(190,\s*18,\s*60,\s*0\.3\)/g, 'var(--color-accent-glow-light)'],
  [/rgba\(190,\s*18,\s*60,\s*0\.1\)/g, 'var(--color-accent-muted)'],
  [/rgba\(255,\s*178,\s*183,\s*0\.2\)/g, 'var(--color-accent-border)'],
  [/rgba\(255,\s*178,\s*183,\s*0\.15\)/g, 'var(--color-accent-border-subtle)'],
  [/rgba\(255,\s*178,\s*183,\s*0\.3\)/g, 'var(--color-accent-light)'],
  [/rgba\(255,\s*178,\s*183,\s*0\.4\)/g, 'var(--color-accent-light)'],
]

let totalChanges = 0

for (const file of getAllFiles(srcDir)) {
  let content = readFileSync(file, 'utf-8')
  let changed = false

  for (const [regex, replacement] of replacements) {
    const newContent = content.replace(regex, replacement)
    if (newContent !== content) {
      totalChanges += [...content.matchAll(regex)].length
      content = newContent
      changed = true
    }
  }

  if (changed) {
    writeFileSync(file, content, 'utf-8')
  }
}

console.log(`Done! ${totalChanges} total replacements.`)
