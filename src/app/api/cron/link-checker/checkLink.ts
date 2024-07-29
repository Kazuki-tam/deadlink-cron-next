/**
 * 指定されたURLが有効かどうかをチェックします。
 * @param url チェックするURL
 * @returns URLが有効な場合はtrue、無効な場合はfalse
 */
export const checkLink = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};
