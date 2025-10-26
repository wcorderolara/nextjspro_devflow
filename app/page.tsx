async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <div className="md:grid-cols grid grid-cols-1 sm:grid-cols-2">
      <h1 className="h1-bold">Welcome to Next.js</h1>
    </div>
  );
}

export default Home;
