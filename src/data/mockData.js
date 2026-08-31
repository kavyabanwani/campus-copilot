// Mock student data. In production this will be fetched from the
// FastAPI backend (SQLite-backed) after authentication.

export const MOCK_STUDENT = {
  fullName: 'Aarav Sharma',
  firstName: 'Aarav',
  rollNo: '0101CS221045',
  department: 'Computer Science',
  semester: 4,
  password: 'demo1234', // demo only, never do this in production
}

export const ATTENDANCE = [
  { subject: 'DBMS', percentage: 72.5, attended: 29, total: 40, minRequired: 75 },
  { subject: 'Operating Systems', percentage: 81, attended: 34, total: 42, minRequired: 75 },
  { subject: 'Artificial Intelligence', percentage: 88, attended: 35, total: 40, minRequired: 75 },
  { subject: 'Mathematics', percentage: 76, attended: 30, total: 40, minRequired: 75 },
]

export const FEES = {
  semester: 4,
  total: 42000,
  paid: 30000,
  remaining: 12000,
  dueDate: 'Sept 15, 2026',
}

export const TOMORROW_SCHEDULE = [
  { time: '10:00 AM', subject: 'DBMS', room: 'Room 204' },
  { time: '12:00 PM', subject: 'Operating Systems', room: 'Room 118' },
  { time: '2:00 PM', subject: 'AI Lab', room: 'Lab 3' },
]

export const WEEK_SCHEDULE = {
  Monday: [
    { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101' },
    { time: '11:00 AM', subject: 'DBMS', room: 'Room 204' },
  ],
  Tuesday: [
    { time: '10:00 AM', subject: 'DBMS', room: 'Room 204' },
    { time: '12:00 PM', subject: 'Operating Systems', room: 'Room 118' },
    { time: '2:00 PM', subject: 'AI Lab', room: 'Lab 3' },
  ],
  Wednesday: [{ time: '9:00 AM', subject: 'Artificial Intelligence', room: 'Room 220' }],
}

export const ASSIGNMENTS = [
  { id: 1, subject: 'DBMS', title: 'Normalization Exercise Set', dueDate: 'Sept 2, 2026', status: 'pending' },
  { id: 2, subject: 'Operating Systems', title: 'Process Scheduling Report', dueDate: 'Sept 4, 2026', status: 'pending' },
  { id: 3, subject: 'Artificial Intelligence', title: 'Search Algorithms Lab', dueDate: 'Sept 5, 2026', status: 'pending' },
]

export const EXAMS = [
  { subject: 'Artificial Intelligence', date: 'Sept 5, 2026 (Friday)', type: 'Mid-Semester' },
  { subject: 'DBMS', date: 'Sept 9, 2026 (Tuesday)', type: 'Mid-Semester' },
  { subject: 'Operating Systems', date: 'Sept 11, 2026 (Thursday)', type: 'Mid-Semester' },
]

export const POLICIES = [
  {
    title: 'Minimum Attendance Requirement',
    summary: 'Students must maintain at least 75% attendance in each subject to be eligible to sit for semester exams.',
    source: 'Academic Attendance Policy',
    page: 14,
  },
  {
    title: 'Fee Payment Deadline',
    summary: 'Remaining semester fees must be cleared before the last working day of the semester to avoid a late fee.',
    source: 'Fee Structure & Payment Policy',
    page: 6,
  },
  {
    title: 'Condonation of Attendance Shortage',
    summary: 'Students between 65% and 75% attendance may apply for condonation with a valid medical or personal reason.',
    source: 'Academic Attendance Policy',
    page: 15,
  },
]

export const SUGGESTED_PROMPTS = [
  "Can I skip tomorrow's DBMS class?",
  'How much fee do I have left?',
  'What classes do I have tomorrow?',
  'What assignments are due this week?',
  'When is my next exam?',
  'What is the minimum attendance requirement?',
]

export const QUICK_ACTIONS = [
  { id: 'attendance', label: 'My Attendance', icon: 'BarChart3', prompt: 'Show me my attendance summary' },
  { id: 'fees', label: 'Pending Fees', icon: 'Wallet', prompt: 'How much fee do I have left?' },
  { id: 'schedule', label: "Tomorrow's Classes", icon: 'CalendarDays', prompt: 'What classes do I have tomorrow?' },
  { id: 'assignments', label: 'Due Assignments', icon: 'FileText', prompt: 'What assignments are due this week?' },
  { id: 'exams', label: 'Upcoming Exams', icon: 'BookOpen', prompt: 'When is my next exam?' },
  { id: 'policies', label: 'College Policies', icon: 'ScrollText', prompt: 'What is the minimum attendance requirement?' },
]

export const RECENT_CONVERSATIONS = [
  {
    group: 'Today',
    items: ['DBMS attendance', 'Fee status', "Tomorrow's classes"],
  },
  {
    group: 'Yesterday',
    items: ['Exam schedule'],
  },
]

export function getProactiveInsights() {
  const insights = []
  const lowAttendance = ATTENDANCE.filter((a) => a.percentage < a.minRequired)
  lowAttendance.forEach((a) => {
    insights.push({
      icon: 'AlertTriangle',
      tone: 'warning',
      text: `${a.subject} attendance is below ${a.minRequired}% (currently ${a.percentage}%).`,
    })
  })
  if (ASSIGNMENTS.length > 0) {
    insights.push({
      icon: 'BookMarked',
      tone: 'info',
      text: `${ASSIGNMENTS.length} assignments are due this week.`,
    })
  }
  if (EXAMS.length > 0) {
    insights.push({
      icon: 'CalendarClock',
      tone: 'info',
      text: `Next exam: ${EXAMS[0].subject} — ${EXAMS[0].date.split(' (')[1]?.replace(')', '') || EXAMS[0].date}.`,
    })
  }
  return insights
}
