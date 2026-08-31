import { useState } from 'react'
import Icon from '../UI/Icon'

const DEPARTMENTS = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
]

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            <Icon name={icon} className="h-4 w-4" />
          </span>
        )}
        {children}
      </div>
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-stone-300 bg-white py-2.5 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition'

export default function AuthScreen({ onAuthenticated }) {
  const [tab, setTab] = useState('login')
  const [error, setError] = useState('')

  const [loginForm, setLoginForm] = useState({ rollNo: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    rollNo: '',
    department: DEPARTMENTS[0],
    semester: '1',
    password: '',
  })

  function handleLogin(e) {
    e.preventDefault()
    if (!loginForm.rollNo.trim() || !loginForm.password.trim()) {
      setError('Please enter your enrollment number and password.')
      return
    }
    setError('')
    const firstName = 'Aarav'
    onAuthenticated({
      fullName: 'Aarav Sharma',
      firstName,
      rollNo: loginForm.rollNo.trim(),
      department: 'Computer Science',
      semester: 4,
    })
  }

  function handleRegister(e) {
    e.preventDefault()
    if (!registerForm.fullName.trim() || !registerForm.rollNo.trim() || !registerForm.password.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    const firstName = registerForm.fullName.trim().split(' ')[0]
    onAuthenticated({
      fullName: registerForm.fullName.trim(),
      firstName,
      rollNo: registerForm.rollNo.trim(),
      department: registerForm.department,
      semester: Number(registerForm.semester),
    })
  }

  return (
    <div className="flex min-h-screen w-full bg-stone-50">
      {/* Brand panel */}
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-brand-800 px-10 py-12 text-white lg:flex">
        <div className="pointer-events-none absolute inset-6 rounded-sm border border-white/10" aria-hidden="true" />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-accent-300/50 font-display text-base font-bold text-accent-300">
            C
          </div>
          <span className="font-display text-base font-semibold tracking-wide">CAMPUS COPILOT</span>
        </div>

        <div className="relative">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300/90">Student Portal</p>
          <h1 className="font-display text-3xl font-semibold leading-snug">
            Attendance, fees and exams — <em className="italic">answered</em>, not searched for.
          </h1>
          <p className="mt-4 max-w-md text-sm text-brand-100/70">
            Ask a question in plain language and get the exact record behind it, sourced from your enrollment.
          </p>

          <ol className="mt-10 divide-y divide-white/10 border-t border-white/10">
            {[
              ['01', 'Attendance', 'Live percentages and "what-if I skip" projections'],
              ['02', 'Fees', 'Balance due and payment deadlines'],
              ['03', 'Exams', 'Schedule, synced to your semester'],
            ].map(([n, title, desc]) => (
              <li key={n} className="flex items-baseline gap-4 py-3.5 text-sm">
                <span className="font-display text-accent-300/80">{n}</span>
                <span className="font-medium text-white">{title}</span>
                <span className="text-brand-100/60">{desc}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="relative text-xs text-brand-200/50">© {new Date().getFullYear()} Campus Copilot · Prototype build</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-1 items-center justify-center px-4 py-10 lg:w-[56%]">
        <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center lg:hidden">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-sm bg-brand-700 font-display text-lg font-bold text-accent-300 shadow-subtle">
            C
          </div>
          <h1 className="font-display text-xl font-semibold text-stone-900">Campus Copilot</h1>
          <p className="mt-1 text-sm text-stone-500">Your intelligent college assistant</p>
        </div>
        <div className="mb-8 hidden text-left lg:block">
          <h2 className="font-display text-2xl font-semibold text-stone-900">Welcome back</h2>
          <p className="mt-1.5 text-sm text-stone-500">Sign in to pick up right where you left off.</p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-panel">
          <div className="mb-6 grid grid-cols-2 rounded-lg bg-stone-100 p-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                setTab('login')
                setError('')
              }}
              className={`rounded-md py-2 transition ${
                tab === 'login' ? 'bg-white text-stone-900 shadow-subtle' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register')
                setError('')
              }}
              className={`rounded-md py-2 transition ${
                tab === 'register' ? 'bg-white text-stone-900 shadow-subtle' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {tab === 'login' ? (
            <form className="space-y-4" onSubmit={handleLogin}>
              <Field label="Enrollment / Roll Number" icon="Hash">
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="0101CS221045"
                  value={loginForm.rollNo}
                  onChange={(e) => setLoginForm((f) => ({ ...f, rollNo: e.target.value }))}
                />
              </Field>
              <Field label="Password" icon="Lock">
                <input
                  type="password"
                  className={`${inputClass} pl-9`}
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                />
              </Field>
              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-brand-700 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Log in
              </button>
              <p className="text-center text-xs text-stone-400">This is a prototype — any credentials will work.</p>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              <Field label="Full Name" icon="User">
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="Aarav Sharma"
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm((f) => ({ ...f, fullName: e.target.value }))}
                />
              </Field>
              <Field label="Enrollment / Roll Number" icon="Hash">
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="0101CS221045"
                  value={registerForm.rollNo}
                  onChange={(e) => setRegisterForm((f) => ({ ...f, rollNo: e.target.value }))}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Department" icon="Building2">
                  <select
                    className={`${inputClass} pl-9 appearance-none`}
                    value={registerForm.department}
                    onChange={(e) => setRegisterForm((f) => ({ ...f, department: e.target.value }))}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Semester" icon="GraduationCap">
                  <select
                    className={`${inputClass} pl-9 appearance-none`}
                    value={registerForm.semester}
                    onChange={(e) => setRegisterForm((f) => ({ ...f, semester: e.target.value }))}
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Password" icon="Lock">
                <input
                  type="password"
                  className={`${inputClass} pl-9`}
                  placeholder="Create a password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm((f) => ({ ...f, password: e.target.value }))}
                />
              </Field>
              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-brand-700 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Create account
              </button>
            </form>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
