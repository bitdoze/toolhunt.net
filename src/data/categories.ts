export const SH_CATEGORIES = [
  'AI Development',
  'AI Infrastructure',
  'Analytics',
  'Automation',
  'Backend',
  'Backup',
  'Container Management',
  'DevOps',
  'Document Tools',
  'Documentation',
  'Email Marketing',
  'File Storage',
  'No-Code',
  'Platform as a Service',
  'Productivity',
  'Search',
  'Server Management',
  'Storage',
  'Survey & Feedback',
] as const;

export const TOOL_CATEGORIES = [
  'Design',
  'Image Optimization',
  'Marketing',
  'Productivity',
  'Utilities',
] as const;

export const MAC_CATEGORIES = [
  'AI',
  'Design',
  'Development',
  'Productivity',
  'Utilities',
] as const;

export const ALTERNATIVES_CATEGORIES = [
  'Image Editing',
  'No-Code',
] as const;

export type ShCategory = (typeof SH_CATEGORIES)[number];
export type ToolCategory = (typeof TOOL_CATEGORIES)[number];
export type MacCategory = (typeof MAC_CATEGORIES)[number];
export type AlternativesCategory = (typeof ALTERNATIVES_CATEGORIES)[number];

export const CATEGORIES_BY_COLLECTION = {
  sh: SH_CATEGORIES,
  tools: TOOL_CATEGORIES,
  mac: MAC_CATEGORIES,
  alternatives: ALTERNATIVES_CATEGORIES,
} as const;

export function isKnownCategory(
  collection: keyof typeof CATEGORIES_BY_COLLECTION,
  category: string
): boolean {
  return (CATEGORIES_BY_COLLECTION[collection] as readonly string[]).includes(category);
}
