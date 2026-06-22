import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_name, user_email, subject, message } = req.body;

  // Validation
  if (!user_name || !user_email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user_email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  // Get credentials from Vercel Environment Variables
  const senderEmail = process.env.SENDER_EMAIL;
  const appPassword = process.env.APP_PASSWORD;
  const receiverEmail = process.env.RECEIVER_EMAIL;

  if (!senderEmail || !appPassword || !receiverEmail) {
    console.error('Missing email configuration');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error',
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: senderEmail,
        pass: appPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Build email
    const mailOptions = {
      from: `"Portfolio Contact" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: user_email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111827; padding: 30px; border-radius: 12px; border: 1px solid #1F2937;">
          <div style="background: #0A74DA; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin: -30px -30px 20px -30px;">
            <h2 style="color: #FFFFFF; margin: 0;">📩 New Portfolio Message</h2>
          </div>
          
          <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #1F2937;">
            <div style="color: #9CA3AF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">👤 From</div>
            <div style="color: #F3F4F6; font-size: 16px; font-weight: 600;">${user_name}</div>
            <div style="color: #9CA3AF; font-size: 14px;">${user_email}</div>
          </div>
          
          <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #1F2937;">
            <div style="color: #9CA3AF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">📌 Subject</div>
            <div style="color: #F3F4F6; font-size: 16px;">${subject}</div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <div style="color: #9CA3AF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">💬 Message</div>
            <div style="background: #0B0F19; padding: 15px; border-radius: 8px; border-left: 3px solid #0A74DA; color: #F3F4F6; font-size: 15px; line-height: 1.6; margin-top: 5px;">
              ${message}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #1F2937; text-align: center;">
            <p style="color: #6B7280; font-size: 12px; margin: 0;">
              Sent from portfolio contact form · 
              <span style="color: #10B981;">● Available for Freelance</span>
            </p>
          </div>
        </div>
      `,
      text: `
        New Portfolio Message
        =====================
        
        From: ${user_name} (${user_email})
        Subject: ${subject}
        
        Message:
        ${message}
        
        --------------------
        Sent from your portfolio contact form.
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again.',
    });
  }
}