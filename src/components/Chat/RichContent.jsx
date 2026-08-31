import Icon from '../UI/Icon'

function Card({ children }) {
  return (
    <div className="max-w-md border-l-2 border-brand-600 bg-white p-4 shadow-subtle">{children}</div>
  )
}

export function AttendanceCard({ data, onWhatIf }) {
  const belowMin = data.percentage < data.minRequired
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">{data.subject} Attendance</p>
      <p className="mt-1 text-3xl font-semibold text-stone-900">{data.percentage}%</p>
      <p className="mt-0.5 text-sm text-stone-500">
        {data.attended} / {data.total} classes
      </p>
      <div className="mt-3 h-1 w-full overflow-hidden bg-stone-100">
        <div
          className={`h-full ${belowMin ? 'bg-amber-500' : 'bg-emerald-500'}`}
          style={{ width: `${Math.min(data.percentage, 100)}%` }}
        />
      </div>
      {belowMin ? (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-amber-700">
          <Icon name="AlertTriangle" className="h-3.5 w-3.5" />
          Below {data.minRequired}% requirement
        </p>
      ) : (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-emerald-700">
          <Icon name="Check" className="h-3.5 w-3.5" />
          Above {data.minRequired}% requirement
        </p>
      )}
      {onWhatIf && (
        <button
          type="button"
          onClick={onWhatIf}
          className="mt-3 rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
        >
          Calculate What-If
        </button>
      )}
    </Card>
  )
}

export function FeesCard({ data }) {
  const pct = Math.round((data.paid / data.total) * 100)
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Semester {data.semester} Fees</p>
      <div className="mt-2 space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-500">Total</span>
          <span className="font-medium text-stone-900">₹{data.total.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">Paid</span>
          <span className="font-medium text-stone-900">₹{data.paid.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between border-t border-stone-100 pt-1.5">
          <span className="text-stone-500">Remaining</span>
          <span className="font-semibold text-brand-700">₹{data.remaining.toLocaleString('en-IN')}</span>
        </div>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden bg-stone-100">
        <div className="h-full bg-brand-500" style={{ width: `${pct}%` }} />
      </div>
      {data.dueDate && <p className="mt-2 text-xs text-stone-400">Due by {data.dueDate}</p>}
    </Card>
  )
}

export function ScheduleCard({ data }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">{data.label}</p>
      <ul className="mt-2 divide-y divide-stone-100">
        {data.items.map((item) => (
          <li key={`${item.time}-${item.subject}`} className="flex items-center justify-between py-2 text-sm">
            <span className="w-20 shrink-0 font-medium text-stone-500">{item.time}</span>
            <span className="flex-1 text-stone-900">{item.subject}</span>
            {item.room && <span className="text-xs text-stone-400">{item.room}</span>}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function AssignmentsCard({ data }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Due Assignments</p>
      <ul className="mt-2 space-y-2">
        {data.items.map((a) => (
          <li key={a.id} className="rounded-lg border border-stone-100 px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-900">{a.title}</span>
              <span className="bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                Due {a.dueDate}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-stone-400">{a.subject}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function ExamsCard({ data }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Upcoming Exams</p>
      <ul className="mt-2 divide-y divide-stone-100">
        {data.items.map((e) => (
          <li key={e.subject} className="py-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-stone-900">{e.subject}</span>
              <span className="text-xs text-stone-400">{e.type}</span>
            </div>
            <p className="mt-0.5 text-xs text-stone-500">{e.date}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function PolicyCard({ data }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">College Policy</p>
      <p className="mt-1 text-sm font-semibold text-stone-900">{data.title}</p>
      <p className="mt-1 text-sm text-stone-600">{data.summary}</p>
    </Card>
  )
}

export default function RichContent({ type, data, onWhatIf }) {
  if (!data) return null
  switch (type) {
    case 'attendance':
      return <AttendanceCard data={data} onWhatIf={onWhatIf} />
    case 'fees':
      return <FeesCard data={data} />
    case 'schedule':
      return <ScheduleCard data={data} />
    case 'assignments':
      return <AssignmentsCard data={data} />
    case 'exams':
      return <ExamsCard data={data} />
    case 'policy':
      return <PolicyCard data={data} />
    default:
      return null
  }
}
