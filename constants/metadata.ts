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
  "framework",
  "code",
  "help",
  "support",
  "ask",
  "question",
  "get help",
  "get answers",
  "get support",
  "get help with code",
  "example",
  "tutorial",
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
