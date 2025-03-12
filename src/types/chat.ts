
import { GuidanceCategory } from "@/services/ai";
import { Sentiment } from "@/utils/sentimentAnalysis";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  category?: GuidanceCategory;
  sentiment?: Sentiment;
}
