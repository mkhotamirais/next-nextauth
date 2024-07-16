import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  const user = session?.user;
  if (!user) return redirect("/login");
  return <div>Dashboard</div>;
}
