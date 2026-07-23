/**
 * Stock imagery, served from the Unsplash CDN.
 *
 * Every image URL in the project lives in this one file. If any asset needs
 * swapping for licensed brand photography later, it is a single-file change —
 * no component or page touches an image URL directly.
 *
 * Sizes are negotiated in the query string because static export runs no
 * image optimiser at request time (see next.config.ts).
 */

const CDN = 'https://images.unsplash.com'

function img(id: string, w = 1600, h?: number): string {
  const crop = h ? `&h=${h}&fit=crop` : '&fit=crop'
  return `${CDN}/${id}?auto=format&q=75&w=${w}${crop}`
}

/** Country hero imagery — SRS §22.3 makes imagery the sanctioned uniqueness lever. */
export const heroImages = {
  'in': img('photo-1524492412937-b28074a5d7da', 1920, 1080),
  'en-us': img('photo-1485738422979-f5c462d49f74', 1920, 1080),
  'en-ca': img('photo-1517935706615-2717063c2225', 1920, 1080),
  'en-au': img('photo-1506973035872-a4ec16b8e8d9', 1920, 1080),
  'de': img('photo-1560969184-10fe8719e047', 1920, 1080),
  'en-ae': img('photo-1512453979798-5ea266f8880c', 1920, 1080),
} as const

export const cityImages = {
  'in': img('photo-1570168007204-dfb528c6958f', 1200, 800),
  'en-us': img('photo-1496442226666-8d4d0e62e6e9', 1200, 800),
  'en-ca': img('photo-1517090504586-fde19ea6066f', 1200, 800),
  'en-au': img('photo-1523482580672-f109ba8cb9be', 1200, 800),
  'de': img('photo-1546412414-e1885259563a', 1200, 800),
  'en-ae': img('photo-1528728329032-2972f65dfb3f', 1200, 800),
} as const

/** Editorial / workplace imagery used across sections. */
export const editorial = {
  strategy: img('photo-1454165804606-c3d57bc86b40', 1400, 900),
  team: img('photo-1522071820081-009f0129c71c', 1400, 900),
  meeting: img('photo-1600880292203-757bb62b4baf', 1400, 900),
  collaboration: img('photo-1552664730-d307ca884978', 1400, 900),
  analytics: img('photo-1551288049-bebda4e38f71', 1400, 900),
  data: img('photo-1460925895917-afdab827c52f', 1400, 900),
  workspace: img('photo-1497366754035-f200968a6e72', 1400, 900),
  office: img('photo-1497366811353-6870744d04b2', 1400, 900),
  discussion: img('photo-1543269865-cbf427effbad', 1400, 900),
  tech: img('photo-1519389950473-47ba0277781c', 1400, 900),
  presenting: img('photo-1531973576160-7125cd663d86', 1400, 900),
  founders: img('photo-1556761175-b413da4baf72', 1400, 900),
} as const

/** Industry imagery — SRS §24 enumerates exactly these fourteen verticals. */
export const industryImages: Record<string, string> = {
  healthcare: img('photo-1576091160399-112ba8d25d1d', 1200, 800),
  'real-estate': img('photo-1560518883-ce09059eeffa', 1200, 800),
  'law-firms': img('photo-1589829545856-d10d557cf95f', 1200, 800),
  dentists: img('photo-1629909613654-28e377c37b09', 1200, 800),
  saas: img('photo-1551434678-e076c223a692', 1200, 800),
  'it-companies': img('photo-1518770660439-4636190af475', 1200, 800),
  manufacturing: img('photo-1581091226825-a6a2a5aee158', 1200, 800),
  construction: img('photo-1541888946425-d81bb19240f5', 1200, 800),
  education: img('photo-1509062522246-3755977927d7', 1200, 800),
  hospitality: img('photo-1566073771259-6a8506099945', 1200, 800),
  finance: img('photo-1611974789855-9c2a0a7236a3', 1200, 800),
  automotive: img('photo-1492144534655-ae79c964c9d7', 1200, 800),
  ecommerce: img('photo-1556742049-0cfed4f6a45d', 1200, 800),
  'professional-services': img('photo-1521737604893-d14cc237f11d', 1200, 800),
}

/** Portraits for author bios and testimonials — all clearly placeholder. */
export const portraits = [
  img('photo-1494790108377-be9c29b29330', 400, 400),
  img('photo-1507003211169-0a1dd7228f2d', 400, 400),
  img('photo-1573496359142-b8d87734a5a2', 400, 400),
  img('photo-1560250097-0b93528c311a', 400, 400),
  img('photo-1580489944761-15a19d654956', 400, 400),
  img('photo-1472099645785-5658abf4ff4e', 400, 400),
  img('photo-1544005313-94ddf0286df2', 400, 400),
  img('photo-1506794778202-cad84cf45f1d', 400, 400),
] as const

export const caseStudyImages = [
  img('photo-1553877522-43269d4ea984', 1200, 800),
  img('photo-1552581234-26160f608093', 1200, 800),
  img('photo-1600880292089-90a7e086ee0c', 1200, 800),
  img('photo-1517245386807-bb43f82c33c4', 1200, 800),
  img('photo-1542744173-8e7e53415bb0', 1200, 800),
  img('photo-1521791136064-7986c2920216', 1200, 800),
] as const

export const blogImages = [
  img('photo-1432888622747-4eb9a8efeb07', 1200, 800),
  img('photo-1499750310107-5fef28a66643', 1200, 800),
  img('photo-1526628953301-3e589a6a8b74', 1200, 800),
  img('photo-1504868584819-f8e8b4b6d7e3', 1200, 800),
  img('photo-1533750349088-cd871a92f312', 1200, 800),
  img('photo-1516321318423-f06f85e504b3', 1200, 800),
  img('photo-1591696205602-2f950c417cb9', 1200, 800),
  img('photo-1517048676732-d65bc937f952', 1200, 800),
] as const

export const resourceImages = [
  img('photo-1484480974693-6ca0a78fb36b', 900, 600),
  img('photo-1434030216411-0b793f4b4173', 900, 600),
  img('photo-1450101499163-c8848c66ca85', 900, 600),
  img('photo-1471107340929-a87cd0f5b5f3', 900, 600),
] as const
