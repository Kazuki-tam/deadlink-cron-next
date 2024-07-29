import { fetchAllBlogs } from "@/app/_libs/microcms";
import { sendEmailNotification } from "@/app/_libs/nodemailer";
import { checkContentLinks } from "@/app/api/cron/link-checker/checkContentLinks";
import { NextResponse, NextRequest } from "next/server";

// キャッシュを無効化
export const revalidate = 0;
// 最大実行時間
// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // Cron Job実行許可の検証
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    // 全てのブログコンテンツを取得
    const contents = await fetchAllBlogs();
    let allBrokenLinks: { id: string; title: string; link: string }[] = [];

    // 全てのコンテンツ内のリンクをチェック
    for (const content of contents) {
      const brokenLinks = await checkContentLinks(content);
      allBrokenLinks = [...allBrokenLinks, ...brokenLinks];
    }

    // リンク切れがあれば通知
    if (allBrokenLinks.length > 0) {
      await sendEmailNotification(allBrokenLinks);
    }

    return NextResponse.json({
      message: "Link check completed",
      brokenLinks: allBrokenLinks,
    });
  } catch (error) {
    console.error("Error during link check:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
