import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConn';
import Portfolio from '@/modal/Portfolio';
import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  // For development, you can use a testing service like Mailtrap
  // For production, use a real email service
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
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Connect to database to get portfolio info (optional but useful for additional context)
    await connectDB();
    let portfolioInfo = null;
    
    if (portfolioCustomUrl) {
      // Get portfolio information to include in the email
      portfolioInfo = await Portfolio.findOne({
        customUrl: portfolioCustomUrl,
        isPublic: true
      }).lean();
    }
    
    // Use either the recipient email from the form or the one from the portfolio
    const emailTo = recipientEmail || (Array.isArray(portfolioInfo) ? undefined : portfolioInfo?.email);
    
    if (!emailTo) {
      return NextResponse.json(
        { message: 'Recipient email not found' },
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
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM || 'noreply@profilex.com'}>`,
      to: emailTo,
      subject: `[Portfolio Contact] ${subject || 'New message from your portfolio'}`,
      html: htmlContent,
      replyTo: email // Allow recipient to reply directly to the sender
    });
    
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending contact message:', error);
    return NextResponse.json(
      { 
        message: 'Error sending message',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}