import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'foundationespa@gmail.com', pass: 'xzxp ilzw hiwu sjcr' },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const { name, organization, email, proposal, recaptchaToken } = req.body;
  
  try {
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=6LfwCZYtAAAAAE8SIlpjwy7rLKMSekesYdxK9asA&response=${recaptchaToken}`,
    });
    const verifyData = await verifyRes.json();
    
    if (!verifyData.success) {
      return res.status(400).json({ error: 'reCAPTCHA validation failed.' });
    }

    await transporter.sendMail({
      from: '"ESPA Website" <foundationespa@gmail.com>',
      to: 'foundationespa@gmail.com',
      replyTo: email,
      subject: `New Partnership Proposal from ${organization}`,
      text: `Name: ${name}\nOrganization: ${organization}\nEmail: ${email}\n\nProposal:\n${proposal}`
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Email service error: ' + error.message });
  }
}
