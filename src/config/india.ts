import { editorial, blogImages } from './media'

/**
 * India home page content.
 *
 * Every string, figure and link on the India home page comes from this file,
 * transcribed from the approved comp. It is deliberately separate from
 * src/content/countries.ts: that file feeds the shared global template, while
 * the India home is art-directed on its own (see src/components/india/).
 *
 * NOTE(client) — the client names in `clientLogos`, `caseStudies` and
 * `testimonials` are taken from the comp and are rendered as plain styled
 * wordmarks, not as trademarked logo artwork. Swap in licensed SVG assets and
 * confirm testimonial attributions with each client before launch. The
 * revenue, ROAS and retention figures are likewise the comp's numbers and
 * should be signed off as claims before they go live.
 */

export const indiaContact = {
  phone: '+91 93546 61950',
  /** tel: needs the number unspaced. */
  phoneHref: 'tel:+919354661950',
  email: 'hello@ftsocialcrew.com',
  emailHref: 'mailto:hello@ftsocialcrew.com',
  address: [
    '3rd Floor, Plot No. 18,',
    'Sector 5, B Block,',
    'Uttam Nagar, Delhi - 110059',
  ],
} as const

export const indiaNav = [
  { label: 'Home', href: '/in/' },
  { label: 'About Us', href: '/in/about/' },
  {
    label: 'Services',
    href: '/in/services/',
    children: [
      { label: 'Social Media Marketing', href: '/in/social-media-management/' },
      { label: 'Search Engine Optimization', href: '/in/seo-services/' },
      { label: 'Google Ads & PPC', href: '/in/paid-advertising/' },
      { label: 'Content Marketing', href: '/in/content-marketing/' },
      { label: 'Performance Marketing', href: '/in/growth-consulting/' },
      { label: 'Analytics & Reporting', href: '/in/analytics-reporting/' },
    ],
  },
  {
    label: 'Industries',
    href: '/in/industries/',
    children: [
      { label: 'Healthcare', href: '/in/industries/healthcare/' },
      { label: 'Real Estate', href: '/in/industries/real-estate/' },
      { label: 'E-commerce', href: '/in/industries/ecommerce/' },
      { label: 'Education', href: '/in/industries/education/' },
      { label: 'Hospitality', href: '/in/industries/hospitality/' },
      { label: 'SaaS', href: '/in/industries/saas/' },
    ],
  },
  { label: 'Case Studies', href: '/in/case-studies/' },
  { label: 'Blog', href: '/in/blog/' },
  { label: 'Contact Us', href: '/in/contact/' },
] as const

export const indiaHero = {
  eyebrow: 'Digital Marketing Agency in Delhi NCR',
  headline: 'Digital Strategies.',
  headlineAccent: 'Real Results.',
  body: 'We help brands in Delhi NCR and beyond grow with performance-driven digital marketing that delivers leads, builds visibility and maximizes ROI.',
  primaryCta: { label: 'Get Free Strategy Call', href: '/in/contact/' },
  secondaryCta: { label: 'Explore Services', href: '/in/services/' },
  image: editorial.team,
  imageAlt:
    'The Ft. Social Crew campaign team reviewing performance dashboards together',
  assurances: [
    {
      title: 'Result Driven',
      description: 'Focused on measurable growth & ROI',
    },
    {
      title: 'Customized Strategy',
      description: 'Tailored strategies for your business goals',
    },
    {
      title: 'Transparent Reporting',
      description: 'Real-time reports with complete transparency',
    },
    {
      title: 'ROI Focused',
      description: 'Every campaign optimized for better returns',
    },
  ],
  /** The floating metric cards overlaid on the hero photograph. */
  metrics: {
    leads: { label: 'Leads Generated', value: '12,540', delta: '32.5%', note: 'this month' },
    roas: { label: 'ROAS', value: '4.8x', delta: '26%', note: 'this month' },
    revenue: { label: 'Revenue Growth', value: '₹48.7L', delta: '28.4%', note: 'this month' },
    campaigns: { label: 'Active Campaigns', value: '24', note: 'Running Now' },
  },
} as const

export const indiaClientLogos = [
  'MAX Healthcare',
  'CARRARO',
  'SKYJUMPP',
  'RATTAN INDIA',
  'Dr. Morepen',
  'BAJAJ FINSERV',
  'TATA',
  'acer',
  'POLYCAB',
] as const

export const indiaServices = [
  {
    icon: 'megaphone',
    title: 'Social Media Marketing',
    description:
      'Build brand awareness and engage your audience on social platforms.',
    href: '/in/social-media-management/',
  },
  {
    icon: 'search',
    title: 'Search Engine Optimization',
    description: 'Improve rankings, get discovered and drive organic traffic.',
    href: '/in/seo-services/',
  },
  {
    icon: 'target',
    title: 'Google Ads & PPC',
    description:
      'Run targeted ad campaigns that bring high-quality leads and ROI.',
    href: '/in/paid-advertising/',
  },
  {
    icon: 'pen',
    title: 'Content Marketing',
    description:
      'Compelling content that connects, converts and builds authority.',
    href: '/in/content-marketing/',
  },
  {
    icon: 'chart',
    title: 'Performance Marketing',
    description:
      'Data-driven campaigns focused on measurable results and ROI.',
    href: '/in/growth-consulting/',
  },
  {
    icon: 'pie',
    title: 'Analytics & Reporting',
    description: 'Track performance with insightful reports and smart analytics.',
    href: '/in/analytics-reporting/',
  },
] as const

export const indiaStats = [
  { icon: 'shield', value: '350+', label: 'Projects Delivered' },
  { icon: 'users', value: '150+', label: 'Happy Clients' },
  { icon: 'heart', value: '₹50Cr+', label: 'Revenue Generated' },
  { icon: 'building', value: '8+', label: 'Years of Experience' },
  { icon: 'lock', value: '98%', label: 'Client Retention Rate' },
] as const

export const indiaCaseStudies = [
  {
    client: 'Dr. Morepen',
    industry: 'Healthcare',
    href: '/in/case-studies/',
    results: [
      { value: '215%', label: 'Increase in Leads' },
      { value: '4.2x', label: 'ROAS Achieved' },
      { value: '180%', label: 'Revenue Growth' },
    ],
  },
  {
    client: 'SKYJUMPP',
    industry: 'Real Estate',
    href: '/in/case-studies/',
    results: [
      { value: '163%', label: 'Increase in Leads' },
      { value: '3.8x', label: 'ROAS Achieved' },
      { value: '140%', label: 'Sales Growth' },
    ],
  },
  {
    client: 'RATTAN INDIA',
    industry: 'E-commerce',
    href: '/in/case-studies/',
    results: [
      { value: '220%', label: 'Increase in Traffic' },
      { value: '5.1x', label: 'ROAS Achieved' },
      { value: '185%', label: 'Revenue Growth' },
    ],
  },
] as const

export const indiaProcess = [
  {
    icon: 'shield',
    title: 'Discover',
    description: 'Understand your business, objectives and target audience.',
  },
  {
    icon: 'users',
    title: 'Strategize',
    description: 'Create a customized strategy tailored to your goals.',
  },
  {
    icon: 'target',
    title: 'Execute',
    description: 'Launch data-driven campaigns that deliver results.',
  },
  {
    icon: 'chart',
    title: 'Optimize',
    description: 'Continuously analyze and optimize for maximum ROI.',
  },
  {
    icon: 'scale',
    title: 'Scale',
    description: 'Scale what works and drive sustainable growth.',
  },
] as const

export const indiaTestimonials = [
  {
    quote:
      'FT Social Crew has been a game-changer for our business. Their strategies and execution helped us scale our leads and build a strong online presence.',
    name: 'Dr. Morepen',
    role: 'Marketing Head',
    client: 'Dr. Morepen',
  },
  {
    quote:
      'The team is professional, responsive and truly invested in our growth. Highly recommended for performance marketing!',
    name: 'Skyjumpp',
    role: 'Business Head',
    client: 'SKYJUMPP',
  },
  {
    quote:
      'Excellent results with Google Ads and SEO. Our revenue has grown consistently since we started working with them.',
    name: 'RattanIndia',
    role: 'Digital Head',
    client: 'RATTAN INDIA',
  },
  {
    quote:
      'They rebuilt our entire search presence in under two quarters. The reporting is honest, and the numbers hold up when we audit them ourselves.',
    name: 'Max Healthcare',
    role: 'Growth Lead',
    client: 'MAX Healthcare',
  },
] as const

export const indiaBlogPosts = [
  {
    category: 'Social Media',
    date: 'May 15, 2024',
    title: "Top Social Media Trends in 2024 That You Can't Ignore",
    href: '/in/blog/',
    image: blogImages[0],
  },
  {
    category: 'SEO',
    date: 'May 08, 2024',
    title: '10 Proven SEO Strategies to Rank Higher on Google',
    href: '/in/blog/',
    image: blogImages[1],
  },
  {
    category: 'PPC',
    date: 'Apr 30, 2024',
    title: 'Google Ads Best Practices for Maximum ROI',
    href: '/in/blog/',
    image: blogImages[2],
  },
  {
    category: 'Marketing',
    date: 'Apr 22, 2024',
    title: 'How Content Marketing Drives Long-Term Growth for Brands',
    href: '/in/blog/',
    image: blogImages[3],
  },
] as const

export const indiaFooter = {
  blurb:
    'A leading digital marketing agency in Delhi NCR, helping businesses grow with data-driven strategies and creative solutions.',
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/in/' },
        { label: 'About Us', href: '/in/about/' },
        { label: 'Services', href: '/in/services/' },
        { label: 'Case Studies', href: '/in/case-studies/' },
        { label: 'Blog', href: '/in/blog/' },
        { label: 'Contact Us', href: '/in/contact/' },
      ],
    },
    {
      title: 'Our Services',
      links: [
        { label: 'Social Media Marketing', href: '/in/social-media-management/' },
        { label: 'Search Engine Optimization', href: '/in/seo-services/' },
        { label: 'Google Ads & PPC', href: '/in/paid-advertising/' },
        { label: 'Content Marketing', href: '/in/content-marketing/' },
        { label: 'Performance Marketing', href: '/in/growth-consulting/' },
        { label: 'Analytics & Reporting', href: '/in/analytics-reporting/' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { label: 'Healthcare', href: '/in/industries/healthcare/' },
        { label: 'Real Estate', href: '/in/industries/real-estate/' },
        { label: 'E-commerce', href: '/in/industries/ecommerce/' },
        { label: 'Education', href: '/in/industries/education/' },
        { label: 'Retail', href: '/in/industries/hospitality/' },
        { label: 'Startups', href: '/in/industries/saas/' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/in/privacy/' },
    { label: 'Terms & Conditions', href: '/in/terms/' },
  ],
  copyright: '© 2024 FT Social Crew. All Rights Reserved.',
} as const
