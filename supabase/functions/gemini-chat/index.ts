
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

serve(async (req) => {
  // Create a Supabase client with the Auth context of the logged in user
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    }
  );

  // Get the current user's session
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  // If no session, return 401
  if (!session) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Only handle POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Parse the request body
    const { message, category, chatHistory } = await req.json();

    // Build the prompt for Gemini based on the category
    let systemPrompt = "You are Rafiki, a helpful AI guidance counselor for university students. ";
    
    switch (category) {
      case "academic":
        systemPrompt += "Focus on providing academic advice, study strategies, and educational guidance.";
        break;
      case "career":
        systemPrompt += "Focus on career planning, job opportunities, and professional development advice.";
        break;
      case "mental_health":
        systemPrompt += "Focus on mental health support, emotional well-being, and self-care strategies.";
        break;
      case "stress_management":
        systemPrompt += "Focus on stress management techniques, work-life balance, and coping mechanisms.";
        break;
      default:
        systemPrompt += "Provide general guidance on university life, academics, career, and well-being.";
    }

    // Format the chat history for Gemini
    const formattedHistory = chatHistory.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Add the system prompt as the first message from the model
    const contents = [
      {
        role: "model",
        parts: [{ text: systemPrompt }],
      },
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // Call the Gemini API
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    const data = await response.json();

    // Check if there was an error with the Gemini API
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return new Response(JSON.stringify({ error: "Failed to get response from AI" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract the AI's response text
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

    // Save the chat to the database (optional, implement if needed)
    // await supabaseClient.from('chats').insert({
    //   user_id: session.user.id,
    //   message,
    //   response: aiResponse,
    //   category,
    // });

    return new Response(JSON.stringify({ text: aiResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
