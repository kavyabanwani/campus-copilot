export default function TypingIndicator() {
  return (
    <div className="flex animate-fadeIn justify-start px-4 py-2.5">
      <div className="max-w-[85%] space-y-2">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-brand-700 font-display text-[9px] font-bold text-accent-300">
            C
          </span>
          Copilot
        </p>
        <div className="flex items-center gap-1 border-l-2 border-brand-300 py-1 pl-3">
          <span className="h-1.5 w-1.5 animate-typingDot rounded-full bg-stone-400 [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-typingDot rounded-full bg-stone-400 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-typingDot rounded-full bg-stone-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
