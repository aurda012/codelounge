<div align="center">
  <br />
    <img src="https://raw.githubusercontent.com/aurda012/codelounge/main/public/images/github-banner-dark.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=fff&style=for-the-badge" alt="clerk" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge" alt="mongodb" />
    <img src="https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=fff&style=for-the-badge" alt="openai" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge" alt="shadcn" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">A StackOverflow Alternative.</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Find answers to your coding problems. CodeLounge is a community-driven platform designed to empower developers worldwide. Ask questions, engage with the community and collaborate on projects.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- MongoDB
- Clerk
- OpenAI
- TipTap Editor
- Lowlight
- Imagekit
- Shadcn
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Authentication**: Latest Clerk implementation with sign-in and sign-up pages.

👉 **CodeLounge AI**: Get an instant answer to your question thanks to CodeLounge's OpenAI integration.

👉 **Home-Page**: Allows people to view and search all of the published questions along with filtering for newest, recommended, frequent and unanswered.

👉 **Question Details Page**: Allows users to view the question details with formatted code along with all answers and the opportunity for you to answer yourself!

👉 **Ask A Question**: Easy to use and intuitive text editor with implementation of code blocks based on popular languages. CodeLounge AI will instantly provide you with an answer.

👉 **Community**: Enables users to find and search for other developers part of the CodeLounge community.

👉 **Collection**: Provides users with the ability to see their saved questions.

👉 **Find Jobs**: Easily search and filter through some of the latest software engineering jobs on the market.

👉 **Tags**: Search for "tags" that have been added to questions. Find questions with specific frameworks, features, etc.

👉 **Profile**: View user profiles with an interesting badge system for their activity on CodeLounge along with their questions and answers.

👉 **Edit Question**: Provides the ability to edit your question with updated details. Will also provide an updated answer from the CodeLounge AI.

👉 **Delete Questions/Answers**: Easily delete your question or answer.

👉 **Editor Keyboard Actions**: Allows users to utilize keyboard shortcuts for various actions, including copying, pasting, deleting, indenting and more.

👉 **Global Search**: Easily find questions/answers you're looking for with an implemented global search.

👉 **Loading States**: Skeletonized loading states for all pages along with a global loading state and a top-loader.

👉 **SEO Best Practices**: Implemented server side metadata to populate all needed metadata based on individual questions, tags, etc. 100% SEO score on Lighthouse.

👉 **Performance**: Implemented dynamic imports along with best practices to provide a 100% Lighthouse performance score.

and many more, including code architecture, advanced react hooks, reusability, etc.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/aurda012/codelounge.git
cd codelounge
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

MONGODB_URL=

NEXT_PUBLIC_SERVER_URL=

OPENAI_API_KEY=

NEXT_PUBLIC_IMAGE_KIT_KEY=
NEXT_PUBLIC_IMAGE_KIT_URL=
IMAGE_KIT_PRIVATE_KEY=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on the [OpenAI](https://openai.com/api), [Clerk](https://clerk.com/), and [MongoDB](https://www.mongodb.com/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
