# Email Form Setup Guide

To make the contact form work, you need to set up two services:

## 1. EmailJS Setup (For Sending Emails)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)

### Step 2: Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your website contact form.
reCAPTCHA Token: {{recaptcha_token}}
```

4. **Copy the Template ID** (you'll need this)

### Step 4: Get Public Key
1. Go to **Account** → **General** → **API Keys**
2. Copy your **Public Key**

## 2. Google reCAPTCHA Setup (For Spam Protection)

### Step 1: Get reCAPTCHA Site Key
1. Go to [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Sign in with your Google account
3. Fill in the form:
   - **Label**: Your Website Name
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - Your production domain (e.g., `avitalglazer.com`)
4. Accept the terms and click **Submit**
5. **Copy the Site Key** (you'll need this)

## 3. Configure Environment Variables

### Create `.env` file in the project root:

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# Google reCAPTCHA Configuration
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

### Replace the placeholders:
- `your_service_id_here` → Your EmailJS Service ID
- `your_template_id_here` → Your EmailJS Template ID
- `your_public_key_here` → Your EmailJS Public Key
- `your_recaptcha_site_key_here` → Your reCAPTCHA Site Key

## 4. Restart Development Server

After creating the `.env` file:
```bash
npm run dev
```

## 5. Test the Form

1. Fill out the contact form on your site
2. Submit it
3. Check your email inbox (the email configured in EmailJS)
4. You should receive the message!

## Troubleshooting

### Form not sending emails?
- Check browser console for errors
- Verify all environment variables are set correctly
- Make sure EmailJS service is active
- Check EmailJS dashboard for error logs

### reCAPTCHA errors?
- Verify the site key is correct
- Make sure you added `localhost` to reCAPTCHA domains (for development)
- Check browser console for reCAPTCHA errors

### Still not working?
- Check that `.env` file is in the project root (same level as `package.json`)
- Restart your dev server after creating/updating `.env`
- For production, set these same environment variables in your hosting platform

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add the same environment variables in your hosting platform's settings
2. Make sure to add your production domain to reCAPTCHA domains
3. Rebuild and deploy

