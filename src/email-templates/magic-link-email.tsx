import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  magicLink: string;
}

export const MagicLinkEmail = ({ magicLink }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Your magic sign-in link</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Sign in to Your Account</Heading>

          <Text style={text}>
            Click the button below to securely sign in to your account. This
            link will expire in 10 minutes.
          </Text>

          <Section style={buttonContainer}>
            <Button
              style={{
                backgroundColor: "#4F46E5",
                padding: "12px 24px",
                borderRadius: "5px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                textAlign: "center",
                display: "inline-block",
                maxWidth: "100%",
                wordBreak: "break-word" as const,
              }}
              href={magicLink}
            >
              Sign In to Your Account
            </Button>
          </Section>

          <Text style={text}>
            If the button doesn&apos;t work, copy and paste this URL:
          </Text>
          <Link
            style={{
              color: "#4F46E5",
              fontSize: "14px",
              textDecoration: "underline",
              wordBreak: "break-all" as const,
              maxWidth: "100%",
              display: "inline-block",
              overflowWrap: "break-word" as const,
            }}
            href={magicLink}
          >
            {magicLink.length > 50
              ? `${magicLink.substring(0, 47)}...`
              : magicLink}
          </Link>

          <Hr style={hr} />

          <Text style={footer}>
            If you didn&apos;t request this link, you can safely ignore this
            email.
          </Text>

          <Text style={footer}>
            Best regards,
            <br />
            Better-auth team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  WebkitTextSizeAdjust: "100%",
  msTextSizeAdjust: "100%",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  width: "100%",
  borderRadius: "5px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  marginBottom: "24px",
  textAlign: "center" as const,
  wordBreak: "break-word" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "20px",
  wordBreak: "break-word" as const,
};

const buttonContainer = {
  textAlign: "center" as const,
  marginVertical: "26px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "24px",
  wordBreak: "break-word" as const,
};
