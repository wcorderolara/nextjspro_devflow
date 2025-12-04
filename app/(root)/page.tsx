import { auth } from "@/auth";
import ROUTES from "@/constants/routes";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import { Question } from "@/types/global";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { title } from "process";

const questions: Question[] = [
  {
    _id: "1",
    title: "How to implement authentication in Next.js?",
    description: "I am looking for best practices to implement authentication in a Next.js application.",
    tags: [
      { _id: "t1-1", name: "Next.js", questions: 0 },
      { _id: "t1-2", name: "Authentication", questions: 0 },
      { _id: "t1-3", name: "Web Development", questions: 0 },
    ],
    author: {
      _id: "a1",
      name: "John Doe",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t2-1", name: "React", questions: 0 },
      { _id: "t2-2", name: "State Management", questions: 0 },
      { _id: "t2-3", name: "Redux", questions: 0 },
      { _id: "t2-4", name: "Context API", questions: 0 },
    ],
    author: {
      _id: "a2",
      name: "Sarah Smith",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/300/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t3-1", name: "SQL", questions: 0 },
      { _id: "t3-2", name: "Database", questions: 0 },
      { _id: "t3-3", name: "Performance", questions: 0 },
      { _id: "t3-4", name: "Optimization", questions: 0 },
    ],
    author: {
      _id: "a3",
      name: "Mike Johnson",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t4-1", name: "Docker", questions: 0 },
      { _id: "t4-2", name: "DevOps", questions: 0 },
      { _id: "t4-3", name: "Containerization", questions: 0 },
      { _id: "t4-4", name: "Node.js", questions: 0 },
    ],
    author: {
      _id: "a4",
      name: "Emily Chen",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/300/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t5-1", name: "TypeScript", questions: 0 },
      { _id: "t5-2", name: "JavaScript", questions: 0 },
      { _id: "t5-3", name: "Programming", questions: 0 },
      { _id: "t5-4", name: "Generics", questions: 0 },
    ],
    author: {
      _id: "a5",
      name: "David Lee",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t6-1", name: "JavaScript", questions: 0 },
      { _id: "t6-2", name: "Async/Await", questions: 0 },
      { _id: "t6-3", name: "Error Handling", questions: 0 },
      { _id: "t6-4", name: "Promises", questions: 0 },
    ],
    author: {
      _id: "a6",
      name: "Lisa Wang",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/300/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t7-1", name: "CSS", questions: 0 },
      { _id: "t7-2", name: "Grid", questions: 0 },
      { _id: "t7-3", name: "Flexbox", questions: 0 },
      { _id: "t7-4", name: "Web Design", questions: 0 },
      { _id: "t7-5", name: "Frontend", questions: 0 },
    ],
    author: {
      _id: "a7",
      name: "Alex Rodriguez",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t8-1", name: "Express.js", questions: 0 },
      { _id: "t8-2", name: "JWT", questions: 0 },
      { _id: "t8-3", name: "Authentication", questions: 0 },
      { _id: "t8-4", name: "Node.js", questions: 0 },
      { _id: "t8-5", name: "Security", questions: 0 },
    ],
    author: {
      _id: "a8",
      name: "Rachel Green",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/300/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    },
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
    tags: [
      { _id: "t9-1", name: "Next.js", questions: 0 },
      { _id: "t9-2", name: "Vercel", questions: 0 },
      { _id: "t9-3", name: "Deployment", questions: 0 },
      { _id: "t9-4", name: "DevOps", questions: 0 },
    ],
    author: {
      _id: "a9",
      name: "Tom Anderson",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/332/non_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 45,
    answers: 7,
    views: 320,
    createdAt: new Date("2024-07-22T15:00:00Z"),
  },
  {
    _id: "10",
    title: "React useEffect cleanup function explained",
    description: "When and why should I return a cleanup function from useEffect? What happens if I don't include one?",
    tags: [
      { _id: "t10-1", name: "React", questions: 0 },
      { _id: "t10-2", name: "Hooks", questions: 0 },
      { _id: "t10-3", name: "useEffect", questions: 0 },
      { _id: "t10-4", name: "JavaScript", questions: 0 },
      { _id: "t10-5", name: "Best Practices", questions: 0 },
    ],
    author: {
      _id: "a10",
      name: "Nina Patel",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/002/300/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    },
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
  // const { data } = await axios.get('/api/questions', { query: { search:query } });

  const { query = "", filter } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const queryMatch = question.title.toLowerCase().includes((query as string)?.toLowerCase());
    const filterMatch = filter
      ? question.tags.some((tag) => {
          const tagName = typeof tag === "string" ? tag : tag.name;
          return tagName.toLowerCase().includes((filter as string)?.toLowerCase());
        })
      : true;
    return queryMatch || filterMatch;
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
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question: Question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}

export default Home;
