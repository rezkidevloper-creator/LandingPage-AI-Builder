import { GoogleGenAI, Type } from "@google/genai";
import type { LandingPageContent } from '../types';

// The API key is hardcoded as per the user's explicit request.
const ai = new GoogleGenAI({ apiKey: "AIzaSyDUqYqDoJhIhkkLNl2EefuAblv1OkOxWGk" });

export interface GenerationOptions {
  freeDelivery: boolean;
  scriptCount: number;
  reviewCount: number;
  targetAudience: 'all' | 'men' | 'women';
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    main_title: { type: Type.STRING, description: "The brand name or main product title." },
    sub_title: { type: Type.STRING, description: "An emotional, benefit-driven tagline or hook." },
    script_sections: {
      type: Type.ARRAY,
      description: "Sections of the landing page, alternating text and image prompts.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "Persuasive text in Arabic, under 50 words." },
          image_prompt: { type: Type.STRING, description: "Detailed AI image prompt in English." }
        },
        required: ["text", "image_prompt"]
      }
    },
    video_prompt: {
      type: Type.STRING,
      description: "A prompt for a 4-second, 2x speed product video, in English."
    },
    cta: {
      type: Type.STRING,
      description: "A strong call to action in Arabic, mentioning a discount or free delivery."
    },
    customer_reviews: {
      type: Type.ARRAY,
      description: "Synthesized positive customer reviews.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "A common first name from the target country." },
          region: { type: Type.STRING, description: "A major city or region from the target country." },
          review: { type: Type.STRING, description: "The customer's positive feedback in Arabic." }
        },
        required: ["name", "region", "review"]
      }
    }
  },
  required: ["main_title", "sub_title", "script_sections", "video_prompt", "cta", "customer_reviews"]
};


export const generateLandingPageContent = async (productUrl: string, targetCountry: string, options: GenerationOptions): Promise<LandingPageContent> => {
  const { freeDelivery, scriptCount, reviewCount, targetAudience } = options;

  const targetMarketInstruction = targetCountry
    ? `**Market Focus:** VERY IMPORTANT: Tailor all ARABIC text to the specific dialect, slang, and cultural nuances of the target market: **${targetCountry}**. Customer names and regions must also be specific to ${targetCountry}.`
    : `**Market Focus:** Use a general Arabic tone suitable for the entire MENA region. Use a variety of common Arabic names and regions (e.g., KSA, UAE, EGY).`;
  
  const audienceInstruction = targetAudience !== 'all'
    ? `**Audience Focus:** All content, especially the tone and language, must be tailored to appeal specifically to **${targetAudience}**. Customer review names should be appropriate for this audience (e.g., male names for 'men', female names for 'women').`
    : '';

  const ctaInstruction = freeDelivery 
    ? "The CTA must include a special offer for free delivery." 
    : "The CTA must include a special offer like a discount.";

  const algeriaCtaOverride = targetCountry === 'Algeria' 
    ? `\n- **Algeria Specific CTA:** The CTA MUST specifically mention "التوصيل متوفر لـ 58 ولاية" (Delivery is available to 58 provinces). This is a mandatory requirement.`
    : '';

  const prompt = `
    You are a world-class automation agent for creating high-converting e-commerce landing pages.
    Your goal is to generate a complete landing page script and asset plan for Canva based on this product link: ${productUrl}

    ${targetMarketInstruction}
    ${audienceInstruction}

    **YOUR TASK:**
    1.  **Analyze Product:** Pretend you have full access to the product link. Extract the product title, description, specifications, and synthesize key themes from positive customer reviews. Identify the main benefits and unique selling points.
    2.  **Generate Plan:** Create a complete landing page plan based on your analysis and the content details below.
    3.  **Language:** All user-facing text (titles, descriptions, reviews, CTA) MUST be in ARABIC. Image and video prompts MUST be in ENGLISH.
    4.  **Style:** The tone must be persuasive, emotional, and concise. Each text block should be under 50 words.
    5.  **Output:** Return ONLY a valid JSON object matching the provided schema. No extra text or markdown.

    **CONTENT DETAILS:**
    - **script_sections**: Create exactly **${scriptCount}** sections. Start with a product introduction, then highlight key features with benefit-oriented text.
    - **customer_reviews**: Create exactly **${reviewCount}** realistic and positive reviews, adhering to the Market and Audience Focus instructions.
    - **cta**: ${ctaInstruction} ${algeriaCtaOverride}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as LandingPageContent;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to parse response from AI service.");
  }
};