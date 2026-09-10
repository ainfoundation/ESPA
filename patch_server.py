import re
with open('server.ts', 'r') as f:
    content = f.read()

new_route = """
app.post('/api/send-otp', apiLimiter, async (req, res) => {
  const { email, otp, recaptchaToken } = req.body;
  
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });
  
  // Verify recaptcha if provided
  if (recaptchaToken) {
    const isValid = await verifyRecaptcha(recaptchaToken);
    if (!isValid) return res.status(400).json({ error: 'reCAPTCHA verification failed' });
  }

  try {
    await transporter.sendMail({
      from: '"ESPA Library" <foundationespa@gmail.com>',
      to: email,
      subject: `Your Library Verification Code: ${otp}`,
      text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: 'Poppins'; max-width: 500px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #004B36; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0;">Verification Code</h2>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9; text-align: center;">
            <p style="color: #333; margin-bottom: 20px;">Use the following code to verify your account:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #004B36; padding: 15px; background: white; border-radius: 8px; display: inline-block; border: 1px dashed #004B36;">
              ${otp}
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">This code will expire in 10 minutes.</p>
          </div>
        </div>
      `
    });
    console.log(`Successfully sent OTP to ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

// Serve static files
"""

content = re.sub(r'// Serve static files in production', new_route + '\n// Serve static files in production', content)

with open('server.ts', 'w') as f:
    f.write(content)
