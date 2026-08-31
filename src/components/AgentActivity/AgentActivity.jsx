import { useEffect, useState } from 'react'
import Icon from '../UI/Icon'

/**
 * Mock "agent activity" trace. Later this will render real tool/function
 * calls streamed from the FastAPI + Gemini function-calling backend
 * (e.g. { tool: 'get_attendance', status: 'done' }). The steps prop is
 * already the abstraction that swap will need — only the data source changes.
 */
export default function AgentActivity({ steps = [], done = false }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (visibleCount >= steps.length) return
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 350)
    return () => clearTimeout(t)
  }, [visibleCount, steps.length])

  if (steps.length === 0) return null

  return (
    <div className="mb-2 max-w-md rounded-lg border border-stone-200 bg-stone-50 text-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-stone-600 hover:text-stone-800"
      >
        <span className="flex items-center gap-2">
          {!done ? (
            <Icon name="Loader2" className="h-3.5 w-3.5 animate-spin text-brand-500" />
          ) : (
            <Icon name="Check" className="h-3.5 w-3.5 text-emerald-600" />
          )}
          <span className="font-medium">
            {done ? 'Campus Copilot worked through this' : 'Campus Copilot is working...'}
          </span>
        </span>
        <Icon
          name="ChevronDown"
          className={`h-3.5 w-3.5 text-stone-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && (
        <ul className="space-y-1 border-t border-stone-200 px-3 py-2">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2 text-stone-500">
              {i < visibleCount ? (
                <Icon name="Check" className="h-3 w-3 shrink-0 text-emerald-600" />
              ) : (
                <span className="h-3 w-3 shrink-0 rounded-full border border-stone-300" />
              )}
              <span className={i < visibleCount ? 'text-stone-700' : 'text-stone-400'}>{step}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
