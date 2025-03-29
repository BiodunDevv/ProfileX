import nodemailer from 'nodemailer';

// Update your transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Add these headers to help with deliverability
  headers: {
    'X-Priority': '1',
    'X-MSMail-Priority': 'High',
    Importance: 'high'
  }
});

// Function to send verification emails with futuristic design
export const sendVerificationEmail = async (
  to: string,
  code: string,
  name: string
) => {
  try {
    // Log credentials but masked for security
    console.log(`Using EMAIL_USER: ${process.env.EMAIL_USER?.substring(0, 3)}...`);
    console.log(`EMAIL_PASS is ${process.env.EMAIL_PASS ? 'set' : 'not set'}`);
    
    // Generate code with spaces for better readability
    const formattedCode = code.split('').join(' ');
    
    // Advanced futuristic email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Profilex Account</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #f9f9f9;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(77, 68, 181, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #4D44B5 0%, #6C63FF 100%);
            padding: 30px 20px;
            text-align: center;
            position: relative;
          }
          
          .header h1 {
            color: white;
            margin: 0;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 28px;
            letter-spacing: -0.5px;
          }
          
          .header p {
            color: rgba(255, 255, 255, 0.9);
            margin: 5px 0 0;
            font-size: 16px;
          }
          
          .header-graphic {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            opacity: 0.15;
          }
          
          .header-graphic .circle {
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }
          
          .header-graphic .circle:nth-child(1) {
            width: 80px;
            height: 80px;
            top: -40px;
            left: 10%;
          }
          
          .header-graphic .circle:nth-child(2) {
            width: 120px;
            height: 120px;
            bottom: -60px;
            right: 10%;
          }
          
          .content {
            padding: 40px 30px;
            text-align: left;
            position: relative;
          }
          
          .greeting {
            font-weight: 500;
            font-size: 18px;
            margin-bottom: 20px;
            color: #333;
          }
          
          .message {
            color: #555;
            line-height: 1.5;
            margin-bottom: 30px;
          }
          
          .code-container {
            background: linear-gradient(135deg, #f1f1fb 0%, #e8eaff 100%);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            position: relative;
            border: 1px solid rgba(77, 68, 181, 0.1);
            overflow: hidden;
          }
          
          .code-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #4D44B5, #6C63FF, #FB7D5B);
            border-radius: 5px 5px 0 0;
          }
          
          .code {
            font-family: 'Space Grotesk', monospace;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 6px;
            color: #4D44B5;
            margin: 0;
            position: relative;
            display: inline-block;
          }
          
          .code-glow {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            top: 0;
            left: 0;
            filter: blur(20px);
            opacity: 0.5;
            background: linear-gradient(90deg, rgba(108, 99, 255, 0.2), rgba(251, 125, 91, 0.2));
            z-index: -1;
          }
          
          .expiry {
            margin-top: 30px;
            padding: 15px;
            background-color: rgba(251, 125, 91, 0.1);
            border-radius: 8px;
            font-size: 14px;
            color: #FB7D5B;
            text-align: center;
          }
          
          .expiry-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: #FB7D5B;
            border-radius: 50%;
            position: relative;
            top: 3px;
            margin-right: 5px;
          }
          
          .footer {
            background-color: #f5f5f7;
            text-align: center;
            padding: 20px;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #eaeaea;
          }
          
          .footer p {
            margin: 5px 0;
          }
          
          .social-links {
            margin: 15px 0;
          }
          
          .social-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            background-color: #eaeaea;
            border-radius: 50%;
            margin: 0 5px;
          }
          
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #4D44B5 0%, #6C63FF 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            margin-top: 20px;
            box-shadow: 0 4px 12px rgba(77, 68, 181, 0.2);
            transition: all 0.3s ease;
          }
          
          .button:hover {
            box-shadow: 0 6px 16px rgba(77, 68, 181, 0.3);
            transform: translateY(-2px);
          }
          
          .help-text {
            margin-top: 30px;
            font-size: 14px;
            color: #888;
          }
          
          @media only screen and (max-width: 480px) {
            .header {
              padding: 20px 15px;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .code {
              font-size: 28px;
              letter-spacing: 4px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="header-graphic">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
            <h1>Profilex</h1>
            <p>Account Verification</p>
          </div>
          
          <div class="content">
            <p class="greeting">Hello ${name},</p>
            
            <p class="message">
              Thank you for creating an account with Profilex. To verify your email address, 
              please use the verification code below:
            </p>
            
            <div class="code-container">
              <div class="code-glow"></div>
              <h2 class="code">${formattedCode}</h2>
            </div>
            
            <div class="expiry">
              <span class="expiry-icon"></span>
              This verification code will expire in 15 minutes
            </div>
            
            <p class="help-text">
              If you didn't create an account with Profilex, you can safely ignore this email.
            </p>
            
            <!-- Add physical address for anti-spam compliance -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
              <p>Profilex is located at: 123 Education Street, Suite 100, Learning City, CA 90210</p>
            </div>
          </div>
          
          <div class="footer">
            <div class="social-links">
              <span class="social-icon"></span>
              <span class="social-icon"></span>
              <span class="social-icon"></span>
            </div>
            <p>© 2025 Profilex. All rights reserved.</p>
            <p>This is an automated message from Profilex.</p>
            <!-- Add unsubscribe link for compliance -->
            <p>If you'd prefer not to receive these emails, you can <a href="mailto:${process.env.EMAIL_USER}?subject=Unsubscribe">unsubscribe</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    const mailOptions = {
      from: `"Profilex" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your Profilex Verification Code', // More straightforward subject
      html: htmlContent,
      // Add list unsubscribe header for better deliverability
      headers: {
        'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=unsubscribe>`
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error(`Failed to send verification email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Test the email connection
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    return { success: true, message: 'Email server connection is ready' };
  } catch (error) {
    console.error('Email server connection error:', error);
    return { success: false, error: String(error) };
  }
};

// Function to send welcome email after verification
export const sendWelcomeEmail = async (to: string, name: string) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Profilex</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #f9f9f9;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(77, 68, 181, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #4D44B5 0%, #6C63FF 100%);
            padding: 40px 20px;
            text-align: center;
            position: relative;
          }
          
          .header h1 {
            color: white;
            margin: 0;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 28px;
            letter-spacing: -0.5px;
          }
          
          .header p {
            color: rgba(255, 255, 255, 0.9);
            margin: 10px 0 0;
            font-size: 18px;
            font-weight: 500;
          }
          
          .content {
            padding: 40px 30px;
            text-align: center;
          }
          
          .welcome-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, #4D44B5 0%, #6C63FF 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: white;
          }
          
          h2 {
            color: #333;
            font-family: 'Space Grotesk', sans-serif;
            margin-top: 0;
          }
          
          .message {
            color: #555;
            line-height: 1.6;
            margin-bottom: 30px;
            font-size: 16px;
          }
          
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #4D44B5 0%, #6C63FF 100%);
            color: white;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
            margin-top: 10px;
            box-shadow: 0 4px 12px rgba(77, 68, 181, 0.2);
          }
          
          .features {
            display: flex;
            margin: 40px 0;
            text-align: left;
          }
          
          .feature {
            flex: 1;
            padding: 15px;
          }
          
          .feature-icon {
            width: 50px;
            height: 50px;
            background: #f0f0ff;
            border-radius: 12px;
            margin-bottom: 15px;
          }
          
          .feature h3 {
            margin: 0 0 10px;
            color: #4D44B5;
            font-size: 16px;
          }
          
          .feature p {
            margin: 0;
            font-size: 14px;
            color: #666;
            line-height: 1.4;
          }
          
          .footer {
            background-color: #f5f5f7;
            text-align: center;
            padding: 20px;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #eaeaea;
          }
          
          @media only screen and (max-width: 480px) {
            .features {
              flex-direction: column;
            }
            
            .feature {
              margin-bottom: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Profilex</h1>
            <p>Welcome to the Future of Learning!</p>
          </div>
          
          <div class="content">
            <div class="welcome-icon">✓</div>
            <h2>Account Verified Successfully</h2>
            
            <p class="message">
              Hi ${name},<br><br>
              Your account has been successfully verified! You now have full access to Profilex.
              Get started by exploring our features and personalizing your experience.
            </p>
            
            <a href="https://Profilex.example.com/dashboard" class="button">Go to Dashboard</a>
            
            <div class="features">
              <div class="feature">
                <div class="feature-icon"></div>
                <h3>Smart Learning</h3>
                <p>Personalized curriculum tailored to your learning style and goals.</p>
              </div>
              
              <div class="feature">
                <div class="feature-icon"></div>
                <h3>Progress Tracking</h3>
                <p>Real-time analytics to measure your progress and achievements.</p>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2025 Profilex. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Profilex" <${process.env.EMAIL_USER}>`,
      to,
      subject: '🎉 Welcome to Profilex!',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
};