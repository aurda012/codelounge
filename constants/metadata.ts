import { title } from "process";

export const keywords = [
  "Coding Community",
  "Coding Forum",
  "Software Q&A",
  "Coding Q&A",
  "Get Help with Coding",
  "Get Answers to Coding Questions",
  "Get Support with Code",
  "Get Help with Programming",
  "Get Answers to Programming Questions",
  "Get Support with Programming",
  "Get Help with Web Development",
  "Get Answers to Web Development Questions",
  "Get Support with Web Development",
  "Get Help with Software Engineering",
  "Get Answers to Software Engineering Questions",
  "Get Support with Software Engineering",
  "Get Answers to Technology Questions",
  "Get Help with Nextjs",
  "Get Answers to Nextjs Questions",
  "Get Support with Nextjs",
  "Get Help with React",
  "Get Answers to React Questions",
  "Get Support with React",
  "Get Help with JavaScript",
  "Get Answers to JavaScript Questions",
  "Get Support with JavaScript",
];

export const keywordAddOns = [
  "",
  "development",
  "resources",
  "help",
  "support",
  "ask",
  "questions",
  "best practices",
  "answers",
  "support",
  "learning resources",
  "code example",
  "tutorials",
];

export const addKeywords = (keywords: string[]) => {
  let keywordsList: string[] = [];
  const keys = keywords.map((keyword) => {
    const addons = keywordAddOns.map((addOn) => {
      return `${keyword} ${addOn}`;
    });
    keywordsList = keywordsList.concat(addons);
  });
  return keywordsList;
};

export const createMetadata = (
  title: string,
  description: string,
  keywords: string[]
) => {
  return {
    generator: "CodeLounge",
    applicationName: "CodeLounge",
    referrer: "origin-when-cross-origin",
    title: title,
    description: description,
    keywords: keywords,
    metadataBase: new URL("https://codelounge.vercel.app"),
    openGraph: {
      title: title,
      description: description,
      url: "https://codelounge.vercel.app",
      siteName: "CodeLounge",
      images: [
        {
          url: "https://codelounge.vercel.app/images/og-image-1200x628.png", // Must be an absolute URL
          width: 1200,
          height: 628,
          alt: "CodeLounge OG Image",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["https://codelounge.vercel.app/images/og-image-1200x628.png"], // Must be an absolute URL
    },
    icons: {
      icon: "/images/site-logo.svg",
      shortcut: "/images/favicon-32x32.png",
      apple: "/images/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: false,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      other: {
        me: ["my-email", "my-link"],
      },
    },
    category: "programming",
  };
};
