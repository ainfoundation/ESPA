import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Security Middleware: Helmet for secure HTTP headers
app.use(helmet());

// Security Middleware: Rate Limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: 'Too many login attempts from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 form submissions per 15 minutes
  message: { error: 'Too many requests, please try again later.' }
});

app.use(express.json());

// Nodemailer & reCAPTCHA Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'foundationespa@gmail.com',
    pass: 'xzxp ilzw hiwu sjcr',
  },
});

const RECAPTCHA_SECRET = '6LfwCZYtAAAAAE8SIlpjwy7rLKMSekesYdxK9asA';

async function verifyRecaptcha(token: string) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// API Routes
app.post('/api/contact', apiLimiter, async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;
  if (!name || !email || !message || !recaptchaToken) return res.status(400).json({ error: 'All fields are required' });
  
  const isValid = await verifyRecaptcha(recaptchaToken);
  if (!isValid) return res.status(400).json({ error: 'reCAPTCHA verification failed' });

  try {
    await transporter.sendMail({
      from: '"ESPA Website" <foundationespa@gmail.com>',
      to: 'foundationespa@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #004B36; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}" style="color: #004B36;">${email}</a></td>
              </tr>
            </table>
            <div style="padding: 15px; background-color: #ffffff; border-left: 4px solid #004B36; border-radius: 4px;">
              <h4 style="margin-top: 0; color: #333; margin-bottom: 10px;">Message:</h4>
              <p style="white-space: pre-wrap; margin: 0; color: #555; line-height: 1.5;">${message}</p>
            </div>
          </div>
          <div style="background-color: #eeeeee; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            This email was automatically generated from the ESPA Foundation Website.
          </div>
        </div>
      `
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/volunteer', apiLimiter, async (req, res) => {
  const { name, email, area_of_interest, availability, recaptchaToken } = req.body;
  if (!name || !email || !area_of_interest || !availability || !recaptchaToken) return res.status(400).json({ error: 'All fields are required' });
  
  const isValid = await verifyRecaptcha(recaptchaToken);
  if (!isValid) return res.status(400).json({ error: 'reCAPTCHA verification failed' });

  try {
    await transporter.sendMail({
      from: '"ESPA Website" <foundationespa@gmail.com>',
      to: 'foundationespa@gmail.com',
      replyTo: email,
      subject: `New Volunteer Application from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nArea of Interest: ${area_of_interest}\nAvailability: ${availability}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #004B36; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0;">New Volunteer Application</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Name:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Email:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}" style="color: #004B36;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Area of Interest:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${area_of_interest}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0;"><strong>Availability:</strong></td>
                <td style="padding: 12px 0;">${availability}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #eeeeee; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            This email was automatically generated from the ESPA Foundation Website.
          </div>
        </div>
      `
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/partner', apiLimiter, async (req, res) => {
  const { name, organization, email, proposal, recaptchaToken } = req.body;
  if (!name || !organization || !email || !proposal || !recaptchaToken) return res.status(400).json({ error: 'All fields are required' });
  
  const isValid = await verifyRecaptcha(recaptchaToken);
  if (!isValid) return res.status(400).json({ error: 'reCAPTCHA verification failed' });

  try {
    await transporter.sendMail({
      from: '"ESPA Website" <foundationespa@gmail.com>',
      to: 'foundationespa@gmail.com',
      replyTo: email,
      subject: `New Partnership Proposal from ${organization}`,
      text: `Name: ${name}\nOrganization: ${organization}\nEmail: ${email}\n\nProposal:\n${proposal}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #004B36; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0;">New Partnership Proposal</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"><strong>Organization:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">${organization}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"><strong>Contact Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}" style="color: #004B36;">${email}</a></td>
              </tr>
            </table>
            <div style="padding: 15px; background-color: #ffffff; border-left: 4px solid #004B36; border-radius: 4px;">
              <h4 style="margin-top: 0; color: #333; margin-bottom: 10px;">Proposal Details:</h4>
              <p style="white-space: pre-wrap; margin: 0; color: #555; line-height: 1.5;">${proposal}</p>
            </div>
          </div>
          <div style="background-color: #eeeeee; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            This email was automatically generated from the ESPA Foundation Website.
          </div>
        </div>
      `
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/login', loginLimiter, (req, res) => {
  const { email, password } = req.body;

  // Extremely basic validation, relying on Zod/Yup on frontend as well
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check against environment variables
  const validEmail = process.env.ADMIN_EMAIL || 'admin@espafoundation.org';
  const validPassword = process.env.ADMIN_PASSWORD || 'securepassword123'; // Fallback for dev only

  if (email === validEmail && password === validPassword) {
    // In a real app, generate JWT here
    return res.json({
      success: true,
      user: {
        email: validEmail,
        name: 'Admin User',
        role: 'admin'
      },
      token: 'mock-jwt-token'
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Development fallback for unhandled API routes
  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
