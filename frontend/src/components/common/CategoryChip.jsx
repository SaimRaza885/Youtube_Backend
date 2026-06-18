export const CategoryChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      shrink-0 inline-flex items-center h-8 px-3.5 rounded-full
      text-[13px] font-medium whitespace-nowrap
      border transition-all duration-100 outline-none
      focus-visible:ring-2 focus-visible:ring-border-primary
      ${active
        ? 'bg-text-primary text-primary border-transparent'
        : 'bg-primary text-text-secondary border-border-subtle hover:border-border-secondary hover:text-text-primary'
      }
    `}
  >
    {label}
  </button>
)