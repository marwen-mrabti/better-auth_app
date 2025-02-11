"use server";

import { sendEmail } from "@/helpers/send-email";

interface Props {
  email: string;
  mailBody: string;
}

export async function sendMagicLinkEmail({ email, mailBody }: Props) {
  return sendEmail({
    from: "noreply@auth-playground.com",
    to: email,
    subject: "Login link to your Better-Auth account",
    mailBody,
  });
}
