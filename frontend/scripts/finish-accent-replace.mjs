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
  [/from-\[#be123c\]\/40/g, 'from-accent/40'],
  [/from-\[#be123c\]\/30/g, 'from-accent/30'],
  [/from-\[#be123c\]/g, 'from-accent'],
  [/to-\[#9F0E31\]\/20/g, 'to-accent-hover/20'],
  [/to-\[#9F0E31\]/g, 'to-accent-hover'],
  [/from-\[#ffb2b7\]/g, 'from-accent-light'],
  [/to-\[#e3bdbf\]/g, 'to-accent-hover-text'],
  [/hover:!bg-\[#ffb2b7\]/g, 'hover:!bg-accent-light'],
  [/bg-\[#ffb2b7\]\/10/g, 'bg-accent-light/10'],
  [/bg-\[#ffb2b7\]\/5/g, 'bg-accent-light/5'],
  [/bg-\[#ffb2b7\]/g, 'bg-accent-light'],
  [/"#ffd0d2"/g, '"var(--color-accent-on-dark)"'],
  [/'#ffd0d2'/g, "'var(--color-accent-on-dark)'"],
  [/fill-\[#ffb2b7\]/g, 'fill-accent-light'],
  [/focus:border-\[#be123c\]\/40/g, 'focus:border-accent/40'],
  [/hover:border-\[#be123c\]\/50/g, 'hover:border-accent/50'],
  [/'linear-gradient\(90deg, #be123c, #ffb2b7\)'/g, "'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))'"],
  [/'linear-gradient\(135deg, #be123c, #9F0E31\)'/g, "'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))'"],
  [/'radial-gradient\(circle, #be123c 0%, transparent 70%\)'/g, "'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'"],
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
