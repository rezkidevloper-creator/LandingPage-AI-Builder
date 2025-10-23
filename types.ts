
export interface ScriptSection {
  text: string;
  image_prompt: string;
}

export interface CustomerReview {
  name: string;
  region: string;
  review: string;
}

export interface LandingPageContent {
  main_title: string;
  sub_title: string;
  script_sections: ScriptSection[];
  video_prompt: string;
  cta: string;
  customer_reviews: CustomerReview[];
}
