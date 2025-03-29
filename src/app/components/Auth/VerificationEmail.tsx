/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @typescript-eslint/no-unused-vars */
// emails/VerificationEmail.tsx
import { Html, Head, Body, Container, Section, Column, Img, Text, Button, Heading, Row, Hr, Link } from "@react-email/components";
import * as React from 'react';

interface VerificationEmailProps {
  username: string;
  code: string;
  email?: string;
  verificationCode?: string;
}

export default function VerificationEmail({ 
  username, 
  code,
  email = "user@example.com" 
}: VerificationEmailProps) {
  const formattedCode = code.split('').join(' ');
  const currentYear = new Date().getFullYear();
  
  return (
    <Html>
      <Head>
        <title>Verify your account</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Body style={body}>
        <Container style={container}>
          {/* Top accent bar */}
          <Section style={accentBar}></Section>

          {/* Logo header */}
          <Section style={headerSection}>
            <Row>
              <Column align="center">
                <Img 
                  src="https://i.imgur.com/zLQOhGT.png" 
                  width="120" 
                  height="40" 
                  alt="Profilex" 
                  style={logoImage} 
                />
              </Column>
            </Row>
          </Section>
          
          {/* Main content */}
          <Section style={mainContent}>
            <Heading style={heading}>Verify your email address</Heading>
            
            <Text style={greeting}>Hello {username},</Text>
            
            <Text style={paragraph}>
              Thanks for signing up! To complete your registration and activate your account, 
              please enter the verification code below.
            </Text>
            
            {/* Code display with slick design */}
            <Section style={codeContainer}>
              <Row>
                {code.split('').map((digit, index) => (
                  <Column key={index} style={codeColumn}>
                    <Text style={codeDigit}>{digit}</Text>
                  </Column>
                ))}
              </Row>
            </Section>
            
            <Text style={instructionText}>
              Enter this code on the verification page or click the button below:
            </Text>
            
            <Button style={{ ...verifyButton, padding: "12px 20px" }} href={`https://Profilex.com/verify?code=${code}&email=${encodeURIComponent(email)}`}>
              Verify My Account
            </Button>
            
            <Text style={expiryText}>
              This code will expire in <span style={highlight}>15 minutes</span>.
            </Text>
            
            {/* Security notice */}
            <Section style={securityNotice}>
              <Text style={securityText}>
                If you didn&apos;t create an account with us, you can safely ignore this email.
              </Text>
            </Section>
          </Section>
          
          <Hr style={divider} />
          
          {/* Help section */}
          <Section style={helpSection}>
            <Text style={helpText}>
              Need help? <Link href="https://Profilex.com/support" style={helpLink}>Contact our support team</Link>
            </Text>
          </Section>
          
          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              &copy; {currentYear} Profilex. All rights reserved.
            </Text>
            
            <Row style={footerLinks}>
              <Column><Link href="https://Profilex.com/privacy" style={footerLink}>Privacy Policy</Link></Column>
              <Column><Link href="https://Profilex.com/terms" style={footerLink}>Terms of Service</Link></Column>
              <Column><Link href="https://Profilex.com/contact" style={footerLink}>Contact Us</Link></Column>
            </Row>
            
            <Text style={addressText}>
              Profilex Inc. • 123 Education Ave, Suite 400 • Learning City, LC 54321
            </Text>
            
            <Text style={unsubscribeText}>
              This is a mandatory service email sent to {email}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Advanced Styles
const body = {
  backgroundColor: "#f5f7fa",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: "0",
  padding: "0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
};

const accentBar = {
  background: "linear-gradient(90deg, #4D44B5 0%, #FB7D5B 100%)",
  height: "6px",
};

const headerSection = {
  padding: "32px 0 20px",
};

const logoImage = {
  margin: "0 auto",
};

const mainContent = {
  padding: "0 48px 32px",
};

const heading = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1f2937",
  textAlign: "center" as const,
  margin: "0 0 16px",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "1.5",
  color: "#374151",
  fontWeight: "500",
  margin: "24px 0 12px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#4b5563",
  margin: "0 0 24px",
};

const codeContainer = {
  background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)",
  borderRadius: "8px",
  margin: "24px 0",
  padding: "24px 0",
  border: "1px solid #e5e7eb",
};

const codeColumn = {
  width: "14%",
  textAlign: "center" as const,
  padding: "0 2px",
};

const codeDigit = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#4D44B5",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  border: "2px solid #e5e7eb",
  margin: "0 auto",
  padding: "8px 0",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
};

const instructionText = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#4b5563",
  textAlign: "center" as const,
  margin: "24px 0 16px",
};

const verifyButton = {
  backgroundColor: "#4D44B5",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px 24px",
  margin: "24px 0 16px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease-in-out",
};

const expiryText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#6b7280",
  textAlign: "center" as const,
  margin: "8px 0 32px",
};

const highlight = {
  color: "#FB7D5B",
  fontWeight: "600",
};

const securityNotice = {
  backgroundColor: "#f3f4f6",
  borderRadius: "6px",
  padding: "16px",
  margin: "16px 0",
};

const securityText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#6b7280",
  margin: "0",
};

const divider = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "0",
};

const helpSection = {
  padding: "24px 48px 0",
};

const helpText = {
  fontSize: "14px",
  color: "#6b7280",
  textAlign: "center" as const,
  margin: "0",
};

const helpLink = {
  color: "#4D44B5",
  textDecoration: "none",
  fontWeight: "500",
};

const footer = {
  padding: "24px 48px 32px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#9ca3af",
  margin: "0 0 16px",
};

const footerLinks = {
  margin: "16px 0",
};

const footerLink = {
  color: "#6b7280",
  textDecoration: "none",
  fontSize: "12px",
};

const addressText = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "16px 0 8px",
  lineHeight: "1.5",
};

const unsubscribeText = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "8px 0 0",
};