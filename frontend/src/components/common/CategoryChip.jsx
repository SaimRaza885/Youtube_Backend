export const CategoryChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative shrink-0 inline-flex items-center h-9 px-4 rounded-lg
      text-[13px] font-medium whitespace-nowrap
      border transition-all duration-200 outline-none
      focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1 focus-visible:ring-offset-primary
      select-none cursor-pointer
      ${active
        ? 'bg-accent text-white border-accent shadow-[0_0_15px_var(--color-accent-glow-light)]'
        : 'bg-transparent text-text-secondary border-border-default hover:bg-surface hover:text-text-primary hover:border-white/20 active:scale-95'
      }
    `}
  >
    {label}
  </button>
)