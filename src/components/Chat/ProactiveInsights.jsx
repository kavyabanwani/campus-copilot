import Icon from '../UI/Icon'
import { getProactiveInsights } from '../../data/mockData'

export default function ProactiveInsights() {
  const insights = getProactiveInsights()
  if (insights.length === 0) return null

  return (
    <div className="mx-4 mb-2 rounded-xl border border-stone-200 bg-white px-4 py-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Copilot noticed</p>
      <ul className="space-y-1.5">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
            <Icon
              name={insight.icon}
              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                insight.tone === 'warning' ? 'text-amber-500' : 'text-brand-500'
              }`}
            />
            <span>{insight.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
