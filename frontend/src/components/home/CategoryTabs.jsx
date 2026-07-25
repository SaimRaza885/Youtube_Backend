import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CategoryChip } from '../common/CategoryChip'

export const CategoryTabs = ({ categories, activeCategory, onSelectCategory }) => {
  const containerRef = useRef(null)
  const [showLeftBlur, setShowLeftBlur] = useState(false)
  const [showRightBlur, setShowRightBlur] = useState(true)

  const checkScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setShowLeftBlur(scrollLeft > 0)
    setShowRightBlur(scrollLeft < scrollWidth - clientWidth - 2)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative w-full mb-8"
    >
      {/* Scroll blur indicators */}
      {showLeftBlur && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}
      {showRightBlur && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      )}

      <div 
        ref={containerRef}
        onScroll={checkScroll}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <CategoryChip 
            key={cat} 
            label={cat} 
            active={activeCategory === cat} 
            onClick={() => onSelectCategory(cat)} 
          />
        ))}
      </div>
    </motion.div>
  )
}
