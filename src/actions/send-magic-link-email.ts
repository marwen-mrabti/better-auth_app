import { MagicLinkEmail } from "@/email-templates/magic-link-template";
import { sendEmail } from "@/services/send-email-smtp";

interface Props {
  email: string;
  magicLink: string;
}

export async function sendMagicLinkEmail({ email, magicLink }: Props) {
  return sendEmail({
    from: "noreply@auth-playground.com",
    to: email,
    subject: "Login link to your Better-Auth account",
    template: MagicLinkEmail({ magicLink }),
  });
}
