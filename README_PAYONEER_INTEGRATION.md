# Integrating Payoneer Checkout API

To accept donations directly through Payoneer using their Checkout API instead of Stripe, you need to set up a server-to-server integration. Because Payoneer requires authenticated backend requests (using your Store ID, API Username, and Secret Key) to generate payment sessions, you cannot do this securely on the frontend alone.

Here is the complete process to integrate Payoneer Checkout:

## Step 1: Get Your Payoneer Credentials
1. Log in to your Payoneer Checkout Merchant account.
2. Go to **Integration** > **API settings**.
3. Generate and copy your:
   - **Store Code/ID**
   - **API Username** 
   - **Authentication Token / Secret Key**

## Step 2: Set Environment Variables
Add these to your Vercel Environment Variables (and your local `.env` file):

```env
PAYONEER_STORE_ID=your_store_id
PAYONEER_API_USERNAME=your_api_username
PAYONEER_API_SECRET=your_api_secret
# Use the sandbox URL for testing, production for live
PAYONEER_API_URL=https://api.sandbox.checkout.payoneer.com/v1
```

## Step 3: Create the Serverless API Endpoint (Backend)
You will need to create a new file at `api/payoneer-checkout.js` to securely generate the Payoneer "LIST" (a payment session).

```javascript
// api/payoneer-checkout.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { amount, currency = 'USD' } = req.body;

  const authString = Buffer.from(
    `${process.env.PAYONEER_API_USERNAME}:${process.env.PAYONEER_API_SECRET}`
  ).toString('base64');

  try {
    // This creates a "LIST" (Payment Session) in Payoneer
    const response = await fetch(`${process.env.PAYONEER_API_URL}/lists`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transactionId: `DONATION-${Date.now()}`,
        integration: 'DROPIN',
        payment: {
          amount: amount,
          currency: currency,
          reference: `ESPA Foundation Donation`
        },
        style: {
          language: "en"
        },
        callback: {
          returnUrl: "https://espafoundation.org/donation/success",
          cancelUrl: "https://espafoundation.org/donation/cancel",
          notificationUrl: "https://espafoundation.org/api/payoneer-webhook" 
        }
      })
    });

    const data = await response.json();
    
    // Payoneer returns a "links.paymentSession" which the frontend needs
    if (data.links && data.links.paymentSession) {
      res.status(200).json({ paymentSessionUrl: data.links.paymentSession });
    } else {
      res.status(400).json({ error: 'Failed to create payment session', details: data });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

## Step 4: Add the Payoneer Widget to the Frontend
You will need to create a new React component (e.g., `src/components/PayoneerCheckout.tsx`) that calls your API and loads the Payoneer Drop-In UI.

1. Add the Payoneer Web SDK script to your `index.html`:
```html
<script src="https://checkout.payoneer.com/web/dropin/payoneer-checkout.min.js"></script>
```

2. Create the Checkout Component:
```tsx
import React, { useState } from 'react';

export default function PayoneerCheckout({ amount }) {
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      // 1. Call your Vercel backend to create the session
      const response = await fetch('/api/payoneer-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount })
      });
      
      const data = await response.json();
      
      if (data.paymentSessionUrl) {
        // 2. Initialize Payoneer Drop-In UI using the session URL
        // @ts-ignore
        const payoneerCheckout = new window.PayoneerCheckout(data.paymentSessionUrl);
        payoneerCheckout.dropin('payment-network-container', {
          onPaymentSuccess: (result) => {
             console.log("Donation Successful!", result);
             window.location.href = '/donation/success';
          }
        });
      }
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDonate} disabled={loading} className="bg-[#004B36] text-white px-6 py-3 rounded-full">
        {loading ? 'Processing...' : `Donate $${amount}`}
      </button>
      {/* The Payoneer credit card fields will render inside this div */}
      <div id="payment-network-container"></div>
    </div>
  );
}
```

## Step 5: (Optional but Recommended) Webhooks
When a donation is successful, Payoneer will silently send a POST request to the `notificationUrl` you provided (e.g. `api/payoneer-webhook`). You can create this endpoint to securely log the donation into your Supabase database.
