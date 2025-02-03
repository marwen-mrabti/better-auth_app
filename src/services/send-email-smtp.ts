"use server";

import env from "@/lib/env";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  mailBody: string;
}

export async function sendEmail(
  emailOptions: EmailOptions,
): Promise<NextResponse> {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });

  try {
    // Verify transporter connection
    const transporterVerified = await transporter.verify();
    if (!transporterVerified) {
      return NextResponse.json(
        { message: "Email transporter configuration failed" },
        { status: 500 },
      );
    }

    // Prepare mail options
    const mailOptions = {
      ...emailOptions,
      html: emailOptions.mailBody,
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
        message: "Email sending failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
