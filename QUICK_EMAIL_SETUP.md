# Quick Email Setup - 5 Minutes

To enable the contact form to send emails to **retailmarketingpro1.0@gmail.com**, choose ONE of these options:

## ✅ Option 1: Web3Forms (Fastest - 2 minutes)

1. Go to https://web3forms.com/
2. Enter your email: `retailmarketingpro1.0@gmail.com`
3. Copy the access key you receive
4. Create a `.env` file in `POS-web-project/` folder:
   ```
   VITE_WEB3FORMS_KEY=paste_your_access_key_here
   ```
5. Restart your dev server

**Done!** The form will now send emails.

## ✅ Option 2: EmailJS (More Features - 5 minutes)

1. Sign up at https://www.emailjs.com/ (free)
2. Add Email Service → Connect Gmail (or your email provider)
3. Create Email Template:
   - **To Email:** `retailmarketingpro1.0@gmail.com`
   - **Subject:** `New Contact Form Submission from {{from_name}}`
   - **Message Template:**
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Mobile: {{mobile}}
     Business Type: {{business_type}}
     
     Message:
     {{message}}
     ```
4. Copy Service ID, Template ID, and Public Key
5. Create `.env` file:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
6. Restart dev server

## ✅ Option 3: No Setup (Default)

If no email service is configured, the form will:
- Save submissions to the database
- Sync to Supabase
- You can manually process them later

## Test It

1. Fill out the form at `/contact`
2. Submit
3. Check `retailmarketingpro1.0@gmail.com` inbox

The form tries these methods in order: EmailJS → Web3Forms → Supabase Function → Database (fallback)

