export const VideoCardSkeleton = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="w-full aspect-video bg-gradient-to-r from-tertiary via-[#24243A] to-tertiary bg-[length:200%_100%] animate-shimmer rounded-xl mb-2.5" />
        <div className="flex gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tertiary via-[#24243A] to-tertiary bg-[length:200%_100%] animate-shimmer shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-gradient-to-r from-tertiary via-[#24243A] to-tertiary bg-[length:200%_100%] animate-shimmer rounded w-full" />
            <div className="h-3 bg-gradient-to-r from-tertiary via-[#24243A] to-tertiary bg-[length:200%_100%] animate-shimmer rounded w-2/3" />
            <div className="h-2.5 bg-gradient-to-r from-tertiary via-[#24243A] to-tertiary bg-[length:200%_100%] animate-shimmer rounded w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </>
)
