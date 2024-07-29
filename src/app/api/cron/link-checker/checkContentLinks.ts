import { checkLink } from "@/app/api/cron/link-checker/checkLink";
import { extractLinks } from "@/app/api/cron/link-checker/extractLinks";
import type { BlogContent } from "@/app/_libs/microcms";

/**
 * コンテンツ内のリンクをチェックする
 * @param content - チェック対象のコンテンツ
 * @returns リンク切れのリスト
 */
export const checkContentLinks = async (
  content: BlogContent
): Promise<{ id: string; title: string; link: string }[]> => {
  // コンテンツ内のリンクを抽出
  const links = extractLinks(content.content);
  // リンク切れのリスト
  const brokenLinks: { id: string; title: string; link: string }[] = [];

  // コンテンツ内のリンクをチェック
  for (const link of links) {
    const isLinkWorking = await checkLink(link);
    if (!isLinkWorking) {
      brokenLinks.push({ id: content.id, title: content.title, link });
    }
  }

  return brokenLinks;
};
