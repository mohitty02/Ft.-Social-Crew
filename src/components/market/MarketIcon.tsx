import {
  Megaphone,
  Search,
  Target,
  PenLine,
  PenTool,
  BarChart3,
  PieChart,
  ShieldCheck,
  Users,
  HeartHandshake,
  Building2,
  Lock,
  TrendingUp,
  MessageCircle,
  Layout,
  Palette,
  Workflow,
  Compass,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/**
 * Icon registry for the market layout.
 *
 * Two naming schemes land here and both have to resolve: the lowercase names
 * authored in `src/content/marketHome.ts`, and the PascalCase names the
 * service taxonomy in `src/config/services.ts` already uses. The map is closed
 * and falls back rather than crashing a build.
 */
const registry: Record<string, LucideIcon> = {
  // marketHome.ts
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

  // services.ts taxonomy
  Search,
  Target,
  MessageCircle,
  PenTool,
  Layout,
  Palette,
  TrendingUp,
  Workflow,
  Compass,
  BarChart3,
}

export function MarketIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Glyph = registry[name] ?? Compass
  return (
    <Glyph
      className={cn('h-5 w-5', className)}
      strokeWidth={1.75}
      aria-hidden="true"
    />
  )
}
