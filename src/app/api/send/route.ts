import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  mailBody: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const emailOptions = (await req.json()) as EmailOptions;

    if (
      !emailOptions.from ||
      !emailOptions.to ||
      !emailOptions.subject ||
      !emailOptions.mailBody
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });

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
