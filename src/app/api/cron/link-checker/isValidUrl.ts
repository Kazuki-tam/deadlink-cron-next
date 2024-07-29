/**
 * URLが有効かどうかを判定する
 * @param url - 判定するURL
 * @returns URLが有効な場合はtrue、無効な場合はfalse
 */
export const isValidUrl = (url: string): boolean => {
  const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  try {
    // URLを解析
    const parsedUrl = new URL(url, BASE_URL);

    // プロトコルがhttp:またはhttps:であることを確認
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (error) {
    // URL解析に失敗した場合は無効とみなす
    return false;
  }
};
