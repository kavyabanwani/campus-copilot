import Icon from '../UI/Icon'
import { QUICK_ACTIONS } from '../../data/mockData'

export default function QuickActions({ onSelectPrompt }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-4 py-2">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onSelectPrompt(action.prompt)}
          className="flex items-center gap-1.5 border-b border-transparent py-0.5 text-xs font-medium text-stone-500 transition hover:border-accent-400 hover:text-accent-700"
        >
          <Icon name={action.icon} className="h-3.5 w-3.5" />
          {action.label}
        </button>
      ))}
    </div>
  )
}
