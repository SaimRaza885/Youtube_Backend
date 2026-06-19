export const CategoryChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative shrink-0 inline-flex items-center h-8 px-3.5 rounded-full
      text-[13px] font-medium whitespace-nowrap
      border transition-all duration-200 ease-out outline-none
      focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1 focus-visible:ring-offset-primary
      select-none cursor-pointer
      ${active
        ? 'bg-text-primary text-primary border-transparent shadow-sm'
        : 'bg-primary text-text-secondary border-border-subtle hover:bg-tertiary hover:text-text-primary hover:border-border-default active:scale-95'
      }
    `}
  >
    {label}
  </button>
)