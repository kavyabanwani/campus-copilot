import { useState } from 'react'
import Icon from '../UI/Icon'

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')

  function submit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={submit} className="border-t border-stone-200 bg-white px-4 py-3">
      <div className="mx-auto flex max-w-3xl items-end gap-3 border-b border-stone-300 pb-2 transition focus-within:border-brand-500">
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              submit(e)
            }
          }}
          placeholder="Ask about attendance, fees, timetable, exams..."
          className="max-h-32 flex-1 resize-none bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex shrink-0 items-center gap-1.5 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 transition hover:text-brand-900 disabled:cursor-not-allowed disabled:text-stone-300"
        >
          Send
          <Icon name="Send" className="h-3 w-3" />
        </button>
      </div>
      <p className="mx-auto mt-1.5 max-w-3xl text-center text-[11px] text-stone-400">
        Campus Copilot can make mistakes. Verify important information with the registrar.
      </p>
    </form>
  )
}
