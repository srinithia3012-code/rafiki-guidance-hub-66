# Gemini Chat Edge Function Deployment Guide

## Step 1: Access the Supabase Dashboard
1. Go to [https://app.supabase.io/](https://app.supabase.io/)
2. Log in and select your project: **mhbhyimkykyvuphbefwg**

## Step 2: Navigate to Edge Functions
1. In the left sidebar, click on **Edge Functions**

## Step 3: Create a New Edge Function
1. Click on the **New Function** button
2. Enter the name: `gemini-chat`
3. Click **Create Function**

## Step 4: Copy and Paste the Function Code
1. Open the `supabase/functions/gemini-chat/index.ts` file in your project
2. Copy its entire content
3. Paste it into the code editor in the Supabase Dashboard
4. Click **Deploy**

## Step 5: Set Environment Variables
1. In the Edge Functions section, find the settings for your function
2. Add these environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `SUPABASE_URL`: https://mhbhyimkykyvuphbefwg.supabase.co
   - `SUPABASE_ANON_KEY`: Your Supabase anon key (from your .env file)
3. Save the environment variables

## Step 6: Test the Function
1. Find the "Test" or "Invoke" option in the function details
2. Use this test payload:
```json
{
  "message": "Hello, testing the deployment",
  "category": "general",
  "chatHistory": []
}
```
3. Make sure you're authenticated (add an Authorization header if needed)
4. Execute the test and verify you get a successful response

## Step 7: Update Your Frontend
1. Make sure your `.env` file has:
```
VITE_API_URL=https://mhbhyimkykyvuphbefwg.supabase.co/functions/v1
```

## Troubleshooting
- If you get a 401 Unauthorized error: Check your authentication setup
- If you get a 500 Internal Server Error: Check the function logs
- If the function isn't found: Verify the deployment was successful

Your Chat V2 interface should now work with the Edge Function! 