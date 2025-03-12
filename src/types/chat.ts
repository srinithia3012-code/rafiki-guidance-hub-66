
import { GuidanceCategory } from "@/services/ai";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  category?: GuidanceCategory;
  sentiment?: "positive" | "negative" | "neutral";
}
