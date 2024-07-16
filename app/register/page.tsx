import { register } from "@/actions/authAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-4 mt-2">Register</h1>
      <form action={register} className="flex flex-col gap-2">
        <Label htmlFor="name">name</Label>
        <Input type="text" id="name" name="name" placeholder="name" />
        <Label htmlFor="email">email</Label>
        <Input type="email" id="email" name="email" placeholder="email" />
        <Label htmlFor="password">password</Label>
        <Input type="password" id="password" name="password" placeholder="password" />
        <Button type="submit">Register</Button>
      </form>
      <div className="my-4">
        Already have an account?
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
}
