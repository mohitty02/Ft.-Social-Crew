import {
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
  HeartPulse,
  Building2,
  Scale,
  Smile,
  Cloud,
  Server,
  Factory,
  HardHat,
  GraduationCap,
  UtensilsCrossed,
  Landmark,
  Car,
  ShoppingBag,
  Briefcase,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icon registry.
 *
 * Icons are imported individually rather than through a barrel so tree-shaking
 * is real and the per-template JS budget holds. The map is closed — a taxonomy
 * entry with an unknown icon falls back rather than crashing the build.
 *
 * Icons never carry meaning alone: every usage in the app is paired with a
 * text label, and decorative instances receive aria-hidden.
 */
const registry: Record<string, LucideIcon> = {
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
  HeartPulse,
  Building2,
  Scale,
  Smile,
  Cloud,
  Server,
  Factory,
  HardHat,
  GraduationCap,
  UtensilsCrossed,
  Landmark,
  Car,
  ShoppingBag,
  Briefcase,
}

export function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: string
  className?: string
}) {
  const Component = registry[name] ?? Compass
  return <Component className={className} aria-hidden="true" strokeWidth={1.5} />
}
