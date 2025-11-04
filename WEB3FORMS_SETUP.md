# Web3Forms Setup - Step by Step Guide

## Quick Setup (2 minutes)

### Step 1: Get Your Access Key

1. **Visit Web3Forms**: Go to https://web3forms.com/
2. **Enter Your Email**: 
   - Enter: `retailmarketingpro1.0@gmail.com`
   - Click "Get Your Access Key"
3. **Check Your Email**:
   - Open the email from Web3Forms
   - Copy the access key (looks like: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`)

### Step 2: Add to Project

1. **Open the `.env` file** in `POS-web-project/` folder
2. **Replace the placeholder**:
   ```
   VITE_WEB3FORMS_KEY=YOUR_WEB3FORMS_ACCESS_KEY_HERE
   ```
   With your actual key:
   ```
   VITE_WEB3FORMS_KEY=a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
   ```
   (Use the actual key you received in the email)

3. **Save the file**

### Step 3: Restart Dev Server

1. **Stop your dev server** (if running): Press `Ctrl+C` in terminal
2. **Restart it**:
   ```bash
   cd POS-web-project
   npm run dev
   ```

### Step 4: Test

1. **Go to the contact form**: Navigate to `/contact` in your web app
2. **Fill out the form** with test data
3. **Submit the form**
4. **Check email**: Check `retailmarketingpro1.0@gmail.com` inbox
5. **Verify**: You should receive an email with the form submission details

## ✅ Done!

The contact form will now automatically send emails to **retailmarketingpro1.0@gmail.com** when users submit the form.

## Troubleshooting

**If emails aren't sending:**
1. Make sure the `.env` file is in the `POS-web-project/` folder (not a subfolder)
2. Make sure the key doesn't have quotes or spaces
3. Restart the dev server after adding the key
4. Check browser console for any errors
5. Verify the access key is correct in the Web3Forms dashboard

**If you need to change the recipient email:**
- The email is set to `retailmarketingpro1.0@gmail.com` in the code
- To change it, edit `src/pages/Register.tsx` line 49: `TO_EMAIL: 'retailmarketingpro1.0@gmail.com'`

