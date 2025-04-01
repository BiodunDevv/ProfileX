import nodemailer from 'nodemailer';

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  headers: {
    'X-Priority': '1',
    'X-MSMail-Priority': 'High',
    Importance: 'high'
  }
});

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  resetToken: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    // Set a default base URL if the environment variable isn't available
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    
    // Create the reset URL with the correct base URL
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            margin-top: 40px;
            margin-bottom: 40px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #711381, #6C63FF);
            padding: 40px;
            text-align: center;
            color: white;
          }
          
          .header h1 {
            font-size: 24px;
            font-weight: 700;
            margin: 0;
          }
          
          .content {
            padding: 40px;
            text-align: center;
          }
          
          .icon {
            width: 80px;
            height: 80px;
            background-color: #f3e8ff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 24px;
          }
          
          .icon svg {
            width: 40px;
            height: 40px;
            color: #711381;
          }
          
          h2 {
            font-size: 22px;
            font-weight: 600;
            color: #1F2937;
            margin-bottom: 16px;
          }
          
          p {
            color: #6B7280;
            font-size: 16px;
            margin-bottom: 24px;
          }
          
          .expire-notice {
            font-size: 14px;
            color: #9CA3AF;
            margin-top: 32px;
          }
          
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #711381, #6C63FF);
            color: white;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 8px;
            font-weight: 500;
            margin-top: 8px;
            margin-bottom: 24px;
          }
          
          .footer {
            background-color: #F9FAFB;
            padding: 24px;
            text-align: center;
            color: #9CA3AF;
            font-size: 14px;
            border-top: 1px solid #E5E7EB;
          }
          
          .footer p {
            margin: 0;
            color: #9CA3AF;
          }
          
          .divider {
            height: 1px;
            background-color: #E5E7EB;
            margin: 24px 0;
          }
          
          .help-text {
            font-size: 14px;
            color: #6B7280;
            margin-top: 24px;
          }
          
          .manual-link {
            word-break: break-all;
            color: #711381;
            text-decoration: none;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Profilex</h1>
          </div>
          
          <div class="content">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            
            <h2>Reset Your Password</h2>
            
            <p>Hi ${name},</p>
            
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            
            <a href="${resetUrl}" class="button">Reset Password</a>
            
            <p class="expire-notice">This link will expire in 1 hour for security reasons.</p>
            
            <div class="divider"></div>
            
            <p class="help-text">If the button above doesn't work, copy and paste this link into your browser:</p>
            
            <a href="${resetUrl}" class="manual-link">${resetUrl}</a>
            
            <p class="help-text">If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Profilex. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Profilex Security" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Reset Your Profilex Password',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { 
      success: false, 
      error: `Failed to send password reset email: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};