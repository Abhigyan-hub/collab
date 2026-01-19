# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Get Your Supabase Credentials**
   - Go to Project Settings > API
   - Copy your Project URL and anon/public key

3. **Create Environment File**
   - Create a `.env` file in the root directory
   - Add your credentials:
     ```
     VITE_SUPABASE_URL=https://fjupcoiruqlvkljsojqf.supabase.co
     VITE_SUPABASE_ANON_KEY=sb_publishable_61TnpEGQyRSPW9iGyMvX7w_-jQpAJeU
     ```

## Step 3: Set Up Database

1. **Run SQL Script**
   - Go to Supabase Dashboard > SQL Editor
   - Copy and paste the contents of `supabase-setup.sql`
   - Run the script

2. **Create Storage Bucket**
   - Go to Supabase Dashboard > Storage
   - Create a new bucket named `room-images`
   - Set it to Public (or configure policies as shown in the SQL file)

3. **Set Up Storage Policies**
   - In the Storage section, go to Policies for `room-images`
   - Add the policies mentioned in the SQL file comments
   - Or use the Supabase Dashboard UI to create policies

## Step 4: Enable Authentication Providers

1. **Email/Password** (Already enabled by default)
   - Go to Authentication > Providers
   - Ensure Email is enabled

2. **Google OAuth** (Optional)
   - Go to Authentication > Providers
   - Enable Google
   - Add your Google OAuth credentials
   - Add authorized redirect URL: `http://localhost:5173` (for dev)

## Step 5: Run the Application

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Step 6: Test the Application

1. **Sign Up**
   - Go to `/signup`
   - Create a new account
   - Check your email for verification (if email confirmation is enabled)

2. **Login**
   - Go to `/login`
   - Login with your credentials

3. **Access Dashboard**
   - After login, you'll be redirected to `/room-owner/dashboard`
   - Click "Add New Listing" to create your first room listing

## Troubleshooting

### Route Tree Not Generated
If you see errors about missing route tree:
```bash
npm run dev
```
The TanStack Router plugin will generate the route tree automatically on first run.

### Supabase Connection Issues
- Verify your `.env` file has correct credentials
- Check that your Supabase project is active
- Ensure RLS policies are set up correctly

### Image Upload Issues
- Verify the `room-images` bucket exists
- Check storage policies allow uploads
- Ensure bucket is public or policies allow public access

### Authentication Issues
- Check Supabase Auth settings
- Verify email templates are configured
- Check browser console for detailed error messages

## Next Steps

- Customize the UI styling in `src/index.css`
- Add more features like search functionality
- Implement roommate finder feature
- Add admin panel functionality
