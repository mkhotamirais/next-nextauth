import { githubLogin, googleLogin } from "@/actions/oauthAction";
import { login } from "@/actions/authAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

export default async function Login() {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-4 mt-2">Login</h1>
      <form action={login} className="flex flex-col gap-2">
        <Label htmlFor="email">email</Label>
        <Input type="email" id="email" name="email" placeholder="email" />
        <Label htmlFor="password">password</Label>
        <Input type="password" id="password" name="password" placeholder="password" />
        <Button type="submit">Login</Button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-4 gap-3">
        <form action={googleLogin}>
          <Button type="submit" variant={"outline"} className="w-full">
            <FaGoogle className="mr-3" />
            login with google
          </Button>
        </form>
        <form action={githubLogin}>
          <Button type="submit" variant={"outline"} className="w-full">
            <FaGithub className="mr-3" />
            login with github
          </Button>
        </form>
      </div>

      <div className="my-4">
        Do not have an account?
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </div>
    </div>
  );
}
