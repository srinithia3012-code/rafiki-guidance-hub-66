
/**
 * Simple sentiment analysis utility functions
 */

export type Sentiment = "positive" | "negative" | "neutral";

// Simple keywords-based sentiment analysis
export const analyzeSentiment = async (text: string): Promise<{sentiment: Sentiment, score: number}> => {
  const positiveWords = ["happy", "great", "excellent", "good", "wonderful", "fantastic", "excited"];
  const negativeWords = ["sad", "bad", "terrible", "anxious", "worried", "stressed", "depressed", "overwhelmed"];
  
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  let sentiment: Sentiment = "neutral";
  let score = 0;
  
  if (positiveCount > negativeCount) {
    sentiment = "positive";
    score = positiveCount / (positiveCount + negativeCount);
  } else if (negativeCount > positiveCount) {
    sentiment = "negative";
    score = -negativeCount / (positiveCount + negativeCount);
  }
  
  return { sentiment, score };
};
