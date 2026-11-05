export const CONTACT_TOPICS = [
  "General Feedback",
  "Profile Impersonation",
  "Profile Removal",
  "General Question",
  "Partnership inquiry",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export function isContactTopic(value: string): value is ContactTopic {
  return (CONTACT_TOPICS as readonly string[]).includes(value);
}
