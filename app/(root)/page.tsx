import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { signOut } from "@/auth";

async function Home() {
  const session = await auth();
  return (
    <div className="md:grid-cols grid grid-cols-1 sm:grid-cols-2">
      <h1 className="h1-bold">Welcome to Next.js</h1>

      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit" className="cursor-pointer">
          Log Out
        </Button>
      </form>
    </div>
  );
}

export default Home;
