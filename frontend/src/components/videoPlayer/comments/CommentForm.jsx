import { Button } from '../../ui/Button'

export const CommentForm = ({ value, onChange, onSubmit, loading }) => (
  <form onSubmit={onSubmit} className="flex gap-3 mb-6">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Add a comment..."
      disabled={loading}
      className="flex-1 border rounded-xl px-4 py-2.5 text-sm transition-colors disabled:opacity-50 outline-none focus:border-accent-light/50"
      style={{
        background: 'var(--color-search-bg)',
        borderColor: 'var(--color-border-light)',
        color: 'var(--color-text-primary)',
      }}
    />
    <Button
      loading={loading}
      type="submit"
      size="sm"
      disabled={!value.trim()}
      className="!bg-accent !text-accent-on-dark hover:!bg-accent-light hover:!text-accent-on-light !rounded-xl !transition-all"
    >
      Post
    </Button>
  </form>
)