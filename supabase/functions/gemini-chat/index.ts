
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

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
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Only handle POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    console.log("Received request in Gemini Edge Function");
    
    // Parse the request body
    const { message, category, chatHistory } = await req.json();
    
    console.log("Message:", message);
    console.log("Category:", category);
    console.log("Chat History Length:", chatHistory?.length || 0);
    
    if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === "") {
      console.error("Missing GEMINI_API_KEY in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "Configuration error", 
          text: "The AI service is not properly configured. Please contact support." 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

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
        systemPrompt += "Focus on mental health support, emotional well-being, and self-care strategies. " +
          "Provide empathetic responses and practical coping mechanisms for stress, anxiety, depression, and other mental health concerns. " +
          "If someone appears to be in crisis, suggest they reach out to professional mental health services. " +
          "Always validate their feelings and provide evidence-based suggestions when appropriate.";
        break;
      case "stress_management":
        systemPrompt += "Focus on stress management techniques, work-life balance, mindfulness practices, and coping mechanisms. " +
          "Provide specific breathing exercises, grounding techniques, and practical strategies to reduce stress. " +
          "Suggest ways to incorporate self-care into daily routines and build resilience.";
        break;
      default:
        systemPrompt += "Provide general guidance on university life, academics, career, and well-being.";
    }

    // Format the chat history for Gemini 2.0
    const formattedHistory = chatHistory?.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })) || [];

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

    console.log("Calling Gemini API with API key:", GEMINI_API_KEY.substring(0, 5) + "...");
    
    try {
      // Call the Gemini API with the updated URL and model
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error response:", response.status, errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Gemini API response status:", response.status);
      
      // Check if there was an error with the Gemini API
      if (data.error) {
        console.error("Gemini API error:", data.error);
        return new Response(JSON.stringify({ error: "Failed to get response from AI", details: data.error }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Extract the AI's response text from the new API response format
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
      console.log("Successfully generated AI response");

      // If this is a mental health or stress management conversation, log it for the user
      if (category === "mental_health" || category === "stress_management") {
        try {
          console.log("Logging wellness interaction for user:", session.user.id);
          // In a real implementation, we would store this in Supabase
        } catch (logError) {
          console.error("Error logging wellness interaction:", logError);
        }
      }

      return new Response(JSON.stringify({ text: aiResponse }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (geminiError) {
      console.error("Error calling Gemini API:", geminiError);
      
      // Fallback to mock response if Gemini API fails
      console.log("Using fallback response due to API error");
      const fallbackResponse = getFallbackResponse(category);
      
      return new Response(JSON.stringify({ text: fallbackResponse }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in gemini-chat function:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred", details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Fallback responses for when the API fails
function getFallbackResponse(category: string): string {
  switch (category) {
    case "academic":
      return "I recommend creating a structured study schedule and using active learning techniques like teaching concepts to others or using practice tests. Would you like more specific academic advice?";
    case "career":
      return "Consider exploring internships related to your field of study and building a professional network through LinkedIn. What specific career concerns do you have?";
    case "mental_health":
      return "It's important to prioritize self-care and reach out for support when needed. Simple practices like mindfulness, physical activity, and connecting with friends can help. Would you like to discuss specific strategies?";
    case "stress_management":
      return "Deep breathing exercises, progressive muscle relaxation, and taking short breaks can help manage stress. Remember that it's okay to set boundaries. What specific stressors are you facing?";
    default:
      return "I'm here to support you through your academic journey. What specific area would you like guidance on today?";
  }
}
