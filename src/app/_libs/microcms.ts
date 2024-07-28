import { createClient } from "microcms-js-sdk";

const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY!;
const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN!;

// MicroCMS client
export const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

// Blog content type
export type BlogContent = {
  id: string;
  title: string;
  content: string;
  category: {
    id: string;
    name: string;
  } | null;
};

export const fetchAllBlogs = async function (): Promise<BlogContent[]> {
  const response = await client.getAllContents({
    endpoint: "blogs",
    queries: { fields: "id,title,content,category" },
  });

  return response;
};
