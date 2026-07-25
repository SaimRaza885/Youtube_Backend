import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'

const srcDir = 'D:\\Code\\Youtube_Backend\\frontend\\src'

function getAllFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      files.push(...getAllFiles(full))
    } else if (entry.isFile() && (extname(entry.name) === '.jsx' || extname(entry.name) === '.js')) {
      if (entry.name !== 'globals.css') files.push(full)
    }
  }
  return files
}

const replacements = [
  // === border-[#12131a] → border-[var(--color-surface-low)] ===
  [/border-\[#12131a\]/g, 'border-[var(--color-surface-low)]'],

  // === border-[#1a1b22] → border-[var(--color-search-bg)] ===
  [/border-\[#1a1b22\]/g, 'border-[var(--color-search-bg)]'],

  // === hover:!bg-white/[0.12] → hover:!bg-[var(--color-overlay-hover)] ===
  [/hover:!bg-white\/\[0\.12\]/g, 'hover:!bg-[var(--color-overlay-hover)]'],
  [/hover:!bg-white\/\[0\.1\]/g, 'hover:!bg-[var(--color-overlay-hover)]'],
  [/hover:bg-white\/\[0\.1\]/g, 'hover:bg-[var(--color-overlay-hover)]'],

  // === Gradient overlays using #12131a → replace with inline var references ===
  // Convert gradient Tailwind classes to use CSS variables
  [/bg-gradient-to-t from-\[#12131a\]\/90 via-\[#12131a\]\/20 to-transparent/g,
   '[style*]REPLACED_GRADIENT_T_90_20'],
  [/bg-gradient-to-t from-\[#12131a\] via-\[#12131a\]\/80 to-transparent/g,
   '[style*]REPLACED_GRADIENT_T_80'],
  [/bg-gradient-to-t from-\[#12131a\]\/80 via-transparent to-transparent/g,
   '[style*]REPLACED_GRADIENT_T_80_VIA'],
  [/bg-gradient-to-r from-\[#12131a\]\/90 via-transparent to-\[#12131a\]\/90/g,
   '[style*]REPLACED_GRADIENT_R_90'],
  [/bg-gradient-to-r from-accent\/40 via-\[#9F0E31\]\/20 to-\[#12131a\]/g,
   '[style*]REPLACED_GRADIENT_R_ACCENT'],
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
  if (changed) writeFileSync(file, content, 'utf-8')
}
console.log(`Done! ${totalChanges} replacements.`)
