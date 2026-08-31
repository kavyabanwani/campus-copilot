// ---------------------------------------------------------------------------
// chatService.js
//
// FUTURE BACKEND INTEGRATION POINT
// ---------------------------------------------------------------------------
// This module is the single seam between the UI and the assistant "brain".
// Today `sendMessage()` returns canned mock responses built from local data.
//
// In production this function will instead call the FastAPI backend, e.g.:
//
//   const res = await fetch(`${API_BASE_URL}/chat`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ message, userId: currentUser.rollNo }),
//   })
//   return await res.json()
//
// The FastAPI service will run an agent loop (Gemini function calling) that
// invokes Python tools backed by SQLite (attendance, fees, timetable,
// assignments, exams) and a RAG pipeline over the college policy documents.
// The response shape below (`type`, `data`, `activitySteps`, `sources`) is
// designed to match what that agent will eventually return, so the UI layer
// will not need to change.
// ---------------------------------------------------------------------------

import {
  ATTENDANCE,
  FEES,
  TOMORROW_SCHEDULE,
  ASSIGNMENTS,
  EXAMS,
  POLICIES,
} from '../data/mockData'

function findAttendance(text) {
  const subjects = ATTENDANCE.map((a) => a.subject.toLowerCase())
  return ATTENDANCE.find((a) => text.includes(a.subject.toLowerCase())) || null
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildActivitySteps(intent) {
  const steps = {
    attendance: ['Checking attendance records', 'Comparing against college policy', 'Preparing summary'],
    fees: ['Checking fee ledger', 'Calculating remaining balance'],
    schedule: ['Checking timetable', 'Preparing schedule'],
    assignments: ['Checking assignment tracker', 'Filtering by due date'],
    exams: ['Checking exam schedule', 'Sorting by nearest date'],
    policy: ['Searching college policy documents', 'Extracting relevant clause'],
    skip_class: ['Checking attendance', 'Checking timetable', 'Checking college policy', 'Calculating result'],
    default: ['Understanding your question', 'Checking relevant college data'],
  }
  return steps[intent] || steps.default
}

function classifyIntent(rawMessage) {
  const text = rawMessage.toLowerCase()

  if (text.includes('skip') || (text.includes('miss') && text.includes('class'))) return 'skip_class'
  if (text.includes('attendance')) return 'attendance'
  if (text.includes('fee')) return 'fees'
  if (text.includes('class') || text.includes('schedule') || text.includes('timetable')) return 'schedule'
  if (text.includes('assignment') || text.includes('due')) return 'assignments'
  if (text.includes('exam')) return 'exams'
  if (text.includes('polic') || text.includes('requirement') || text.includes('rule')) return 'policy'
  return 'default'
}

function respondSkipClass(text) {
  const subject = findAttendance(text)
  if (subject) {
    const afterSkip = ((subject.attended / (subject.total + 1)) * 100).toFixed(1)
    const safe = Number(afterSkip) >= subject.minRequired
    return {
      type: 'attendance',
      role: 'assistant',
      content: `If you skip tomorrow's ${subject.subject} class, your attendance will drop to about ${afterSkip}%. ${
        safe
          ? "That's still above the 75% requirement, so it should be safe."
          : "That would put you below the 75% requirement — I'd recommend attending instead."
      }`,
      data: { kind: 'attendance', subject: subject.subject, ...subject, whatIf: { afterSkip: Number(afterSkip), safe } },
      sources: [{ title: 'Academic Attendance Policy', page: 14 }],
    }
  }
  return respondAttendance()
}

function respondAttendance(text = '') {
  const subject = findAttendance(text)
  const target = subject || ATTENDANCE[0]
  return {
    type: 'attendance',
    role: 'assistant',
    content: `Here's your ${target.subject} attendance:`,
    data: { kind: 'attendance', ...target },
    sources: [{ title: 'Academic Attendance Policy', page: 14 }],
  }
}

function respondFees() {
  return {
    type: 'fees',
    role: 'assistant',
    content: `Here's your fee status for Semester ${FEES.semester}:`,
    data: { kind: 'fees', ...FEES },
    sources: [{ title: 'Fee Structure & Payment Policy', page: 6 }],
  }
}

function respondSchedule() {
  return {
    type: 'schedule',
    role: 'assistant',
    content: 'Here is your schedule for tomorrow:',
    data: { kind: 'schedule', label: 'Tomorrow', items: TOMORROW_SCHEDULE },
  }
}

function respondAssignments() {
  return {
    type: 'assignments',
    role: 'assistant',
    content: `You have ${ASSIGNMENTS.length} assignments due this week:`,
    data: { kind: 'assignments', items: ASSIGNMENTS },
  }
}

function respondExams() {
  return {
    type: 'exams',
    role: 'assistant',
    content: 'Here are your upcoming exams:',
    data: { kind: 'exams', items: EXAMS },
  }
}

function respondPolicy() {
  const policy = POLICIES[0]
  return {
    type: 'policy',
    role: 'assistant',
    content: `${policy.summary}`,
    data: { kind: 'policy', ...policy },
    sources: [{ title: policy.source, page: policy.page }],
  }
}

function respondDefault(rawMessage) {
  return {
    type: 'text',
    role: 'assistant',
    content: `I can help with attendance, fees, timetable, assignments, exams, and college policies. Could you tell me a bit more about "${rawMessage}"?`,
    data: null,
  }
}

const handlers = {
  skip_class: respondSkipClass,
  attendance: respondAttendance,
  fees: respondFees,
  schedule: respondSchedule,
  assignments: respondAssignments,
  exams: respondExams,
  policy: respondPolicy,
  default: respondDefault,
}

/**
 * sendMessage — mock implementation of the assistant response pipeline.
 * Signature matches the eventual FastAPI-backed call so the UI never
 * needs to change when the real backend is wired up.
 *
 * @param {string} message
 * @param {object} currentUser
 * @returns {Promise<{content: string, type: string, data: object|null, activitySteps: string[], sources?: object[]}>}
 */
export async function sendMessage(message, currentUser) {
  const intent = classifyIntent(message)
  const activitySteps = buildActivitySteps(intent)

  // Simulate network + agent "thinking" latency.
  await delay(650 + Math.random() * 500)

  const handler = handlers[intent] || handlers.default
  const result = handler(message.toLowerCase(), currentUser)

  return {
    ...result,
    activitySteps,
  }
}
