
// This is a placeholder for the Google AI API integration
// You'll need to replace this with the actual Google Gemini API when available

const GEMINI_API_KEY = "AIzaSyA70s3cQXLM73NY1sQaMxdxdQDKNtkEgjs";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface AIResponse {
  text: string;
  sources?: {
    title: string;
    url: string;
  }[];
}

// Categories for different types of guidance
export type GuidanceCategory = 
  | "career" 
  | "academic" 
  | "mental_health" 
  | "stress_management"
  | "general";

// Custom prompts for different categories
const CATEGORY_PROMPTS: Record<GuidanceCategory, string> = {
  career: "As a professional career advisor for university students, provide thoughtful, practical guidance on career paths, job opportunities, and skill development. Focus on personalized advice relevant to modern job markets.",
  academic: "As an experienced academic advisor for university students, provide thoughtful, practical guidance on study techniques, course selection, and academic planning. Offer specific, actionable strategies for academic success.",
  mental_health: "As a supportive mental health counselor for university students, provide compassionate, evidence-based guidance for emotional wellbeing. Offer practical coping strategies while being clear that you're not a replacement for professional therapy.",
  stress_management: "As a stress management coach for university students, provide practical, evidence-based techniques for managing academic pressure, balancing responsibilities, and maintaining wellbeing. Focus on actionable strategies.",
  general: "As Rafiki, a supportive AI counselor for university students, provide thoughtful guidance on academic, career, and personal wellbeing topics. Offer practical, relevant advice while maintaining a supportive tone."
};

// Function to generate system prompt based on category
const getSystemPrompt = (category: GuidanceCategory): string => {
  return `${CATEGORY_PROMPTS[category]} 
  
Your name is Rafiki, an AI counselor specifically designed to help university students. Your responses should be:
- Supportive and empathetic but not overly emotional
- Evidence-based and practical
- Tailored to university student needs and concerns
- Balanced with both encouragement and realistic advice
- Clear about your limitations (you're not a replacement for professional services)

Keep responses concise (under 250 words) unless detailed explanations are requested.`;
};

export const sendMessageToAI = async (
  message: string, 
  category: GuidanceCategory = "general",
  chatHistory: ChatMessage[] = []
): Promise<AIResponse> => {
  try {
    // Construct our conversation with system prompt
    const systemPrompt = getSystemPrompt(category);
    
    const fullPrompt = [
      { role: "user" as const, content: systemPrompt },
      ...chatHistory,
      { role: "user" as const, content: message }
    ];
    
    const requestBody = {
      contents: fullPrompt.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    // For development/MVP, we'll use a sample response if the API key isn't available
    // In a production environment, you would always call the API
    if (!GEMINI_API_KEY) {
      console.warn("No API key provided - using mock response");
      return getMockResponse(message, category);
    }
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI API error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "I'm sorry, I couldn't generate a response at this time.";
    
    return {
      text: responseText
    };
  } catch (error) {
    console.error("Error calling AI API:", error);
    return getMockResponse(message, category);
  }
};

// Function to get mock responses for development/fallback
function getMockResponse(message: string, category: GuidanceCategory): AIResponse {
  const responses: Record<GuidanceCategory, string[]> = {
    career: [
      "Based on what you've shared about your interests in technology and design, you might consider exploring UX/UI design as a career path. This field combines creativity with technical skills and has strong demand in the job market. I recommend taking an introductory course on platforms like Coursera or Udemy to get a better feel for it.",
      "When building your resume for tech positions, focus on showcasing projects rather than just listing skills. Employers value seeing how you've applied your knowledge. Consider creating a portfolio website that highlights 3-4 of your best projects with explanations of your process and contribution."
    ],
    academic: [
      "For managing a heavy course load, the evidence-based Pomodoro Technique might work well for you. Study in focused 25-minute sessions with 5-minute breaks. This helps maintain concentration while preventing burnout. Try using this for your most challenging subjects first when your energy is highest.",
      "When preparing for exams, active recall is proven to be more effective than re-reading notes. Try explaining concepts aloud as if teaching someone else, or create practice questions for yourself. Research shows this significantly improves retention compared to passive review methods."
    ],
    mental_health: [
      "What you're describing sounds like it might be anxiety related to academic performance. Many students experience this. Some evidence-based strategies include: 1) Scheduled worry time - allocate 15 minutes daily to write down concerns, 2) Deep breathing exercises when feeling overwhelmed, and 3) Challenging perfectionist thinking patterns. If these feelings persist, your university counseling center is a good resource.",
      "Sleep quality significantly impacts mental health. Consider establishing a consistent sleep routine: going to bed and waking up at the same time, avoiding screens an hour before bed, and creating a restful environment. Even small improvements in sleep can have noticeable effects on mood and stress levels."
    ],
    stress_management: [
      "For managing exam stress, try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8. Research shows this activates your parasympathetic nervous system, reducing the physical symptoms of stress. Practice this for 2 minutes before studying and again before your exam.",
      "Time management is key for reducing academic stress. The Eisenhower Matrix can help: categorize tasks by urgency and importance, then prioritize accordingly. This helps prevent last-minute cramming, which is a major source of student stress. Start by mapping out your assignments for the next two weeks."
    ],
    general: [
      "Finding balance between academics and social life is important for overall wellbeing. Research suggests that scheduling specific time for both studying and socializing tends to be more effective than a less structured approach. Perhaps try using a digital calendar to block time for your priorities each week, including study blocks, social activities, and personal time.",
      "Many students find the transition to university challenging. It's completely normal to feel overwhelmed at times. Consider identifying one small action that might help your situation today - whether that's talking to a professor during office hours, connecting with a classmate, or taking a short break for self-care. Small steps often lead to meaningful progress."
    ]
  };
  
  // Simple logic to choose a relevant response
  const categoryResponses = responses[category];
  let responseIndex = 0;
  
  // Very simple keyword matching to pick more relevant responses
  if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("anxiety")) {
    responseIndex = 1;  
  }
  
  return {
    text: categoryResponses[responseIndex % categoryResponses.length]
  };
}

// Function for sentiment analysis (simplified implementation)
export const analyzeSentiment = async (text: string): Promise<{
  sentiment: "positive" | "negative" | "neutral";
  score: number;
}> => {
  // This is a placeholder for the Google NLP API integration
  // In a real implementation, you would call the Google NLP API here

  // Simple sentiment detection for development
  const positiveWords = ["good", "great", "happy", "excited", "excellent", "helpful", "thank", "thanks"];
  const negativeWords = ["bad", "sad", "disappointed", "anxious", "worried", "stressed", "unhappy", "angry"];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  const total = words.length;
  const positiveScore = positiveCount / total;
  const negativeScore = negativeCount / total;
  const score = positiveScore - negativeScore;
  
  let sentiment: "positive" | "negative" | "neutral" = "neutral";
  if (score > 0.05) sentiment = "positive";
  if (score < -0.05) sentiment = "negative";
  
  return {
    sentiment,
    score: score
  };
};
