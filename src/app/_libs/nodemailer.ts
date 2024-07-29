import nodemailer from "nodemailer";

// Gmailの認証情報を環境変数から取得
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

/**
 * メール通知を送信する
 * @param brokenLinks - リンク切れのリスト
 */
export const sendEmailNotification = async (
  brokenLinks: { id: string; title: string; link: string }[]
): Promise<void> => {
  const message = `以下のリンクが切れています:\n${brokenLinks
    .map(
      (link) => `ID: ${link.id}, タイトル: ${link.title}, リンク: ${link.link}`
    )
    .join("\n")}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: GMAIL_USER,
    to: NOTIFICATION_EMAIL,
    subject: "リンク切れ通知",
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
