import { auth } from "@/auth";
import ROUTES from "@/constants/routes";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalSearch from "@/components/search/LocalSearch";

const questions = [
  {
    _id: "1",
    title: "How to implement authentication in Next.js?",
    description: "I am looking for best practices to implement authentication in a Next.js application.",
    tags: ["Next.js", "Authentication", "Web Development"],
    author: { _id: "a1", name: "John Doe", avatarUrl: "/avatars/john.png" },
    upvotes: 15,
    answers: 5,
    views: 100,
    createdAt: new Date("2024-01-15T10:00:00Z"),
  },
  {
    _id: "2",
    title: "Best practices for React state management?",
    description:
      "What are the most efficient ways to manage complex state in large React applications? Should I use Context, Redux, or Zustand?",
    tags: ["React", "State Management", "Redux", "Context API"],
    author: { _id: "a2", name: "Sarah Smith", avatarUrl: "/avatars/sarah.png" },
    upvotes: 42,
    answers: 12,
    views: 350,
    createdAt: new Date("2024-02-20T14:30:00Z"),
  },
  {
    _id: "3",
    title: "How to optimize SQL queries for better performance?",
    description:
      "My database queries are running slow. What indexing strategies and query optimization techniques should I implement?",
    tags: ["SQL", "Database", "Performance", "Optimization"],
    author: { _id: "a3", name: "Mike Johnson", avatarUrl: "/avatars/mike.png" },
    upvotes: 28,
    answers: 8,
    views: 220,
    createdAt: new Date("2024-03-05T09:15:00Z"),
  },
  {
    _id: "4",
    title: "Understanding Docker containerization basics",
    description:
      "I'm new to Docker and need help understanding containers, images, and how to dockerize my Node.js application.",
    tags: ["Docker", "DevOps", "Containerization", "Node.js"],
    author: { _id: "a4", name: "Emily Chen", avatarUrl: "/avatars/emily.png" },
    upvotes: 67,
    answers: 15,
    views: 580,
    createdAt: new Date("2024-03-12T16:45:00Z"),
  },
  {
    _id: "5",
    title: "TypeScript generics explained with examples",
    description:
      "Can someone explain TypeScript generics with practical examples? I'm struggling to understand when and how to use them.",
    tags: ["TypeScript", "JavaScript", "Programming", "Generics"],
    author: { _id: "a5", name: "David Lee", avatarUrl: "/avatars/david.png" },
    upvotes: 53,
    answers: 9,
    views: 410,
    createdAt: new Date("2024-04-01T11:20:00Z"),
  },
  {
    _id: "6",
    title: "How to handle errors in async/await functions?",
    description:
      "What's the best way to handle errors in async/await JavaScript functions? Should I use try-catch or .catch()?",
    tags: ["JavaScript", "Async/Await", "Error Handling", "Promises"],
    author: { _id: "a6", name: "Lisa Wang", avatarUrl: "/avatars/lisa.png" },
    upvotes: 34,
    answers: 11,
    views: 290,
    createdAt: new Date("2024-04-18T08:00:00Z"),
  },
  {
    _id: "7",
    title: "CSS Grid vs Flexbox: When to use which?",
    description:
      "I'm confused about when to use CSS Grid versus Flexbox for layouts. Can someone clarify the use cases for each?",
    tags: ["CSS", "Grid", "Flexbox", "Web Design", "Frontend"],
    author: { _id: "a7", name: "Alex Rodriguez", avatarUrl: "/avatars/alex.png" },
    upvotes: 89,
    answers: 18,
    views: 750,
    createdAt: new Date("2024-05-03T13:30:00Z"),
  },
  {
    _id: "8",
    title: "Implementing JWT authentication in Express.js",
    description:
      "Need guidance on implementing secure JWT authentication with refresh tokens in an Express.js REST API.",
    tags: ["Express.js", "JWT", "Authentication", "Node.js", "Security"],
    author: { _id: "a8", name: "Rachel Green", avatarUrl: "/avatars/rachel.png" },
    upvotes: 21,
    answers: 6,
    views: 180,
    createdAt: new Date("2024-06-10T10:45:00Z"),
  },
  {
    _id: "9",
    title: "How to deploy Next.js app to Vercel?",
    description:
      "Step-by-step guide needed for deploying a Next.js application to Vercel with custom domain and environment variables.",
    tags: ["Next.js", "Vercel", "Deployment", "DevOps"],
    author: { _id: "a9", name: "Tom Anderson", avatarUrl: "/avatars/tom.png" },
    upvotes: 45,
    answers: 7,
    views: 320,
    createdAt: new Date("2024-07-22T15:00:00Z"),
  },
  {
    _id: "10",
    title: "React useEffect cleanup function explained",
    description: "When and why should I return a cleanup function from useEffect? What happens if I don't include one?",
    tags: ["React", "Hooks", "useEffect", "JavaScript", "Best Practices"],
    author: { _id: "a10", name: "Nina Patel", avatarUrl: "/avatars/nina.png" },
    upvotes: 76,
    answers: 13,
    views: 620,
    createdAt: new Date("2024-08-14T12:10:00Z"),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
async function Home({ searchParams }: SearchParams) {
  const { query } = await searchParams;
  // const { data } = await axios.get('/api/questions', { query: { search:query } });

  const filteredQuestions = questions.filter((question) => {
    return question.title.toLowerCase().includes(((query as string) || "")?.toLowerCase());
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3" asChild>
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch route="/" imgSrc="/icons/search.svg" placeholder="Search questions..." otherClasses="flex-1" />
      </section>
      {/* HomeFilter */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h2 key={question._id}>{question.title}</h2>
        ))}
      </div>
    </>
  );
}

export default Home;
