import { isValidUrl } from "@/app/api/cron/link-checker/isValidUrl";

export const extractLinks = (content: string): string[] => {
  const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
  const linkPatterns = [
    /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>/gi,
    /https?:\/\/[^\s<)"']+/gi,
  ];

  const extractedLinks = new Set<string>();

  linkPatterns.forEach((pattern) => {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(content)) !== null) {
      const link = match[1] || match[0];
      if (isValidUrl(link)) {
        const parsedUrl = new URL(link, BASE_URL);
        extractedLinks.add(parsedUrl.toString());
      }
    }
  });

  return Array.from(extractedLinks);
};
