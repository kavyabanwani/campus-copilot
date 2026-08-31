import { useEffect, useRef, useState } from 'react'
import Icon from '../UI/Icon'
import Sidebar from '../Sidebar/Sidebar'
import EmptyState from '../Suggestions/EmptyState'
import QuickActions from '../Suggestions/QuickActions'
import ProactiveInsights from './ProactiveInsights'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import ChatInput from './ChatInput'
import { sendMessage } from '../../services/chatService'

let messageIdCounter = 0
function nextId() {
  messageIdCounter += 1
  return `msg-${messageIdCounter}`
}

export default function ChatWorkspace({ currentUser, onLogout }) {
  const [messages, setMessages] = useState([])
  const [isAssistantTyping, setIsAssistantTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    setMessages([
      {
        id: nextId(),
        role: 'assistant',
        content: `Hi ${currentUser.firstName}! How can I help you today?`,
      },
    ])
  }, [currentUser.firstName])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isAssistantTyping])

  async function handleSend(text) {
    const userMessage = { id: nextId(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setIsAssistantTyping(true)

    try {
      const response = await sendMessage(text, currentUser)
      setIsAssistantTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: response.content,
          type: response.type,
          data: response.data,
          sources: response.sources,
          activitySteps: response.activitySteps,
        },
      ])
    } catch {
      setIsAssistantTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: "Sorry, I couldn't process that right now. Please try again.",
        },
      ])
    }
  }

  function handleWhatIf(attendanceData) {
    handleSend(`What if I skip another ${attendanceData.subject} class?`)
  }

  function handleNewChat() {
    setMessages([
      {
        id: nextId(),
        role: 'assistant',
        content: `Hi ${currentUser.firstName}! How can I help you today?`,
      },
    ])
    setSidebarOpen(false)
  }

  const hasUserMessages = messages.some((m) => m.role === 'user')

  return (
    <div className="flex h-screen w-full overflow-hidden bg-stone-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-stone-200 lg:block">
        <Sidebar
          currentUser={currentUser}
          onNewChat={handleNewChat}
          onSelectPrompt={handleSend}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-stone-900/30" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
            <Sidebar
              currentUser={currentUser}
              onNewChat={handleNewChat}
              onSelectPrompt={(p) => {
                handleSend(p)
                setSidebarOpen(false)
              }}
              onLogout={onLogout}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-stone-200 bg-white px-4 py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 lg:hidden"
          >
            <Icon name="Menu" className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
            <span className="truncate font-display font-semibold text-stone-900">
              {currentUser.department === 'Computer Science' ? 'CSE' : currentUser.department}
            </span>
            <span className="text-stone-300">·</span>
            <span className="shrink-0 truncate text-stone-500">Semester {currentUser.semester}</span>
          </div>
          <p className="hidden shrink-0 text-sm text-stone-500 sm:block">
            Hi {currentUser.firstName} 👋
          </p>
          <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-brand-700 text-xs font-semibold text-accent-300 sm:flex">
            {currentUser.firstName?.[0] ?? '?'}
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {!hasUserMessages ? (
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <EmptyState firstName={currentUser.firstName} onSelectPrompt={handleSend} />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl py-4">
              <ProactiveInsights />
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} onWhatIf={handleWhatIf} />
              ))}
              {isAssistantTyping && <TypingIndicator />}
            </div>
          )}
        </div>

        {hasUserMessages && (
          <div className="shrink-0 border-t border-stone-100 bg-stone-50/60">
            <div className="mx-auto max-w-3xl">
              <QuickActions onSelectPrompt={handleSend} />
            </div>
          </div>
        )}
        <ChatInput onSend={handleSend} disabled={isAssistantTyping} />
      </div>
    </div>
  )
}
