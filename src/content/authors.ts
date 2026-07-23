import type { Author } from '@/types'
import { portraits } from '@/config/media'

/**
 * Author profiles — E-E-A-T "Expertise" plus Person schema (SRS §7.6).
 *
 * PLACEHOLDER DATA. The SRS does not supply founder or team names. Every
 * record is flagged isPlaceholder so the UI can label it honestly; we do not
 * present invented people as verified staff.
 */
export const authors: Author[] = [
  {
    id: 'a-1',
    name: 'A. Sharma',
    role: 'Founder & Growth Principal',
    bio: 'Leads positioning and growth strategy across all six markets. Fifteen years building acquisition systems for SMB and mid-market companies, with a focus on the point where channel economics meet organisational capacity.',
    expertise: ['Growth Strategy', 'Positioning', 'Channel Economics', 'Fractional Leadership'],
    image: portraits[3],
    isPlaceholder: true,
  },
  {
    id: 'a-2',
    name: 'M. Rodrigues',
    role: 'Head of Search',
    bio: 'Owns technical and international SEO across the platform — hreflang architecture, programmatic quality gating, and the crawl-budget discipline that keeps thousands of pages from diluting a domain.',
    expertise: ['Technical SEO', 'International SEO', 'Programmatic SEO', 'Information Architecture'],
    image: portraits[0],
    isPlaceholder: true,
  },
  {
    id: 'a-3',
    name: 'K. Fischer',
    role: 'Principal, Process Engineering',
    bio: 'Leads process automation and digital engineering engagements, primarily in the German Mittelstand. Specialises in documenting undocumented processes before any tool selection happens.',
    expertise: ['Process Automation', 'Systems Integration', 'GDPR Compliance', 'Digital Engineering'],
    image: portraits[1],
    isPlaceholder: true,
  },
  {
    id: 'a-4',
    name: 'S. Whitfield',
    role: 'Performance Director',
    bio: 'Runs paid acquisition against contribution margin rather than platform ROAS. Built the blended-CAC reporting model used across every market we operate in.',
    expertise: ['Paid Media', 'Attribution Modelling', 'Contribution Margin', 'Marketing Analytics'],
    image: portraits[4],
    isPlaceholder: true,
  },
  {
    id: 'a-5',
    name: 'R. Nakamura',
    role: 'Head of Conversion',
    bio: 'Leads research-driven experimentation programmes. Interested primarily in the pages that already carry traffic, on the basis that they are the cheapest growth available to most businesses.',
    expertise: ['Conversion Optimisation', 'UX Research', 'Experimentation', 'Behavioural Analysis'],
    image: portraits[5],
    isPlaceholder: true,
  },
  {
    id: 'a-6',
    name: 'L. Haddad',
    role: 'Principal Consultant, Middle East',
    bio: 'Leads enterprise and government-adjacent engagements across Dubai and Abu Dhabi, bridging strategic advisory with delivery capability in complex systems landscapes.',
    expertise: ['Enterprise Consulting', 'Digital Transformation', 'Stakeholder Strategy', 'Public Sector'],
    image: portraits[6],
    isPlaceholder: true,
  },
]

export function getAuthor(id: string): Author {
  return authors.find((a) => a.id === id) ?? authors[0]
}
