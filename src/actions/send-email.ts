"use server";
import env from "@/lib/env";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { MagicLinkEmail } from "@/email-templates/magic-link-email";
import { render } from "@react-email/render";

export async function sendEmail({
  magicLink,
  email,
}: {
  magicLink: string;
  email: string;
}) {
  try {
    const transporter = await nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      secure: process.env.NODE_ENV === "production",
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });

    if (!transporter.verify) {
      console.log("transporter.verify", transporter.verify);
      return NextResponse.json(
        {
          message: "Something went wrong",
        },
        {
          status: 500,
        },
      );
    }

    const emailHtml = await render(MagicLinkEmail({ magicLink }));
    const mailOptions = {
      from: "noreply@better-auth.com",
      to: email,
      subject: "Login link to your Better-Auth account",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    transporter.close();
    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong" + error,
      },
      {
        status: 500,
      },
    );
  }
}
