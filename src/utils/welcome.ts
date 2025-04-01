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
 * Send welcome email to verified users
 */
export const sendWelcomeEmail = async (
  to: string,
  name: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const currentYear = new Date().getFullYear();

    // Advanced HTML email template with modern design
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Profilex</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
          }
          
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          }
          
          .header {
            position: relative;
            background: linear-gradient(135deg, #4D44B5, #6C63FF);
            padding: 40px 0;
            text-align: center;
            color: white;
          }
          
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          
          .header p {
            opacity: 0.9;
            font-size: 16px;
            font-weight: 500;
          }
          
          .pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            background-image: 
              radial-gradient(circle at 25px 25px, white 2%, transparent 2.5%),
              radial-gradient(circle at 75px 75px, white 2%, transparent 2.5%);
            background-size: 100px 100px;
          }
          
          .welcome-badge {
            width: 90px;
            height: 90px;
            margin: -45px auto 20px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            position: relative;
            z-index: 2;
          }
          
          .welcome-badge svg {
            width: 50px;
            height: 50px;
            color: #4D44B5;
          }
          
          .content {
            padding: 20px 40px 40px;
            text-align: center;
          }
          
          .content h2 {
            color: #1F2937;
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 16px;
          }
          
          .content p {
            color: #4B5563;
            font-size: 16px;
            margin-bottom: 24px;
          }
          
          .btn {
            display: inline-block;
            background: #4D44B5;
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            padding: 12px 24px;
            border-radius: 8px;
            margin: 8px 0 32px;
            box-shadow: 0 4px 12px rgba(77, 68, 181, 0.2);
          }
          
          .features {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 36px;
            text-align: left;
          }
          
          .feature {
            flex: 1 1 calc(50% - 16px);
            min-width: 200px;
            background: #F9FAFB;
            border-radius: 8px;
            padding: 16px;
            border: 1px solid #E5E7EB;
          }
          
          .feature h3 {
            display: flex;
            align-items: center;
            color: #4D44B5;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          
          .feature h3 svg {
            width: 20px;
            height: 20px;
            margin-right: 8px;
          }
          
          .feature p {
            font-size: 14px;
            color: #6B7280;
            margin: 0;
          }
          
          .divider {
            height: 1px;
            background-color: #E5E7EB;
            margin: 32px 0;
          }
          
          .tips {
            text-align: left;
            background-color: #F3F4F6;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          
          .tips h3 {
            font-size: 16px;
            color: #374151;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          }
          
          .tips h3 svg {
            width: 16px;
            height: 16px;
            margin-right: 8px;
          }
          
          .tips ul {
            padding-left: 16px;
          }
          
          .tips li {
            color: #4B5563;
            font-size: 14px;
            margin-bottom: 6px;
          }
          
          .footer {
            background: #F9FAFB;
            padding: 32px 40px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
          }
          
          .social {
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
          }
          
          .social a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background: white;
            border-radius: 50%;
            margin: 0 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
          
          .social svg {
            width: 16px;
            height: 16px;
            fill: #4B5563;
          }
          
          .footer p {
            color: #9CA3AF;
            font-size: 13px;
            margin: 4px 0;
          }
          
          .footer a {
            color: #6B7280;
            text-decoration: none;
          }
          
          @media (max-width: 600px) {
            .container {
              width: 100%;
              margin: 0;
              border-radius: 0;
            }
            
            .content {
              padding: 20px 24px 30px;
            }
            
            .footer {
              padding: 24px;
            }
            
            .features {
              flex-direction: column;
            }
            
            .feature {
              flex: 1 1 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="pattern"></div>
            <h1>Profilex</h1>
            <p>Welcome to Your Professional Journey</p>
          </div>
          
          <div class="content">
            <div class="welcome-badge">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2>Welcome, ${name}!</h2>
            
            <p>
              Your account has been successfully verified. We're excited to have you join 
              the Profilex community! Your journey to building an impressive portfolio
              starts now.
            </p>
            
            <a href="https://profilex.com/dashboard" class="btn">Get Started</a>
            
            <div class="features">
              <div class="feature">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Platform
                </h3>
                <p>Your data is encrypted and secured with enterprise-grade protection.</p>
              </div>
              
              <div class="feature">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Lightning Fast
                </h3>
                <p>Enjoy a responsive experience with our optimized platform.</p>
              </div>
              
              <div class="feature">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  Cloud Storage
                </h3>
                <p>Your work is automatically saved and accessible from anywhere.</p>
              </div>
              
              <div class="feature">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  24/7 Support
                </h3>
                <p>Our support team is always available to help you succeed.</p>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="tips">
              <h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quick Tips to Get Started
              </h3>
              <ul>
                <li>Complete your profile information for better visibility</li>
                <li>Upload a professional profile photo</li>
                <li>Explore available templates for your portfolio</li>
                <li>Connect your social media accounts for wider reach</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <div class="social">
              <a href="https://twitter.com/profilex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/profilex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://instagram.com/profilex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
            
            <p>&copy; ${currentYear} Profilex Inc. All rights reserved.</p>
            <p style="margin-top: 8px;">
              <a href="https://profilex.com/terms">Terms of Service</a> &nbsp;•&nbsp; 
              <a href="https://profilex.com/privacy">Privacy Policy</a>
            </p>
            <p style="margin-top: 16px; font-size: 12px; color: #9CA3AF;">
              123 Tech Avenue, Suite 400, Innovation City, CA 94107
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Profilex Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: '🎉 Welcome to Profilex - Your Account is Verified!',
      html: htmlContent,
      headers: {
        'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=unsubscribe>`
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { 
      success: false, 
      error: `Failed to send welcome email: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};