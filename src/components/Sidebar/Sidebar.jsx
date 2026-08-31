import Icon from '../UI/Icon'
import { QUICK_ACTIONS, RECENT_CONVERSATIONS } from '../../data/mockData'

export default function Sidebar({ currentUser, onNewChat, onSelectPrompt, onLogout, onClose }) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-brand-700 font-display text-sm font-bold text-accent-300">
            C
          </div>
          <span className="font-display text-sm font-semibold text-stone-900">Campus Copilot</span>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="rounded-md p-1 text-stone-400 hover:bg-stone-100 lg:hidden">
            <Icon name="X" className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center gap-2 border border-stone-200 bg-stone-50/60 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-brand-300 hover:bg-brand-50"
        >
          <Icon name="Plus" className="h-4 w-4 text-brand-600" />
          New Chat
        </button>
      </div>

      <div className="mt-5 px-3">
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-stone-400">Quick Actions</p>
        <div className="space-y-0.5">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => onSelectPrompt(action.prompt)}
              className="flex w-full items-center gap-2.5 px-2.5 py-1.5 border-l-2 border-transparent hover:border-brand-300 text-left text-sm text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
            >
              <Icon name={action.icon} className="h-3.5 w-3.5 text-stone-400" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex-1 overflow-y-auto px-3">
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-stone-400">Recent Conversations</p>
        <div className="space-y-3">
          {RECENT_CONVERSATIONS.map((group) => (
            <div key={group.group}>
              <p className="mb-1 px-1 text-[11px] font-medium text-stone-400">{group.group}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="block w-full truncate px-2.5 py-1.5 border-l-2 border-transparent hover:border-brand-300 text-left text-sm text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-200 px-3 py-3">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-brand-700 text-sm font-semibold text-accent-300">
            {currentUser.firstName?.[0] ?? '?'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-stone-900">{currentUser.fullName}</p>
            <p className="truncate text-xs text-stone-400">
              {currentUser.rollNo} · {currentUser.department === 'Computer Science' ? 'CSE' : currentUser.department} · Semester {currentUser.semester}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-2 flex w-full items-center gap-2 border-l-2 border-transparent px-2.5 py-1.5 text-sm text-stone-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
        >
          <Icon name="LogOut" className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </div>
  )
}
