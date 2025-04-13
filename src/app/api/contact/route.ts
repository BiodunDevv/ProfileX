/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import Portfolio from '@/modal/Portfolio';
import nodemailer from 'nodemailer';

// Create email transporter with better logging
const createTransporter = () => {
  console.log('Creating email transporter with config:', {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    hasAuth: !!process.env.EMAIL_SERVER_USER
  });
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
};

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, subject, message, portfolioCustomUrl, recipientEmail } = body;
    
    console.log('Contact form submission received:', { 
      name, 
      email, 
      hasPortfolioUrl: !!portfolioCustomUrl,
      hasRecipientEmail: !!recipientEmail 
    });
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Make sure we have a recipient email directly from the request
    // This simplifies the flow and ensures we have someone to send to
    if (!recipientEmail) {
      return NextResponse.json(
        { message: 'Recipient email is required' },
        { status: 400 }
      );
    }
    
    // Create email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Message from Your Portfolio</h2>
        
        <div style="margin-top: 20px;">
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4BA600; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
          <p>This email was sent from the contact form on your portfolio.</p>
          ${portfolioCustomUrl ? `<p>Portfolio URL: ${process.env.NEXT_PUBLIC_APP_URL}/p/${portfolioCustomUrl}</p>` : ''}
        </div>
      </div>
    `;
    
    // Send email
    console.log(`Attempting to send email to: ${recipientEmail}`);
    const transporter = createTransporter();
    
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM || 'noreply@profilex.com'}>`,
      to: recipientEmail,
      subject: `[Portfolio Contact] ${subject || 'New message from your portfolio'}`,
      html: htmlContent,
      replyTo: email // Allow recipient to reply directly to the sender
    });
    
    console.log('Email sent successfully:', info.messageId);
    
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
  );
  } catch (error) {
    console.error('Error sending contact message:', error);
    
    // Extract useful error information for connection issues
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCode = (error as any)?.code || '';
    
    // Provide helpful hints for common SMTP errors
    let hint = '';
    if (errorCode === 'ECONNREFUSED') {
      hint = 'Check your EMAIL_SERVER_HOST and EMAIL_SERVER_PORT settings. Make sure the SMTP server is accessible.';
    } else if (errorCode === 'EAUTH') {
      hint = 'Authentication failed. Check your EMAIL_SERVER_USER and EMAIL_SERVER_PASSWORD.';
    } else if (errorCode === 'ETIMEDOUT') {
      hint = 'Connection timed out. The SMTP server may be unreachable or blocked.';
    }
    
    return NextResponse.json(
      { 
        message: 'Error sending message',
        error: errorMessage,
        code: errorCode,
        hint: hint
      },
      { status: 500 }
    );
  }
}