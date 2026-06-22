import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// 1. MIDDLEWARE
// ============================================================
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================
// 2. LOAD CONFIGURATION
// ============================================================
let config = null;

try {
  const configPath = path.join(__dirname, 'config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configData);
  
  // Remove spaces from app password if present
  if (config.appPassword && config.appPassword.includes(' ')) {
    config.appPassword = config.appPassword.replace(/\s/g, '');
    console.log('⚠️ Removed spaces from app password');
  }
  
  // Validate required fields
  const requiredFields = ['senderEmail', 'appPassword', 'receiverEmail'];
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  console.log('✅ Configuration loaded successfully');
  console.log(`📧 Sender: ${config.senderEmail}`);
  console.log(`📬 Receiver: ${config.receiverEmail}`);
} catch (error) {
  console.error('❌ Failed to load config.json:', error.message);
  process.exit(1);
}

// ============================================================
// 3. EMAIL TRANSPORTER
// ============================================================
const transporter = nodemailer.createTransport({
  service: config.smtpService || 'gmail',
  port: config.smtpPort || 587,
  secure: config.smtpSecure || false,
  auth: {
    user: config.senderEmail,
    pass: config.appPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Transporter verification failed:', error);
    console.error('Please check your email and app password');
  } else {
    console.log('✅ Transporter is ready to send emails');
  }
});

// ============================================================
// 4. API ROUTES
// ============================================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Email server is running',
    timestamp: new Date().toISOString(),
  });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('📨 Received email request:', req.body);
  
  const { user_name, user_email, subject, message } = req.body;

  // VALIDATION
  if (!user_name || !user_email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required',
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user_email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  // Sanitize inputs
  const sanitized = {
    user_name: user_name.trim().slice(0, 100),
    user_email: user_email.trim().slice(0, 100),
    subject: subject.trim().slice(0, 200),
    message: message.trim().slice(0, 5000),
  };

  try {
    // Build email
    const mailOptions = {
      from: `"Portfolio Contact" <${config.senderEmail}>`,
      to: config.receiverEmail,
      replyTo: sanitized.user_email,
      subject: `Portfolio Contact: ${sanitized.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111827; padding: 30px; border-radius: 12px; border: 1px solid #1F2937;">
          <div style="background: #0A74DA; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin: -30px -30px 20px -30px;">
            <h2 style="color: #FFFFFF; margin: 0;">📩 New Portfolio Message</h2>
          </div>
          
          <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #1F2937;">
            <div style="color: #9CA3AF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">👤 From</div>
            <div style="color: #F3F4F6; font-size: 16px; font-weight: 600;">${sanitized.user_name}</div>
            <div style="color: #9CA3AF; font-size: 14px;">${sanitized.user_email}</div>
          </div>
          
          <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #1F2937;">
            <div style="color: #9CA3AF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">📌 Subject</div>
            <div style="color: #F3F4F6; font-size: 16px;">${sanitized.subject}</div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <div style="color: #9CA3AF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">💬 Message</div>
            <div style="background: #0B0F19; padding: 15px; border-radius: 8px; border-left: 3px solid #0A74DA; color: #F3F4F6; font-size: 15px; line-height: 1.6; margin-top: 5px;">
              ${sanitized.message}
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
        
        From: ${sanitized.user_name} (${sanitized.user_email})
        Subject: ${sanitized.subject}
        
        Message:
        ${sanitized.message}
        
        --------------------
        Sent from your portfolio contact form.
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully to ${config.receiverEmail}`);
    console.log(`📧 Message ID: ${info.messageId}`);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('❌ Email send error:', error);
    
    let errorMessage = 'Failed to send email. Please try again.';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check email credentials.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed. Please check network or SMTP settings.';
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
});

// ============================================================
// 5. START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`\n🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 Sender: ${config.senderEmail}`);
  console.log(`📬 Receiver: ${config.receiverEmail}`);
  console.log(`🌐 CORS enabled for: http://localhost:5173\n`);
});