const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// 1. MIDDLEWARE
// ============================================================
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-domain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================
// 2. LOAD CONFIGURATION SECURELY
// ============================================================
let config = null;

try {
  const configPath = path.join(__dirname, 'config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configData);
  
  // Validate required fields
  const requiredFields = ['senderEmail', 'appPassword', 'receiverEmail'];
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  console.log('✅ Configuration loaded successfully');
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
  } else {
    console.log('✅ Transporter is ready to send emails');
  }
});

// ============================================================
// 4. EMAIL TEMPLATE BUILDER
// ============================================================
const buildEmailTemplate = (data) => {
  const { user_name, user_email, subject, message } = data;

  return {
    from: `"Portfolio Contact" <${config.senderEmail}>`,
    to: config.receiverEmail,
    replyTo: user_email,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: #0B0F19; 
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: #111827; 
            border-radius: 12px; 
            overflow: hidden;
            border: 1px solid #1F2937;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          }
          .header { 
            background: linear-gradient(135deg, #0A74DA, #0A5A9E); 
            padding: 30px; 
            text-align: center;
          }
          .header h2 { 
            color: #FFFFFF; 
            margin: 0; 
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .header p {
            color: rgba(255,255,255,0.8);
            margin: 8px 0 0 0;
            font-size: 14px;
          }
          .content { 
            padding: 30px; 
            color: #F3F4F6; 
          }
          .field { 
            margin-bottom: 20px; 
            padding-bottom: 16px;
            border-bottom: 1px solid #1F2937;
          }
          .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .label { 
            color: #9CA3AF; 
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 6px;
          }
          .value { 
            color: #F3F4F6; 
            font-size: 15px;
            word-break: break-word;
          }
          .value strong {
            color: #FFFFFF;
          }
          .message-box {
            background: #0B0F19;
            padding: 16px;
            border-radius: 8px;
            border-left: 3px solid #0A74DA;
            margin-top: 6px;
            font-size: 14px;
            line-height: 1.6;
          }
          .badge {
            display: inline-block;
            background: #0A74DA;
            color: white;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            background: #0B0F19;
            border-top: 1px solid #1F2937;
          }
          .footer p {
            color: #6B7280;
            font-size: 12px;
            margin: 0;
          }
          .footer .name {
            color: #0A74DA;
            font-weight: 600;
          }
          .footer .available {
            color: #10B981;
          }
          .divider {
            height: 1px;
            background: #1F2937;
            margin: 20px 0;
          }
          .reply-note {
            color: #6B7280;
            font-size: 12px;
            text-align: center;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📩 New Portfolio Message</h2>
            <p>You have received a new inquiry from your portfolio</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 From</div>
              <div class="value"><strong>${user_name}</strong></div>
              <div class="value" style="color: #9CA3AF; font-size: 13px;">${user_email}</div>
            </div>
            
            <div class="field">
              <div class="label">📌 Subject</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message</div>
              <div class="message-box">${message}</div>
            </div>
            
            <div class="divider"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <span class="badge">📧 Portfolio Contact</span>
              <span style="color: #6B7280; font-size: 12px;">
                <span class="available">●</span> Available for Freelance
              </span>
            </div>
            
            <p style="color: #6B7280; font-size: 12px; margin-top: 12px;">
              This message was sent through your portfolio website contact form.
              Reply directly to this email to respond to <strong>${user_name}</strong>.
            </p>
          </div>
          
          <div class="footer">
            <p>&copy; 2026 <span class="name">SIVAPRAKASAM K</span> — Full Stack Developer</p>
            <p style="font-size: 11px; color: #374151; margin-top: 4px;">
              Tiruppur, Tamil Nadu · <span class="available">Available for Freelance</span>
            </p>
          </div>
        </div>
      </body>
      </html>
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
      Reply to this email to respond to ${user_name}.
    `,
  };
};

// ============================================================
// 5. API ROUTES
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
  const { user_name, user_email, subject, message } = req.body;

  // ============================================================
  // VALIDATION
  // ============================================================
  if (!user_name || !user_email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required',
      fields: {
        user_name: !user_name ? 'Name is required' : null,
        user_email: !user_email ? 'Email is required' : null,
        subject: !subject ? 'Subject is required' : null,
        message: !message ? 'Message is required' : null,
      },
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

  // Length validation
  if (message.length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Message must be at least 10 characters long',
    });
  }

  // Sanitize inputs to prevent injection
  const sanitized = {
    user_name: user_name.trim().slice(0, 100),
    user_email: user_email.trim().slice(0, 100),
    subject: subject.trim().slice(0, 200),
    message: message.trim().slice(0, 5000),
  };

  try {
    // Build email template
    const mailOptions = buildEmailTemplate(sanitized);

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

    // Log detailed error for debugging (but don't expose to client)
    const errorMessage = error.code === 'EAUTH' 
      ? 'Authentication failed. Please check email credentials.'
      : error.code === 'ECONNECTION'
      ? 'Connection failed. Please check network or SMTP settings.'
      : 'Failed to send email. Please try again later.';

    return res.status(500).json({
      success: false,
      error: errorMessage,
      code: error.code || 'UNKNOWN_ERROR',
    });
  }
});

// ============================================================
// 6. ERROR HANDLING MIDDLEWARE
// ============================================================
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// ============================================================
// 7. START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 Sender: ${config.senderEmail}`);
  console.log(`📬 Receiver: ${config.receiverEmail}`);
  console.log(`🌐 CORS enabled for: http://localhost:5173`);
});