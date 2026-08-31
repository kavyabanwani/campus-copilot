import RichContent from './RichContent'
import Sources from '../Sources/Sources'
import AgentActivity from '../AgentActivity/AgentActivity'

export default function MessageBubble({ message, onWhatIf }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex animate-fadeIn justify-end px-4 py-2.5">
        <div className="max-w-[75%] text-right">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-400">You</p>
          <div className="border-r-2 border-accent-400 pr-3 text-sm leading-relaxed text-stone-800">
            {message.content}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex animate-fadeIn justify-start px-4 py-2.5">
      <div className="max-w-[85%] space-y-2">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-brand-700 font-display text-[9px] font-bold text-accent-300">
            C
          </span>
          Copilot
        </p>
        {message.activitySteps && message.activitySteps.length > 0 && (
          <AgentActivity steps={message.activitySteps} done={!message.isStreaming} />
        )}
        {message.content && (
          <div className="border-l-2 border-brand-300 pl-3 text-sm leading-relaxed text-stone-800">
            {message.content}
          </div>
        )}
        {message.data && (
          <RichContent
            type={message.type}
            data={message.data}
            onWhatIf={message.data.kind === 'attendance' ? () => onWhatIf?.(message.data) : undefined}
          />
        )}
        {message.sources && <Sources sources={message.sources} />}
      </div>
    </div>
  )
}
