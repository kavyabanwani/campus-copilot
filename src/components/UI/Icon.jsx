import {
  BarChart3,
  Wallet,
  CalendarDays,
  FileText,
  BookOpen,
  ScrollText,
  AlertTriangle,
  BookMarked,
  CalendarClock,
  Send,
  Plus,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Loader2,
  Check,
  User,
  Lock,
  Hash,
  GraduationCap,
  Building2,
} from 'lucide-react'

const ICONS = {
  BarChart3,
  Wallet,
  CalendarDays,
  FileText,
  BookOpen,
  ScrollText,
  AlertTriangle,
  BookMarked,
  CalendarClock,
  Send,
  Plus,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Loader2,
  Check,
  User,
  Lock,
  Hash,
  GraduationCap,
  Building2,
}

export default function Icon({ name, className = 'w-4 h-4', ...props }) {
  const Cmp = ICONS[name]
  if (!Cmp) return null
  return <Cmp className={className} {...props} />
}
