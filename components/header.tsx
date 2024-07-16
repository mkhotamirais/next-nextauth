import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { Button } from "./ui/button";
import { logout } from "@/actions/authAction";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;
  return (
    <header className="sticky top-0 border-b h-16 bg-slate-200">
      <nav className="flex h-full items-center justify-between gap-3 px-3 max-w-3xl mx-auto">
        <Link href="/">Logo</Link>
        <div className="flex gap-4 items-center">
          <Link href="/">home</Link>
          <Link href="/private/dashboard">dashboard</Link>
          <Link href="/private/settings">settings</Link>
          {!user ? (
            <>
              <Link href="/login">login</Link>
              <Link href="/register">register</Link>
            </>
          ) : (
            <form action={logout}>
              <Button variant={"secondary"}>logout</Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
