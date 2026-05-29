export type ThemeStyle = "light" | "dark" | "warm" | "cool" | "mono";

export type Theme = {
  primary: string;
  accent: string;
  background: string;
  text?: string;
  style: ThemeStyle;
  fontHeading?: string;
  fontBody?: string;
};

export type HeroSection = {
  photo: string;
  catchphrase: string;
  subtitle: string;
};

export type StorySection = {
  heading: string;
  body: string;
  career?: string[];
  breakoutImage?: { src: string; caption?: string };
};

export type Service = {
  title: string;
  description: string;
  icon?: string;
};

export type Achievement = {
  label: string;
  detail?: string;
  date?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  authorTitle?: string;
  photo?: string;
};

export type SnsLink = {
  platform:
    | "x"
    | "instagram"
    | "youtube"
    | "note"
    | "linkedin"
    | "tiktok"
    | "facebook"
    | "website";
  url: string;
  label?: string;
};

export type ContactLink = {
  type: "line" | "email" | "calendly" | "phone" | "form";
  url: string;
  label: string;
};

export type ClientData = {
  slug: string;
  name: string;
  nameKana?: string;
  title: string;
  subtitle: string;
  theme: Theme;
  sections: {
    hero: HeroSection;
    story: StorySection;
    services: Service[];
    achievements: Achievement[];
    testimonials: Testimonial[];
    vision: { heading: string; body: string; backgroundImage?: string };
    gallery?: { src: string; caption?: string }[];
    sns: SnsLink[];
    contact: ContactLink[];
  };
};
