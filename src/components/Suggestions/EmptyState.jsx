import Icon from '../UI/Icon'
import { QUICK_ACTIONS } from '../../data/mockData'

export default function EmptyState({ firstName, onSelectPrompt }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">Good to see you</p>
      <h2 className="mt-1.5 font-display text-2xl font-semibold text-stone-900">
        What can I help with, {firstName}?
      </h2>
      <p className="mt-1.5 text-sm text-stone-500">Pick a topic, or type your own question below.</p>

      <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelectPrompt(action.prompt)}
            className="group flex flex-col items-start gap-2.5 border border-stone-200 bg-white px-3.5 py-3.5 text-left transition hover:border-brand-400"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-stone-200 text-brand-600 transition group-hover:border-brand-300 group-hover:bg-brand-50">
              <Icon name={action.icon} className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-stone-800">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
