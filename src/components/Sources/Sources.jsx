import Icon from '../UI/Icon'

/**
 * Placeholder Sources panel for future RAG citations. Backend will supply
 * { title, page, snippet? } objects retrieved from the vector index.
 */
export default function Sources({ sources = [] }) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="mt-1.5 max-w-md text-xs">
      <p className="mb-1 font-medium text-stone-400">Sources</p>
      <ul className="space-y-1">
        {sources.map((s, i) => (
          <li
            key={`${s.title}-${i}`}
            className="flex items-center gap-1.5 rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-stone-600"
          >
            <Icon name="FileText" className="h-3 w-3 shrink-0 text-stone-400" />
            <span className="truncate">{s.title}</span>
            {s.page && <span className="ml-auto shrink-0 text-stone-400">Page {s.page}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
