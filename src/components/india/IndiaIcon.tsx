import {
  Megaphone,
  Search,
  Target,
  PenLine,
  BarChart3,
  PieChart,
  ShieldCheck,
  Users,
  HeartHandshake,
  Building2,
  Lock,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/**
 * The India page draws from a fixed, named icon set so `src/config/india.ts`
 * can stay a pure data file with no JSX in it.
 */
const icons = {
  megaphone: Megaphone,
  search: Search,
  target: Target,
  pen: PenLine,
  chart: BarChart3,
  pie: PieChart,
  shield: ShieldCheck,
  users: Users,
  heart: HeartHandshake,
  building: Building2,
  lock: Lock,
  scale: TrendingUp,
} as const

export type IndiaIconName = keyof typeof icons

export function IndiaIcon({
  name,
  className,
}: {
  name: IndiaIconName | string
  className?: string
}) {
  const Glyph = icons[name as IndiaIconName] ?? Target
  return (
    <Glyph
      className={cn('h-5 w-5', className)}
      strokeWidth={1.75}
      aria-hidden="true"
    />
  )
}
