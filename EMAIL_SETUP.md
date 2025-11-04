# Email Setup Guide for Contact Form

The contact form is configured to send emails to **retailmarketingpro1.0@gmail.com** when users submit the form.

## Quick Start (5 minutes)

### Option 1: EmailJS (Recommended - Easiest, Free tier available)

1. **Sign up for EmailJS** (Free tier available)
   - Go to https://www.emailjs.com/
   - Create a free account

2. **Create an Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Add a new service (Gmail, Outlook, etc.)
   - Connect your email account

3. **Create an Email Template**
   - Go to "Email Templates"
   - Create a new template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{mobile}}` - Mobile number
     - `{{business_type}}` - Business type
     - `{{message}}` - Message content
   - Set "To Email" to: `retailmarketingpro1.0@gmail.com`
   - Set "From Name" to: `{{from_name}}`
   - Set "Reply To" to: `{{from_email}}`
   - Set "Subject" to: `New Contact Form Submission from {{from_name}}`

4. **Get Your Credentials**
   - Copy your Service ID, Template ID, and Public Key
   - Add them to your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Option 2: Web3Forms (Alternative - No Signup Required)

1. **Get an Access Key**
   - Go to https://web3forms.com/
   - Enter your email: `retailmarketingpro1.0@gmail.com`
   - Get your access key (free)

2. **Add to Environment Variables**
   ```env
   VITE_WEB3FORMS_KEY=your_access_key_here
   ```

### Option 3: Supabase Edge Function with Resend

1. **Set up Resend**
   - Go to https://resend.com/
   - Create an account and get your API key

2. **Deploy Supabase Edge Function**
   - Deploy the function at `supabase/functions/send-email/index.ts`
   - Set up secrets in Supabase Dashboard:
     - `RESEND_API_KEY` - Your Resend API key
     - `RESEND_FROM_EMAIL` - Your sender email

3. **Deploy Function**
   ```bash
   supabase functions deploy send-email
   ```

## Current Configuration

The form automatically tries these methods in order:
1. **EmailJS** (if configured)
2. **Web3Forms** (if configured)
3. **Supabase Edge Function** (if deployed)
4. **Database Storage** (fallback - saves for manual processing)

## Testing

After setup, test the contact form:
1. Fill out the form on the `/contact` page
2. Submit the form
3. Check `retailmarketingpro1.0@gmail.com` inbox
4. Verify the email was received

## Notes

- The form always saves submissions to the database for backup
- Even if email fails, the submission is recorded
- All submissions are also synced to Supabase for record keeping

