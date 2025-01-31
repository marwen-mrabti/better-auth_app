"use server";

import env from "@/lib/env";
import { render } from "@react-email/render";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
  template?: React.ReactElement;
}

export async function sendEmailViaSendGrid(
  emailOptions: EmailOptions,
): Promise<NextResponse> {
  try {
    sgMail.setApiKey(env.SENDGRID_API_KEY);

    // Render HTML if a React email template is provided
    const emailHtml = emailOptions.template
      ? await render(emailOptions.template)
      : emailOptions.html;

    // Send email
    const [response] = await sgMail.send({
      from: env.SMTP_USER,
      to: emailOptions.to,
      subject: emailOptions.subject,
      text: "",
      html: emailHtml,
    });

    if (response.statusCode !== 202) {
      return NextResponse.json(
        { message: "Email transporter configuration failed" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Email sending failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
